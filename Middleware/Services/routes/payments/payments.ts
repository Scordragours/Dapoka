import {Router, Request, Response} from "express";
import Utils from "../../utils";
import {header} from "express-validator";

let paymentsRouter = Router();
/***
 * @api {POST} /payment/ Payment.
 *
 * @apiPermission ApiKey [VueJS] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Post payment
 * @apiGroup Payment
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
paymentsRouter.post('/payment/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3004/`
    }), req, res, "Payments");
});

export default paymentsRouter;