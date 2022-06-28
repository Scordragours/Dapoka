import {Router, Request, Response} from "express";
import Utils from "../utils";

let paymentsRouter = Router();
paymentsRouter.post('/', Utils.validateExpress, (req: Request, res: Response) => {
    Utils.setResponse(new Promise((resolve) => resolve({
        status: 200,
        response: {
            message: "La commande a été payée avec succès."
        }
    })), res);
});

export default paymentsRouter;