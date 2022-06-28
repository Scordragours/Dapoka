import express from 'express';
import {Request, Response, NextFunction} from "express";
import * as dotenv from "dotenv";
import * as routes from "./routes/index";
import cors from "cors";

dotenv.config();

const app: express.Application = express();

app.use(cors({
    origin: true
}));
app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

Object.values(routes).forEach((route: any) => {
    app.use(route as express.Router)
});

app.listen(process.env.NODEPORT || 3000, (): void => console.log("Server start"));

export {app};