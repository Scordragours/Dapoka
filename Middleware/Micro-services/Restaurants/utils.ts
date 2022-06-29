import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import axios from "axios";
import {AxiosRequestConfig} from "axios";

export default class Utils {
    public static validateExpress(req: Request, res: Response, next: NextFunction) : void {
        if (!validationResult(req).isEmpty()) {
            res.status(500).json({message: "Erreur de syntaxe dans les paramètres."});
            return;
        }
        next();
    }

    public static setResponse(callback: Promise<any>, res: Response) : void {
        callback
            .then(value => {
                res.status(value.status).json(value.response);
            })
            .catch(error => res.status(error.status).json(error.response));
    }

    public static async transport(config: AxiosRequestConfig): Promise<any> {
        return new Promise(async (resolve, reject) => {
            axios({...config, url: `http://${process.env.PROXY_IP}:${process.env.PROXY_PORT}${config.url}`})
                .then(value => resolve({
                    status: value.status,
                    response: value.data
                }))
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
}