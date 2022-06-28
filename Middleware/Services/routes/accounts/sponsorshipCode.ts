import {Router, Request, Response} from "express";
import {body, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";

dotenv.config();

let sponsorshipCodeRouter = Router();
/***
 * @api {POST} /account/sponsorship-code/verify/ Test promotional code.
 *
 * @apiPermission ApiKey [VueJS] & TypeToken [Login]
 *
 * @apiName Post sponsorship-code verify
 * @apiGroup Accounts - codes
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiBody {String} code Promotional code.
 */
sponsorshipCodeRouter.post('/account/sponsorship-code/verify/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    body("code").exists().isString()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, async (req: Request, res: Response) => {
    console.log((await Utils.verifyToken(req.headers.token as string)).response.email);
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3001/sponsorship-code/verify/`,
        data: {
            code: req.body.code,
            email: (await Utils.verifyToken(req.headers.token as string)).response.email
        }
    }), req, res, "Account");
});

/***
 * @api {POST} /account/sponsorship-code/use/ Use promotional code.
 *
 * @apiPermission ApiKey [VueJS, Restaurants] & TypeToken [Login]
 *
 * @apiName Post sponsorship-code use
 * @apiGroup Accounts - codes
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiBody {String} code Promotional code.
 */
sponsorshipCodeRouter.post('/account/sponsorship-code/use/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    body("code").exists().isString()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, async (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3001/sponsorship-code/use/`,
        data: {
            code: req.body.code,
            email: (await Utils.verifyToken(req.headers.token as string)).response.email
        }
    }), req, res, "Account");
});

export default sponsorshipCodeRouter;