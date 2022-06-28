import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";

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
}