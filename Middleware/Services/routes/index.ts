import accountsRouter from "./accounts/accounts";
import authenticationRouter from "./accounts/authentication";
import forgetPasswordRouter from "./accounts/forgetPassword";
import sponsorshipCodeRouter from "./accounts/sponsorshipCode";
import activateRouter from "./accounts/activate";

import logsRouter from "./monitoring/logs";

import mailsRouter from "./notifications/mail"

import menusRouter from "./restaurants/menus";
import articlesRouter from "./restaurants/articles";
import ordersRouter from "./restaurants/orders";
import statisticsRouter from "./restaurants/statistics";

import paymentsRouter from "./payments/payments";
import tokenRouter from "./tokens";

export {
    accountsRouter,
    authenticationRouter,
    forgetPasswordRouter,
    sponsorshipCodeRouter,
    activateRouter,

    logsRouter,

    mailsRouter,

    menusRouter,
    articlesRouter,
    ordersRouter,
    statisticsRouter,

    paymentsRouter,

    tokenRouter
};