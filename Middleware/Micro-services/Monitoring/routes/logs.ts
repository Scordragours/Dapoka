import {Router, Request, Response} from "express";
import {body, query} from "express-validator";
import LogsAccess from "../dataAccess/LogsAccess";
import Utils from "../utils";

let logsRouter = Router();
logsRouter.get("/logs/", [
    query("type").isString().optional(),
    query("api-location").isString().optional(),
    query("origin").optional(),
    query("status").isString().optional(),
    query("data").isString().optional(),
    query("date_start").isDate().optional(),
    query("date_end").isDate().optional()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new LogsAccess().getAllLogs(req.query), res));

logsRouter.post("/log/", [
    body("type").exists().isString(),
    body("api-location").exists().isString(),
    body("origin").exists(),
    body("data").exists().isString(),
    body("status").exists().isString()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new LogsAccess().createLog(req.body), res));

export default logsRouter;