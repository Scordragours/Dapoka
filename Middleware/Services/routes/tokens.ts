import {Router, Request, Response} from "express";
import {header} from "express-validator";
import Utils from "../utils";

let tokenRouter = Router();
/***
 * @api {POST} /token/ Create new token.
 *
 * @apiPermission ApiKey [VueJS, C#, Account]
 *
 * @apiName Post token
 * @apiGroup Token
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token=null Token.
 */
tokenRouter.post('/token/', [
    header("token-api").exists().isString(),
    header("token").isString().optional()
],  Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => Utils.setResponse(Utils.createToken(req.body, req.query, req.headers.token as string), req, res));

/***
 * @api {GET} /token/ Verify token.
 *
 * @apiPermission ApiKey [VueJS, C#, Account]
 *
 * @apiName Get token
 * @apiGroup Token
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Token.
 */
tokenRouter.get('/token/', [
    header("token-api").exists().isString(),
    header("token").exists()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => Utils.setResponse(Utils.verifyToken(req.headers.token as string), req, res));

export default tokenRouter;