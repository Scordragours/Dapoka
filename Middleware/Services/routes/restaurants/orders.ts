import {Request, Response, Router} from "express";
import {body, param, check, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";

dotenv.config();

let ordersRouter = Router();
/***
 * @api {GET} /restaurant/orders/ Retrieve orders.
 *
 * @apiPermission ApiKey [VueJS, C#] & Group [SalesRepresentatives] & TypeToken [Login]
 *
 * @apiName Get orders
 * @apiGroup Restaurant - orders
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
ordersRouter.get('/restaurant/orders/', [
    header("token-api").exists().isString(),
    header("token").exists().isString()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: `3005/orders/`
    }), req, res, "Restaurants");
});

/***
 * @api {GET} /restaurant/orders/:id Retrieve order by account.
 * @apiParam {Number} id Account identifier.
 *
 * @apiPermission ApiKey [VueJS, C#] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Get orders by account
 * @apiGroup Restaurant - orders
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
ordersRouter.get('/restaurant/orders/:id', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id").exists().isNumeric()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: `3005/orders/${req.params.id}`
    }), req, res, "Restaurants");
});

/***
 * @api {GET} /restaurant/order/:id_order Retrieve order.
 * @apiParam {String} id_order Order identifier.
 *
 * @apiPermission ApiKey [VueJS, C#] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Get orders by account
 * @apiGroup Restaurant - orders
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
ordersRouter.get('/restaurant/order/:id_order', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_order").exists().isString()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: `3005/order/${req.params.id_order}`
    }), req, res, "Restaurants");
});

/***
 * @api {POST} /restaurant/order/ Create order.
 *
 * @apiPermission ApiKey [VueJS] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Post order
 * @apiGroup Restaurant - orders
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiBody {Number} idRestaurant Restaurant identifier.
 * @apiBody {Number} idUser Account identifier.
 * @apiBody {JSON} products={id: "", type: ""} Products of the orders.
 * @apiBody {String} userLocation User's address.
 * @apiBody {String} restaurantLocation Restaurant's address.
 * @apiBOdy {String} promotionCode=null Promotion Code.
 */
ordersRouter.post('/restaurant/order/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)),
    body("idUser").exists().isNumeric().customSanitizer(value => parseInt(value)),
    body("products").exists().isJSON(),//.customSanitizer(value => JSON.parse(value)),
    check("products.*.id").exists().isString(),
    check("products.*.type").exists().matches(/^(Menu|Article)$/),
    body("userLocation").exists().isString(),
    body("restaurantLocation").exists().isString(),
    body("promotionCode").exists().isString().optional()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3005/order/`,
        headers: {
            token: req.headers.token as string
        },
        data: req.body
    }), req, res, "Restaurants");
});

/***
 * @api {POST} /restaurant/order/:id_order/add-status/ Add new status order.
 * @apiParam {String} id_order Order identifier.
 *
 * @apiPermission ApiKey [VueJS] & Group [Deliverers, Restaurateurs] & TypeToken [Login]
 *
 * @apiName Post new status order
 * @apiGroup Restaurant - orders
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiBody {String} status=[ORDER|IN_PREPARATION|IN_DELIVERY|DELIVERED] New order status.
 */
ordersRouter.post('/restaurant/order/:id_order/add-status/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_order").exists().isString(),
    body("status").exists().matches(/^(ORDER|IN_PREPARATION|IN_DELIVERY|DELIVERED)$/)
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3005/order/${req.params.id_order}/add-status/`,
        data: req.body
    }), req, res, "Restaurants");
});

/***
 * @api {DELETE} /order/:id_order Delete an order.
 * @apiParam {String} id_order Order identifier.
 *
 * @apiPermission ApiKey [VueJS] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Delete order
 * @apiGroup Restaurant - orders
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
ordersRouter.delete('/order/:id_order', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_order").exists().isString()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "DELETE",
        url: `3005/order/${req.params.id_order}/`,
        data: req.body
    }), req, res, "Restaurants");
});

export default ordersRouter;