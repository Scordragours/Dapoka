import {Model, model, Schema} from "mongoose";
import * as dotenv from "dotenv";
import Access from "./Access";

dotenv.config();

export interface ILogs {
    type: string,
    "api-location": string,
    origin: string,
    data: string,
    status: string,
    date: Date
}

const schema: Schema<ILogs> = new Schema<ILogs>({
    type: {
        type: String,
        require: true,
    },
    "api-location": {
        type: String,
        require: true,
    },
    origin: {
        type: String,
        require: true,
    },
    data: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    }
});
const Log: Model<ILogs, {}, {}, {}, Schema<ILogs>> = model("Logs", schema);

export default class LogsAccess extends Access {
    public getAllLogs(query: any): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les logs."
            }
        };

        return new Promise(async (resolve, reject) => {
            this.init()
                .then(() => {
                    Log.find({
                        type: {$regex: `.*${query.type ?? ""}.*`},
                        "api-location": {$regex: `.*${query["api-location"] ?? ""}.*`},
                        origin: {$regex: `.*${query.origin ?? ""}.*`},
                        status: {$regex: `.*${query.status ?? ""}.*`},
                        data: {$regex: `.*${query.data ?? ""}.*`},
                        date: {
                            $gte: query.date_start ?? new Date("1970-01-01"),
                            $lte: query.date_end ?? new Date()
                        }
                    })
                        .then(values => values.length > 0 ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun log n'a pas été trouvée."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public createLog(log: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let errorMessage = {
                status: 500,
                response: {
                    message: "Impossible de ajouter un log."
                }
            };

            this.init()
                .then(async () => {
                    Log.insertMany([{
                        ...log,
                        date: new Date()
                    }])
                        .then(() => resolve({
                            status: 200,
                            response: {
                                message: "Le log a été correctement ajouté."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }
};