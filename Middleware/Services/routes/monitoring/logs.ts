import {Router, Request, Response} from "express";
import Utils from "../../utils";
import {header, query} from "express-validator";

let logsRouter = Router();
/***
 * @api {GET} /monitoring/logs/ Recover all logs.
 *
 * @apiPermission ApiKey [C#] & Group [Technician] & TypeToken [Login]
 *
 * @apiName Get logs
 * @apiGroup Logs
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiQuery {String} type=null Type of logs.
 * @apiQuery {String} api-location=null The api that sent the log.
 * @apiQuery {String} origin=null IP address of the person responsible for the log.
 * @apiQuery {String} status=null The status of the log.
 * @apiQuery {String} data=null Content of the log.
 * @apiQuery {Date} date_start=null Start date of the application period.
 * @apiQuery {Date} date_end=null End date of the application period.
 */
logsRouter.get('/monitoring/logs/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    query("type").isString().optional(),
    query("api-location").isString().optional(),
    query("origin").optional(),
    query("status").isString().optional(),
    query("data").isString().optional(),
    query("date_start").isDate().optional(),
    query("date_end").isDate().optional()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: `3002/logs/`,
        params: req.query
    }), req, res, "Monitoring");
});

export default logsRouter;