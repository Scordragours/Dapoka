import {Request, Response, NextFunction} from "express";
import {createTransport} from "nodemailer";
import {validationResult} from "express-validator";
import * as dotenv from "dotenv";

dotenv.config();

export default class Utils {
    public static validateExpress(req: Request, res: Response, next: NextFunction) : void {
        if (!validationResult(req).isEmpty()) {
            res.status(500).json({message: "Erreur de syntaxe dans les paramètres."});
            return;
        }
        next();
    }

    public static setResponse(callback: Promise<any>, res: Response): void {
        callback
            .then(value => {
                res.status(value.status).json(value.response);
            })
            .catch(error => res.status(error.status).json(error.response));
    }

    public static sendMail(template: string, object: string, to: string): Promise<any> {
        let transport = createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt((process.env.SMTP_PORT as string)),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        return new Promise((resolve, reject) => {
            transport.sendMail({
                from: "contact@ordigeek.fr",
                to: to,
                subject: object,
                text: object,
                html: template
            })
                .then(() => resolve({
                    status: 200,
                    response: {
                        message: "Le mail a été correctement envoyé."
                    }
                }))
                .catch(() => reject({
                    status: 500,
                    response: {
                        message: "Le mail n'a été envoyé."
                    }
                }));
        });
    }
}