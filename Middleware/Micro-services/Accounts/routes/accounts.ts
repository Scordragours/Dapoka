import {Request, Response, Router} from "express";
import {body, param, query} from "express-validator";
import * as dotenv from "dotenv";
import AccountAccess from "../dataAccess/AccountAccess";
import Utils from "../utils";

dotenv.config();

let accountRouter = Router();
accountRouter.get('/', [
    query("offset").isNumeric().customSanitizer(value => parseInt(value)).optional(),
    query("limit").isNumeric().customSanitizer(value => parseInt(value)).optional(),
    query("search").isString().optional(),
    query("group").isString().optional()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new AccountAccess().getAllAccounts(req.query), res));

accountRouter.get('/:email', [
    param("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new AccountAccess().getAccount(req.params.email), res));

accountRouter.post('/', [
    body("group").matches(/^(Users|Deliverers|Restaurateurs|Developers|SalesRepresentatives|Technician)$/).optional(),
    body("name").exists(),
    body("firstname").exists(),
    body("email").exists().isEmail(),
    body("password").exists(),
    body("telephoneNumber").exists().isMobilePhone("fr-FR"),
    body("picture").exists().isBase64().optional()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        new AccountAccess()
            .createAccount(req.body)
            .then(value => {
                Utils.transport({
                    method: "POST",
                    url: `/token/?expiresIn=7d`,
                    headers: {
                        "token-api": process.env.ID_APP as string
                    },
                    data: {
                        email: req.params.email,
                        token: value.token,
                        type: "Activate"
                    }
                })
                    .then(result => result.response.token)
                    .then(token => {
                        Utils.transport({
                            method: "POST",
                            url: "/notifications/mail/create-account/",
                            headers: {
                                "token-api": process.env.ID_APP as string
                            },
                            data: {
                                email: req.body.email,
                                token: token
                            }
                        })
                            .then(() => {})
                            .catch(() => {});
                    })
                    .catch(() => {});
                return value;
            }),
        res
    );
});

accountRouter.put('/:email', [
    param("email").exists().isEmail(),
    body("group").matches(/^(Users|Deliverers|Restaurateurs|Developers|SalesRepresentatives|Technician)$/).optional(),
    body("email").isEmail().optional(),
    body("telephoneNumber").exists().isMobilePhone("fr-FR").optional()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new AccountAccess().updateAccount(req.params.email, req.body), res));

accountRouter.delete('/:email', [
    param("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        new AccountAccess()
            .deleteAccount(req.params.email)
            .then(result => {
                Utils.transport({
                    method: "POST",
                    url: "/notifications/mail/delete-account/",
                    headers: {
                        "token-api": process.env.ID_APP as string
                    },
                    data: {
                        email: req.params.email
                    }
                })
                    .then(() => {})
                    .catch(() => {});

                return result;
            }),
        res
    );
});

export default accountRouter;