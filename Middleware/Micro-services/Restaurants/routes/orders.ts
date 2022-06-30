import {Request, Response, Router} from "express";
import {body, param, check} from "express-validator";
import * as dotenv from "dotenv";
import OrdersAccess, {StatusDelivers} from "../dataAccess/OrdersAccess";
import Utils from "../utils";

dotenv.config();

let ordersRouter = Router();
ordersRouter.get('/orders/', Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new OrdersAccess().getOrders(), res));

ordersRouter.get('/orders/:id', [
    param("id").exists().isNumeric()
],  Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new OrdersAccess().getOrdersByUserOrRestaurantOrDeliver(parseInt(req.params.id)), res));

ordersRouter.get('/order/:id_order', [
    param("id_order").exists().isString()
],  Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new OrdersAccess().getOrder(req.params.id_order), res));

ordersRouter.post('/order/', [
    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)),
    body("idUser").exists().isNumeric().customSanitizer(value => parseInt(value)),
    body("products").exists().isJSON().customSanitizer(value => JSON.parse(value)),
    check("products.*.id").exists().isString(),
    check("products.*.type").exists().matches(/^(Menu|Article)$/),
    body("userLocation").exists().isString(),
    body("restaurantLocation").exists().isString(),
    body("promotionCode").exists().isString().optional()
],  Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new OrdersAccess().createOrder(req.body, req.headers.token as string), res));

ordersRouter.post('/order/:id_order/add-status/', [
    param("id_order").exists().isString(),
    body("status").exists().matches(/^(ORDER|IN_PREPARATION|IN_DELIVERY|DELIVERED)$/),
    body("email").exists().isEmail()
],  Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(
        new OrdersAccess()
            .updateStatus(req.params.id_order, req.body.status)
            .then(value => {
                // TODO: Axios -> /notify/notification/
                if ((<any>StatusDelivers)[req.body.status] == StatusDelivers.DELIVERED) {
                    Utils.transport({
                        method: "POST",
                        url: "/notifications/mail/delivery/",
                        headers: {
                            "token-api": process.env.ID_APP as string
                        },
                        data: {
                            email: req.body.email
                        }
                    })
                        .then(() => {})
                        .catch(() => {});
                }
                return value;
            }),
        res
    );
});

ordersRouter.delete('/order/:id_order', [
    param("id_order").exists().isString()
],  Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new OrdersAccess().deleteOrder(req.params.id_order), res));

export default ordersRouter;