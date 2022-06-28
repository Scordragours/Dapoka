import {Model, model, Types, Schema} from "mongoose";
import * as dotenv from "dotenv";
import {schemaArticles, IArticles} from "./ArticlesAccess";
import Access from "./Access";

dotenv.config();

export interface IMenus extends IArticles {
    items: Types.DocumentArray<IArticles>
}

const schemaMenus: Schema<IMenus> = new Schema<IMenus>({
    idRestaurant: {
        type: Number,
        require: true,
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
        type: [],
        require: false,
    },

    items: {
        type: [schemaArticles],
        require: false,
    }
});
const Menus: Model<IMenus, {}, {}, {}, Schema<IMenus>> = model("Menus", schemaMenus);

export default class ArticlesAccess extends Access {
    public getAllMenus(id: number): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les menus."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Menus.find({idRestaurant: id})
                        .then(values => values.length > 0 ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun menus n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public getMenu(id: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les menus."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Menus.findOne({_id: id})
                        .then(values => values ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun menus n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public createMenu(menus: IMenus): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de créer un menu."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Menus.insertMany([menus])
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

    public updateArticle(idMenu: string, data: IMenus): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de modifier le menu."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Menus.findOneAndUpdate({_id: idMenu}, data)
                        .then((value) => value ? resolve({
                            status: 200,
                            response: {
                                message: "Votre menu a été correctement modifié."
                            }
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun menu à modifier n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public deleteArticle(idMenu: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de supprimer le menu."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Menus.findOneAndDelete({_id: idMenu})
                        .then(value => value ? resolve({
                            status: 200,
                            response: {
                                message: "Votre menu a été correctement supprimé."
                            }
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun menu à supprimer n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage))
        });
    }
};