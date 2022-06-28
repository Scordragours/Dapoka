import {Router, Request, Response} from "express";
import {body, param} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../utils";
import AccountAccess from "../dataAccess/AccountAccess";

dotenv.config();

let forgetPasswordRouter = Router();
forgetPasswordRouter.post('/forget-password/', [
    body("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        new AccountAccess()
            .forgetPassword(req.body.email)
            .then(value => value.response)
            .then(value => {
                Utils.transport({
                    method: "POST",
                    url: `/token/?expiresIn=7d`,
                    headers: {
                        "token-api": process.env.ID_APP as string
                    },
                    data: {
                        email: value.email,
                        token: value.token,
                        type: "Forget-password"
                    }
                })
                    .then(result => result.response.token)
                    .then(token => {
                        Utils.transport({
                            method: "POST",
                            url: "/notifications/mail/forget-password/",
                            headers: {
                                "token-api": process.env.ID_APP as string
                            },
                            data: {
                                email: value.email,
                                token: token
                            }
                        })
                            .then(() => {})
                            .catch(() => {});
                    })
                    .catch(() => {});

                return {
                    status: 200,
                    response: {
                        message: "Un email a été envoyé."
                    }
                };
            }),
        res
    );
});

forgetPasswordRouter.put('/forget-password/:email', [
    param("email").exists().isEmail(),
    body("token").exists().isString(),
    body("password").exists().isString()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        new AccountAccess()
            .changePassword(req.params.email, req.body.token, req.body.password)
            .then(response => {
                Utils.transport({
                    method: "POST",
                    url: "/notifications/mail/change-password/",
                    headers: {
                        "token-api": process.env.ID_APP as string
                    },
                    data: {
                        email: req.params.email
                    }
                })
                    .then(() => {})
                    .catch(() => {});

                return response;
            }),
        res
    );
});

export default forgetPasswordRouter;