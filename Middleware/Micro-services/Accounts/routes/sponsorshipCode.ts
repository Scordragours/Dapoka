import {Router, Request, Response} from "express";
import {body} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../utils";
import AccountAccess from "../dataAccess/AccountAccess";

dotenv.config();

let sponsorshipCodeRouter = Router();
sponsorshipCodeRouter.post('/sponsorship-code/verify/', [
    body("code").exists().isString(),
    body("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new AccountAccess().verifyCode(req.body.code, req.body.email), res));

sponsorshipCodeRouter.post('/sponsorship-code/use/', [
    body("code").exists().isString(),
    body("email").exists().isEmail()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new AccountAccess().useCode(req.body.code, req.body.email), res));

export default sponsorshipCodeRouter;