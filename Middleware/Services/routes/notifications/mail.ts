import {Router, Request, Response} from "express";
import {body, header} from "express-validator";
import * as dotenv from "dotenv";
import Utils from "../../utils";

dotenv.config();

let mailsRouter = Router();
/***
 * @api {POST} /notifications/mail/create-account/ Sending of an account confirmation email.
 *
 * @apiPermission ApiKey [Account]
 *
 * @apiName Post create-account
 * @apiGroup Notification - mails - Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} email Account email.
 * @apiBody {String} token Identification token.
 */
mailsRouter.post('/notifications/mail/create-account/', [
    header("token-api").exists().isString(),

    body("email").exists().isEmail(),
    body("token").exists()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3003/mail/create-account/`,
        data: req.body
    }), req, res, "Notifications");
});

/***
 * @api {POST} /notifications/mail/delete-account/ Sending of a warning email to delete the account.
 *
 * @apiPermission ApiKey [Account]
 *
 * @apiName Post delete-account
 * @apiGroup Notification - mails - Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} email Account email.
 */
mailsRouter.post('/notifications/mail/delete-account/', [
    header("token-api").exists().isString(),

    body("email").exists().isEmail()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3003/mail/delete-account/`,
        data: req.body
    }), req, res, "Notifications");
});

/***
 * @api {POST} /notifications/mail/forget-password/ Sending an email to generate a new password.
 *
 * @apiPermission ApiKey [Account]
 *
 * @apiName Post forget-password
 * @apiGroup Notification - mails - Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} email Account email.
 * @apiBody {String} token Identification token.
 */
mailsRouter.post('/notifications/mail/forget-password/', [
    header("token-api").exists().isString(),

    body("email").exists().isEmail(),
    body("token").exists()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3003/mail/forget-password/`,
        data: req.body
    }), req, res, "Notifications");
});

/***
 * @api {POST} /notifications/mail/change-password/ Sending of a warning email to change your password.
 *
 * @apiPermission ApiKey [Account]
 *
 * @apiName Post change-password
 * @apiGroup Notification - mails - Accounts
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} email Account email.
 */
mailsRouter.post('/notifications/mail/change-password/', [
    header("token-api").exists().isString(),

    body("email").exists().isEmail()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3003/mail/change-password/`,
        data: req.body
    }), req, res, "Notifications");
});

/***
 * @api {POST} /notifications/mail/delivery/ Sending of an order delivery warning email.
 *
 * @apiPermission ApiKey [Restaurants]
 *
 * @apiName Post delivery
 * @apiGroup Notification - mails - Delivery
 *
 * @apiHeader {String} token-api Application identification key.
 *
 * @apiBody {String} email Account email.
 */
mailsRouter.post('/notifications/mail/delivery/', [
    header("token-api").exists().isString(),

    body("email").exists().isEmail()
], Utils.validateExpress, Utils.tokenApiMiddleware, Utils.tokenMiddleware, (req: Request, res: Response) => {
    Utils.setResponse(Utils.proxyTransport({
        method: "POST",
        url: `3003/mail/delivery/`,
        data: req.body
    }), req, res, "Notifications");
});

export default mailsRouter;