import {Model, model, Schema} from "mongoose";
import * as dotenv from "dotenv";
import Access from "./Access";

dotenv.config();

export interface IArticles {
    idRestaurant?: number,
    name: string,
    picture: string,
    price?: number,
    promotion?: number,
    keyWords: string,
    parameters?: any[]
}

export const schemaArticles: Schema<IArticles> = new Schema<IArticles>({
    idRestaurant: {
        type: Number,
        require: false,
    },
    name: {
        type: String,
        require: true,
    },
    picture: {
        type: String,
        require: true,
    },

    price: {
        type: Number,
        require: false,
    },
    promotion: {
        type: Number,
        require: false,
    },

    keyWords: {
        type: String,
        require: true,
    },

    parameters: {
        require: false,
        type: [],
    }
});
const Articles: Model<IArticles, {}, {}, {}, Schema<IArticles>> = model("Articles", schemaArticles);

export default class ArticlesAccess extends Access {
    public getAllArticles(id: number): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les articles."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Articles.find({idRestaurant: id})
                        .then(values => values.length > 0 ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun article n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public getArticle(id: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les articles."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Articles.findOne({_id: id})
                        .then(values => values ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun article n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public createArticle(article: IArticles): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les articles."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Articles.insertMany([
                        article
                    ])
                        .then(() => resolve({
                            status: 200,
                            response: {
                                message: "Votre article a été correctement ajouté."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public updateArticle(idArticle: string, data: IArticles): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de modifier l'article."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Articles.findOneAndUpdate({_id: idArticle}, data)
                        .then(value => value ? resolve({
                            status: 200,
                            response: {
                                message: "Votre article a été correctement modifié."
                            }
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun article à modifier n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public deleteArticle(idArticle: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de supprimer l'article."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Articles.findOneAndDelete({_id: idArticle})
                        .then(value => value ? resolve({
                            status: 200,
                            response: {
                                message: "Votre article a été correctement supprimé."
                            }
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun article à supprimer n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage))
        });
    }
};