import {Request, Response, Router} from "express";
import {body, param} from "express-validator";
import * as dotenv from "dotenv";
import ArticlesAccess from "../dataAccess/ArticlesAccess";
import Utils from "../utils";

dotenv.config();

let articlesRouter = Router();
articlesRouter.get('/articles/:id_restaurant', [
    param("id_restaurant").exists().isNumeric()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new ArticlesAccess().getAllArticles(parseInt(req.params.id_restaurant)), res));

articlesRouter.post('/article/', [
    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)),
    body("name").exists().isString(),
    body("picture").exists().isString(),
    body("price").exists().isNumeric().customSanitizer(value => parseFloat(value)),
    body("promotion").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("keyWords").exists().isString(),
    body("parameters").exists().isJSON().customSanitizer(value => JSON.parse(value)).optional()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new ArticlesAccess().createArticle(req.body), res));

articlesRouter.put('/article/:id_article', [
    param("id_article").exists().isString(),
    body("idRestaurant").exists().isNumeric().customSanitizer(value => parseInt(value)).optional(),
    body("name").exists().isString().optional(),
    body("picture").exists().isString().optional(),
    body("price").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("promotion").exists().isNumeric().customSanitizer(value => parseFloat(value)).optional(),
    body("keyWords").exists().isString().optional(),
    body("parameters").exists().isJSON().customSanitizer(value => JSON.parse(value)).optional()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new ArticlesAccess().updateArticle(req.params.id_article, req.body), res));

articlesRouter.delete('/article/:id_article', [
    param("id_article").exists().isString(),
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new ArticlesAccess().deleteArticle(req.params.id_article), res));

export default articlesRouter;