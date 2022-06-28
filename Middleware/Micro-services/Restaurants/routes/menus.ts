import {Request, Response, Router} from "express";
import {body, param, check} from "express-validator";
import * as dotenv from "dotenv";
import MenusAccess from "../dataAccess/MenusAccess";
import Utils from "../utils";

dotenv.config();

let menusRouter = Router();
menusRouter.get('/menus/:id_restaurant', [
    param("id_restaurant").exists().isNumeric()
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new MenusAccess().getAllMenus(parseInt(req.params.id_restaurant)), res));

menusRouter.post('/menu/', [
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
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new MenusAccess().createMenu(req.body), res));

menusRouter.put('/menu/:id_menu', [
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
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new MenusAccess().updateArticle(req.params.id_menu, req.body), res));

menusRouter.delete('/menu/:id_menu', [
    param("id_menu").exists().isString(),
], Utils.validateExpress, (req: Request, res: Response) => Utils.setResponse(new MenusAccess().deleteArticle(req.params.id_menu), res));

export default menusRouter;