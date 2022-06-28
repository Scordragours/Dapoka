import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import axios from "axios";
import {AxiosRequestConfig} from "axios";
import * as ping from "ping";
import * as permission from "./permissions.json";

dotenv.config();

export default class Utils {
    public static validateExpress(req: Request, res: Response, next: NextFunction) : void {
        if (!validationResult(req).isEmpty()) {
            res.status(500).json({message: "Erreur de syntaxe dans les paramètres."});
            return;
        }
        next();
    }

    public static async setResponse(callback: Promise<any> | any, req: Request, res: Response, api: string = "Proxy"): Promise<void> {
        let log = {
            type: "Request",
            "api-location": api,
            origin: req.ip,
            data: `${Object.keys(req.route.methods)[0].toUpperCase()} ${req.url}`,
            status: ""
        };

        if (callback instanceof Promise<any>)
            callback = await callback.catch(error => callback = error);

        log.status = callback.status >= 200 && callback.status < 300 ? "Success" : "Fail";
        log.data += ` - ${callback.status} - ${callback.response.message ?? "[Object]"}`;

        res.status(callback.status).json(callback.response);

        Utils.proxyTransport({method: "POST", url: "3002/log/", data: log})
            .then(value => {
            })
            .catch(error => {
            });
    }

    public static async loadBalancer() {
        let ips = [];
        for (let ip of (process.env.IPMICROSERVICE as string).split(',')) {
            ips.push({
                ip: ip,
                ping: (await ping.promise.probe(ip, {
                    timeout: 10,
                    extra: ["-i", "5"]
                })).avg
            })
        }
        return ips.sort((a, b) => a.ping < b.ping ? -1 : 1)[0].ip;
    }

    public static async proxyTransport(config: AxiosRequestConfig): Promise<any> {
        return new Promise(async (resolve, reject) => {
            axios({...config, url: `http://${await Utils.loadBalancer()}:${config.url}`})
                .then(value => resolve({status: value.status, response: value.data}))
                .catch(error => {
                    let errorMessage = {
                        status: 500,
                        response: {message: "Le service demandé n'est pas disponible actuellement."}
                    };
                    if (error.response && error.response.status && error.response.data.message)
                        errorMessage = {status: error.response.status, response: error.response.data};
                    reject(errorMessage);
                });
        });
    }

    public static createToken(data: any, query: any, token?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (token) {
                Utils.verifyToken(token)
                    .catch(error => {
                        let errorMessage = {
                            status: 500,
                            response: {
                                message: "La durée du token a été dépassée."
                            }
                        };

                        let state = error.response.message;
                        let tokenDecoded = jwt.decode(token) as any;
                        if (state === "Token dépassé." && (tokenDecoded as any ?? {status: ""}).status === "REFRESH") {
                            Utils.proxyTransport({
                                method: "GET",
                                url: `3001/${tokenDecoded.email}`
                            })
                                .then(result => result.response)
                                .then(account => {
                                    if (account.refreshToken === tokenDecoded.refreshToken && new Date(account.dateExpirationToken) >= new Date()) {
                                        resolve({
                                            status: 200,
                                            response: {
                                                token: jwt.sign({
                                                    status: "REFRESH",
                                                    refreshToken: account.refreshToken,
                                                    email: account.email
                                                }, process.env.SECRET_KEY as string, query ?? {expiresIn: '1h'})
                                            }
                                        })
                                    } else reject(errorMessage);
                                })
                                .catch(() => reject(errorMessage));
                        } else reject(errorMessage);
                    });
            } else resolve({
                status: 200,
                response: {
                    token: jwt.sign(data, process.env.SECRET_KEY as string, query ?? {expiresIn: '1h'})
                }
            });
        });
    }

    public static verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve({
                    status: 200,
                    response: jwt.verify(token, process.env.SECRET_KEY as string)
                });
            } catch (e: any) {
                if (e.name == 'TokenExpiredError') {
                    reject({
                        status: 502,
                        response: {
                            message: "Token dépassé."
                        }
                    });
                    return;
                }
                reject({
                    status: 502,
                    response: {
                        message: "Token invalid."
                    }
                });
            }
        });
    }

    public static async tokenApiMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        const roadConfig = Object.values(permission)
            .find(value =>
                value.path == req.route.path &&
                value.methode == Object.keys(req.route.methods)[0].toUpperCase()
            ) as any ?? {};

        if (!roadConfig["api-key"] || roadConfig["api-key"].indexOf(req.headers["token-api"] as any) == -1)
            return await Utils.setResponse({status: 402, response: {message: "Connexion refusé."}}, req, res);

        next();
    }

    public static async tokenMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        let error = false;

        const roadConfig = Object.values(permission)
            .find(value =>
                value.path == req.route.path &&
                value.methode == Object.keys(req.route.methods)[0].toUpperCase()
            ) as any ?? {};

        if (roadConfig["type-token"])
            await Utils.verifyToken(req.headers.token as string)
                .then(result => result.response)
                .then(async value => {
                    if (roadConfig["type-token"].indexOf(value.type) == -1) {
                        error = true;
                        return;
                    }

                    if (roadConfig["account-group"])
                        await Utils.proxyTransport({
                            method: "GET",
                            url: `3001/${value.email}`
                        })
                            .then(result => result.response)
                            .then(account => {
                                if (account.refreshToken !== value.token || new Date(account.dateExpirationToken) < new Date()) {
                                    error = true;
                                    return;
                                }

                                if (roadConfig["account-group"].indexOf(account.group) == -1) {
                                    error = true;
                                    return;
                                }
                            })
                            .catch(() => error = true);
                })
                .catch(() => error = true);

        if (error)
            return await Utils.setResponse({status: 402, response: {message: "Connexion refusé."}}, req, res);
        next();
    }
}