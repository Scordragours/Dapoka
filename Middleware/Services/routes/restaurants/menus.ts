import {Request, Response, Router} from "express";
import {body, param, check, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";
dotenv.config();

let menusRouter = Router();
/***
 * @api {GET} /restaurant/articles/:id_restaurant Retrieve menus from a restaurant.
 * @apiParam {String} id_restaurant Restaurant identifier.
 *
 * @apiPermission ApiKey [VueJS]
 *
 * @apiName Get menus
 * @apiGroup Restaurant - menus
 *
 * @apiHeader {String} token-api Application identification key.
 */
menusRouter.get('/restaurant/menus/:id_restaurant', [
    header("token-api").exists().isString(),

    param("id_restaurant").exists().isNumeric()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: `3005/menus/${req.params.id_restaurant}`
    }), req, res, "Restaurants");
});

/***
 * @api {POST} /restaurant/article/ Create menu.
 *
 * @apiPermission ApiKey [VueJS] & Group [Restaurateurs] & TypeToken [Login]
 *
 * @apiName Post menu
 * @apiGroup Restaurant - menus
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiBody {Number} idRestaurant Restaurant identifier.
 * @apiBody {String} name Name of the article.
 * @apiBody {String} picture Image of the article.
 * @apiBody {Number} price Item price.
 * @apiBody {Number} promotion=null Promotion of the article.
 * @apiBody {String} keyWords Category of the article.
 * @apiBody {JSON} parameters=null Item's parameter.
 * @apiBody {JSON} items Menu item.
 */
menusRouter.post('/restaurant/menu/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)),
    body("name").exists().isString(),
    body("picture").exists().isString(),
    body("price").exists().isNumeric().customSanitizer(value => parseFloat(value)),
    body("promotion").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("keyWords").exists().isString(),
    body("parameters").exists().isString().optional(),
    body("items").exists().isJSON().customSanitizer(value => JSON.parse(value)),
    check("items.*.name").exists().isString(),
    check("items.*.picture").exists().isString(),
    check("items.*.keyWords").exists().isString(),
    check("items.*.parameters").exists().isString().optional(),
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3005/menu/`,
        data: req.body
    }), req, res, "Restaurants");
});

/***
 * @api {PUT} /restaurant/article/:id_menu Update an menu.
 * @apiParam {String} id_menu Menu identifier.
 *
 * @apiPermission ApiKey [VueJS] & Group [Restaurateurs] & TypeToken [Login]
 *
 * @apiName Put menu
 * @apiGroup Restaurant - menus
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiBody {Number} idRestaurant=null Restaurant identifier.
 * @apiBody {String} name=null Name of the article.
 * @apiBody {String} picture=null Image of the article.
 * @apiBody {Number} price=null Item price.
 * @apiBody {Number} promotion=null Promotion of the article.
 * @apiBody {String} keyWords=null Category of the article.
 * @apiBody {JSON} parameters=null Item's parameter.
 * @apiBody {JSON} items=null Menu item.
 */
menusRouter.put('/restaurant/menu/:id_menu', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_menu").exists().isString(),
    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)).optional(),
    body("name").exists().isString().optional(),
    body("picture").exists().isString().optional(),
    body("price").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("promotion").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("keyWords").exists().isString().optional(),
    body("parameters").exists().isString().optional(),
    body("items").exists().isJSON().customSanitizer(value => JSON.parse(value)).optional(),
    check("items.*.name").exists().isString(),
    check("items.*.picture").exists().isString(),
    check("items.*.keyWords").exists().isString(),
    check("items.*.parameters").exists().isString().optional(),
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "PUT",
        url: `3005/menu/${req.params.id_menu}`,
        data: req.body
    }), req, res, "Restaurants");
});

/***
 * @api {DELETE} /restaurant/menu/:id_menu Delete an menu.
 * @apiParam {String} id_menu Menu identifier.
 *
 * @apiPermission ApiKey [VueJS] & Group [Restaurateurs] & TypeToken [Login]
 *
 * @apiName Delete menu
 * @apiGroup Restaurant - menus
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
menusRouter.delete('/restaurant/menu/:id_menu', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_menu").exists().isString(),
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "DELETE",
        url: `3005/menu/${req.params.id_menu}`
    }), req, res, "Restaurants");
});

export default menusRouter;