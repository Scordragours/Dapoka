import {connect} from "mongoose";

export default class Access {
    public async init(): Promise<any> {
        return new Promise((resolve, reject) => {
            connect(`mongodb://${process.env.MONGO_NETWORK}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`, {
                auth: {
                    username: process.env.MONGO_USER,
                    password: process.env.MONGO_PASSWORD
                }
            })
                .then(() => resolve(""))
                .catch((error) => reject(error));
        });
    }
}