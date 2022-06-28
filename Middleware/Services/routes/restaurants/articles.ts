import {Request, Response, Router} from "express";
import {body, param, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";

dotenv.config();

let articlesRouter = Router();
/***
 * @api {GET} /restaurant/articles/:id_restaurant Retrieve items from a restaurant.
 * @apiParam {String} id_restaurant Restaurant identifier.
 *
 * @apiPermission ApiKey [VueJS]
 *
 * @apiName Get articles
 * @apiGroup Restaurant - articles
 *
 * @apiHeader {String} token-api Application identification key.
 */
articlesRouter.get('/restaurant/articles/:id_restaurant', [
    header("token-api").exists().isString(),

    param("id_restaurant").exists().isNumeric()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: `3005/articles/${req.params.id_restaurant}`
    }), req, res, "Restaurants");
});

/***
 * @api {POST} /restaurant/article/ Create an article.
 *
 * @apiPermission ApiKey [VueJS] & Group [Restaurateurs] & TypeToken [Login]
 *
 * @apiName Post article
 * @apiGroup Restaurant - articles
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
 */
articlesRouter.post('/restaurant/article/', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)),
    body("name").exists().isString(),
    body("picture").exists().isString(),
    body("price").exists().isNumeric().customSanitizer(value => parseFloat(value)),
    body("promotion").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("keyWords").exists().isString(),
    body("parameters").exists().isJSON().customSanitizer(value => JSON.parse(value)).optional()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3005/article/`,
        data: req.body
    }), req, res, "Restaurants");
});

/***
 * @api {PUT} /restaurant/article/:id_article Update an article.
 * @apiParam {String} id_article Article identifier.
 *
 * @apiPermission ApiKey [VueJS] & Group [Restaurateurs] & TypeToken [Login]
 *
 * @apiName Put article
 * @apiGroup Restaurant - articles
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
 */
articlesRouter.put('/restaurant/article/:id_article', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_article").exists().isString(),
    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)).optional(),
    body("name").exists().isString().optional(),
    body("picture").exists().isString().optional(),
    body("price").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("promotion").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("keyWords").exists().isString().optional(),
    body("parameters").exists().isJSON().customSanitizer(value => JSON.parse(value)).optional()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "PUT",
        url: `3005/article/${req.params.id_article}`,
        data: req.body
    }), req, res, "Restaurants");
});

/***
 * @api {DELETE} /restaurant/article/:id_article Delete an article.
 * @apiParam {String} id_article Article identifier.
 *
 * @apiPermission ApiKey [VueJS] & Group [Restaurateurs] & TypeToken [Login]
 *
 * @apiName Delete article
 * @apiGroup Restaurant - articles
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
articlesRouter.delete('/restaurant/article/:id_article', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("id_article").exists().isString(),
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "DELETE",
        url: `3005/article/${req.params.id_article}`
    }), req, res, "Restaurants");
});

export default articlesRouter;