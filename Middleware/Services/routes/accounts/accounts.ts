import {Request, Response, Router} from "express";
import {header, body, param, query} from "express-validator";
import Utils from "../../utils";

let accountRouter = Router();
/***
 * @api {GET} /accounts/ Recover all accounts.
 *
 * @apiPermission ApiKey [VueJS, C#]
 *
 * @apiName Get accounts
 * @apiGroup Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiQuery {Number} offset=null Offset on accounts.
 * @apiQuery {Number} limit=null Number of accounts to display.
 * @apiQuery {String} search=null Search in a text field.
 * @apiQuery {String} group=null Selection of a user group.
 */
accountRouter.get('/accounts/', [
    header("token-api").exists().isString(),

    query("offset").isNumeric().customSanitizer(value => parseInt(value)).optional(),
    query("limit").isNumeric().customSanitizer(value => parseInt(value)).optional(),
    query("search").isString().optional(),
    query("group").isString().optional()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: "3001/",
        params: req.query
    }), req, res, "Account");
});

/***
 * @api {GET} /account/:email Recover account.
 * @apiParam {String} email Account identification email.
 *
 * @apiPermission ApiKey [VueJS, C#, Proxy, Payment] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Get account
 * @apiGroup Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
accountRouter.get('/account/:email', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("email").exists().isEmail()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "GET",
        url: `3001/${req.params.email}`
    }), req, res, "Account");
});

/***
 * @api {POST} /account/ Create an account.
 *
 * @apiPermission ApiKey [VueJS]
 *
 * @apiName Post account
 * @apiGroup Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} group=[Users|Deliverers|Restaurateurs|Developers|SalesRepresentatives|Technician] Account group.
 * @apiBody {String} name Name of the person.
 * @apiBody {String} firstname First name of the person.
 * @apiBody {String} email Account email.
 * @apiBody {String} password Account password.
 * @apiBody {String} telephoneNumber Account phone numbers.
 * @apiBody {String} picture=null Picture of the account.
 */
accountRouter.post('/account/', [
    header("token-api").exists().isString(),

    body("group").matches(/^(Users|Deliverers|Restaurateurs|Developers|SalesRepresentatives|Technician)$/).optional(),
    body("name").exists(),
    body("firstname").exists(),
    body("email").exists().isEmail(),
    body("password").exists(),
    body("telephoneNumber").exists().isMobilePhone("fr-FR"),
    body("picture").exists().isBase64().optional()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3001/`,
        data: req.body
    }), req, res, "Account");
});

/***
 * @api {PUT} /account/:email Update account.
 * @apiParam {String} email Account identification email.
 *
 * @apiPermission ApiKey [VueJS, C#] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Put account
 * @apiGroup Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 *
 * @apiBody {String} group=null Account group.
 * @apiBody {String} name=null Name of the person.
 * @apiBody {String} firstname=null First name of the person.
 * @apiBody {String} email=null Account email.
 * @apiBody {String} password=null Account password.
 * @apiBody {String} telephoneNumber=null Account phone numbers.
 * @apiBody {String} picture=null Picture of the account.
 */
accountRouter.put('/account/:email', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("email").exists().isEmail(),
    body("group").matches(/^(Users|Deliverers|Restaurateurs|Developers|SalesRepresentatives|Technician)$/).optional(),
    body("email").isEmail().optional(),
    body("telephoneNumber").exists().isMobilePhone("fr-FR").optional(),
    body("picture").exists().isBase64().optional()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "PUT",
        url: `3001/${req.params.email}`,
        data: req.body
    }), req, res, "Account");
});

/***
 * @api {DELETE} /account/:email Delete account.
 * @apiParam {String} email Account identification email.
 *
 * @apiPermission ApiKey [VueJS, C#] & Group [Users, Deliverers, Restaurateurs, Developers, SalesRepresentatives, Technician] & TypeToken [Login]
 *
 * @apiName Delete account
 * @apiGroup Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 * @apiHeader {String} token Identification token.
 */
accountRouter.delete('/account/:email', [
    header("token-api").exists().isString(),
    header("token").exists().isString(),

    param("email").exists().isEmail()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "DELETE",
        url: `3001/${req.params.email}`
    }), req, res, "Account");
});

export default accountRouter;