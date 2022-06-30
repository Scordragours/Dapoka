import {Request, Response, Router} from "express";
import * as dotenv from "dotenv";
import Utils from "../../utils";
import {param, header} from "express-validator";

dotenv.config();

let statisticsRouter = Router();
/***
 * @api {GET} /restaurant/statistics/ Get statistics.
 *
 * @apiPermission ApiKey [VueJS, C#] & Group [SalesRepresentatives] & TypeToken [Login]
 *
 * @apiName Get statistics
 * @apiGroup Restaurant - statistic
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
statisticsRouter.get('/restaurant/statistics/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "DELETE",
        url: `3005/statistics/`
    }), req, res, "Restaurants");
});

/***
 * @api {GET} /restaurant/statistic/:id_restaurant Get statistic.
 * @apiParam {String} id_restaurant Restaurant identifier.
 *
 * @apiPermission ApiKey [VueJS] & Group [Restaurateurs, SalesRepresentatives] & TypeToken [Login]
 *
 * @apiName Get statistic
 * @apiGroup Restaurant - statistic
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
statisticsRouter.get('/restaurant/statistic/:id_restaurant', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_restaurant").exists().isNumeric(),
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "DELETE",
        url: `3005/statistic/${req.params.id_restaurant}`
    }), req, res, "Restaurants");
});

export default statisticsRouter;