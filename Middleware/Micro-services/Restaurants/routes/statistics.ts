import {Request, Response, Router} from "express";
import * as dotenv from "dotenv";
import Utils from "../utils";
import OrdersAccess from "../dataAccess/OrdersAccess";
import {param} from "express-validator";

dotenv.config();

let statisticsRouter = Router();
statisticsRouter.get('/statistics/', Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new OrdersAccess().statisticOrder(), res));

statisticsRouter.get('/statistic/:id_restaurant', [
    param("id_restaurant").exists().isString(),
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new OrdersAccess().statisticOrderByRestaurant(req.body.id_restaurant as number), res));

export default statisticsRouter;