import {Router, Request, Response} from "express";
import {param} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../utils";
import AccountAccess from "../dataAccess/AccountAccess";

dotenv.config();

let activateRouter = Router();
activateRouter.post('/activate/:email', [
    param("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new AccountAccess().activateAccount(req.body.email), res));

export default activateRouter;