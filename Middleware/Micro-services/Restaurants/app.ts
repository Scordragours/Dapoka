import express from 'express';
import * as dotenv from "dotenv";
import * as routes from "./routes/index";

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

Object.values(routes).forEach((route: any) => {
    app.use(route as express.Router)
});

app.listen(process.env.NodePort || 3000, (): void => console.log("Server start"));

export {app};