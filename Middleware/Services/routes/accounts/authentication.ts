import {Router, Request, Response} from "express";
import {body, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";

dotenv.config();

let authenticationRouter = Router();
/***
 * @api {POST} /account/authentication/ Account authentication.
 *
 * @apiPermission ApiKey [VueJS, C#]
 *
 * @apiName Post authentication
 * @apiGroup Accounts - authentication
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} email Account email.
 * @apiBody {String} password Account password.
 */
authenticationRouter.post('/account/authentication/', [
    header("token-api").exists().isString(),

    body("email").exists().isEmail(),
    body("password").exists()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3001/authentication/`,
        data: req.body
    }),  req, res, "Account");
});

export default authenticationRouter;