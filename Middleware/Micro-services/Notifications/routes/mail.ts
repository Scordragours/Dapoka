import {Router, Request, Response} from "express";
import {body} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../utils";

dotenv.config();

let mailsRouter = Router();
mailsRouter.post('/mail/create-account/', [
    body("email").exists().isEmail(),
    body("token").exists()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        Utils.sendMail(
            `
            <a href="http://localhost/${req.body.token}">Activer votre compte, ici</a>
            `,
            'Confirmation de création du compte.',
            req.body.email
        ),
        res
    );
});

mailsRouter.post('/mail/delete-account/', [
    body("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        Utils.sendMail(
            `
            Votre compte a été supprimé
            `,
            'Suppression de compte.',
            req.body.email
        ),
        res
    );
});

mailsRouter.post('/mail/forget-password/', [
    body("email").exists().isEmail(),
    body("token").exists()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        Utils.sendMail(
            `
            <a href="http://localhost/${req.body.token}">Changer le mot de passe</a>
            `,
            'Oublie de mot de passe.',
            req.body.email
        ),
        res
    );
});

mailsRouter.post('/mail/change-password/', [
    body("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        Utils.sendMail(
            `
            Votre mot de passe a été changé.
            `,
            'Le mot de passe a été changé.',
            req.body.email
        ),
        res
    );
});

mailsRouter.post('/mail/delivery/', [
    body("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        Utils.sendMail(
            `
            Votre commande a été livrée.
            `,
            'Commande livrée.',
            req.body.email
        ),
        res
    );
});

export default mailsRouter;