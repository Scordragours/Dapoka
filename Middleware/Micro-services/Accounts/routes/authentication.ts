import {Router, Request, Response} from "express";
import {body} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../utils";
import AccountAccess from "../dataAccess/AccountAccess";

dotenv.config();

let authenticationRouter = Router();
authenticationRouter.post('/authentication/', [
    body("email").exists().isEmail(),
    body("password").exists()
], Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        new AccountAccess()
            .authentication(req.body.email, req.body.password)
            .then(result => result.response)
            .then(async result => {
                let token = await Utils.transport({
                    method: "POST",
                    url: `/token/?expiresIn=7d`,
                    data: {
                        email: result.email,
                        token: result.token,
                        status: "REFRESH",
                        type: "Login"
                    },
                    headers: {
                        "token-api": process.env.ID_APP as string
                    }
                })
                    .then(result => result.response.token)
                    .catch(() => {});
                return {
                    status: 200,
                    response: {
                        token: token,
                        message: "Authentication réussi."
                    }
                };
            }),
        res
    );
});

export default authenticationRouter;