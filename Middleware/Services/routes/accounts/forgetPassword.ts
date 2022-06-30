import {Router, Request, Response} from "express";
import {body, param, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";

dotenv.config();

let forgetPasswordRouter = Router();
/***
 * @api {POST} /account/forget-password/ Request a new password.
 *
 * @apiPermission ApiKey [VueJS, C#]
 *
 * @apiName Post forget-password
 * @apiGroup Accounts - forget-password
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} email Account email.
 */
forgetPasswordRouter.post('/account/forget-password/', [
    header("token-api").exists().isString(),

    body("email").exists().isEmail()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3001/forget-password/`,
        data: req.body
    }),  req, res, "Account");
});

/***
 * @api {POST} /account/forget-password/:email Request a new password.
 * @apiParam {String} email Account identification email.
 *
 * @apiPermission ApiKey [VueJS, C#, Proxy, Payment] & TypeToken [Forget-password]
 *
 * @apiName Post forget-password
 * @apiGroup Accounts - forget-password
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} token Identification token.
 * @apiBody {String} password New password.
 *
 */
forgetPasswordRouter.put('/account/forget-password/:email', [
    header("token-api").exists().isString(),

    param("email").exists().isEmail(),

    body("token").exists().isString(),
    body("password").exists().isString()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "PUT",
        url: `3001/forget-password/${req.params.email}`,
        data: req.body
    }),  req, res, "Account");
});

export default forgetPasswordRouter;