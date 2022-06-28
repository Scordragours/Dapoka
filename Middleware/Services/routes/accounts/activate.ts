import {Router, Request, Response} from "express";
import {param, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";

dotenv.config();

let activateRouter = Router();
/***
 * @api {POST} /account/activate/:email Account activation.
 * @apiParam {String} email Account identification email.
 *
 * @apiPermission ApiKey [VueJS] & TypeToken [Activate]
 *
 * @apiName Post activate
 * @apiGroup Accounts - activation
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
activateRouter.post('/account/activate/:email', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("email").exists().isEmail()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "PUT",
        url: `3001/activate/`,
        data: req.body
    }), req, res, "Account");
});

export default activateRouter;