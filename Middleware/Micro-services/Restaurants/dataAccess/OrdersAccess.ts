import {Model, model, Types, Schema} from "mongoose";
import * as dotenv from "dotenv";
import Access from "./Access";
import ArticlesAccess from "./ArticlesAccess";
import MenusAccess from "./MenusAccess";
import Utils from "../utils";
import statistic from "../routes/statistics";

dotenv.config();

enum TypeProduct {
    MENU = "Menu",
    ARTICLE = "Article"
}

interface IProduct {
    id: string,
    type: TypeProduct,
    price: number
}

const schemaProduct: Schema<IProduct> = new Schema<IProduct>({
    id: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: TypeProduct,
        require: true,
    },
    price: {
        type: Number,
        require: true
    }
});

export enum StatusDelivers {
    ORDER = "Order",
    IN_PREPARATION = "In_Preparation",
    IN_DELIVERY = "In_Delivery",
    DELIVERED = "Delivered"
}

interface IStatusDelivers {
    status: StatusDelivers,
    date: Date
}

const schemaStatus: Schema<IStatusDelivers> = new Schema<IStatusDelivers>({
    status: {
        type: String,
        enum: StatusDelivers,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    }
});

export interface IOrders {
    idRestaurant: number,
    idUser: number
    idDeliver?: number,
    status: Types.DocumentArray<IStatusDelivers>,
    products: Types.DocumentArray<IProduct>,
    totalPrice: number,

    userLocation: String,

    restaurantLocation: String,
    promotionCode?: string,

    lastStatus: StatusDelivers,
    date: Date
}

const schemaOrders: Schema<IOrders> = new Schema<IOrders>({
    idRestaurant: {
        type: Number,
        require: true,
    },
    idUser: {
        type: Number,
        require: true,
    },
    idDeliver: {
        type: Number,
        require: false,
    },
    status: {
        type: [schemaStatus],
        require: true,
    },
    products: {
        type: [schemaProduct],
        require: true,
    },
    totalPrice: {
        type: Number,
        require: true,
    },
    userLocation: {
        type: String,
        require: true,
    },
    restaurantLocation: {
        type: String,
        require: true,
    },

    lastStatus: {
        type: String,
        enum: StatusDelivers,
        require: true,
    },

    date: {
        type: Date,
        require: true,
    },

    promotionCode: {
        type: String,
        require: false
    }
});
const Orders: Model<IOrders, {}, {}, {}, Schema<IOrders>> = model("Orders", schemaOrders);

export default class OrdersAccess extends Access {
    public getOrders(): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les commandes."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Orders.find({})
                        .then(values => values.length > 0 ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucune commande n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public getOrdersByUserOrRestaurantOrDeliver(id: number): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les commandes."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Orders.find({$or: [{idUser: id}, {idRestaurant: id}, {idDeliver: id}]})
                        .then(values => values.length > 0 ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucune commande n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public getOrder(id: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer la commande."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Orders.findOne({_id: id})
                        .then(value => value ? resolve({
                            status: 200,
                            response: value
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucune commande n'a pas été trouvée."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public static verifyProduct(products: any[], idRestaurant: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let productsWithPrice: any[] = [];
            for (const product of products) {
                switch (product.type) {
                    case TypeProduct.ARTICLE:
                        await new ArticlesAccess()
                            .getArticle(product.id)
                            .then(value => value.response)
                            .then(value => {
                                if (value.idRestaurant != idRestaurant)
                                    return reject();
                                productsWithPrice.push({
                                    id: product.id,
                                    type: product.type,
                                    price: value.promotion ? value.price - value.price * value.promotion : value.price
                                });
                            })
                            .catch(() => reject());
                        break;
                    case TypeProduct.MENU:
                        await new MenusAccess()
                            .getMenu(product.id)
                            .then(value => value.response)
                            .then(value => {
                                if (value.idRestaurant != idRestaurant)
                                    reject();

                                productsWithPrice.push({
                                    id: product.id,
                                    type: product.type,
                                    price: value.promotion ? value.price - value.price * value.promotion : value.price
                                });
                            })
                            .catch(() => reject());
                        break;
                }
            }
            resolve(productsWithPrice);
        });
    }

    public createOrder(menus: IOrders, token: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de créer la commande."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    OrdersAccess.verifyProduct(menus.products, menus.idRestaurant)
                        .then(async (products: any) => {
                            let totalPrice = products.map((value: { price: number; }) => value.price).reduce((accumVariable: number, currentValue: number) => accumVariable + currentValue);

                            if (menus.promotionCode)
                                await Utils.transport({
                                    method: "POST",
                                    url: `/account/sponsorship-code/use/`,
                                    headers: {
                                        "token-api": process.env.ID_APP as string,
                                        token: token
                                    },
                                    data: {
                                        code: menus.promotionCode
                                    }
                                })
                                    .then(result => result.response)
                                    .then(result => totalPrice -= totalPrice * result.promo)
                                    .catch(() => {
                                    })

                            Orders.insertMany([
                                {
                                    ...menus,
                                    status: [
                                        {
                                            status: StatusDelivers.ORDER,
                                            date: new Date()
                                        }
                                    ],
                                    products,
                                    totalPrice: totalPrice,
                                    lastStatus: StatusDelivers.ORDER,
                                    date: new Date()
                                } as IOrders
                            ])
                                .then(() => resolve({
                                    status: 200,
                                    response: {
                                        message: "Votre commande a bien été prise en compte."
                                    }
                                }))
                                .catch(() => reject(errorMessage));
                        })
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public updateStatus(idOrder: string, status: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de modifier le status de la commande."
            }
        };

        return new Promise((resolve, reject) => {
            this.getOrder(idOrder)
                .then(value => value.response)
                .then((value: IOrders) => {
                    value.status.push({
                        status: (<any>StatusDelivers)[status],
                        date: new Date()
                    } as IStatusDelivers);

                    this.init()
                        .then(() => {
                            Orders.updateOne({_id: idOrder}, {
                                ...value,
                                lastStatus: (<any>StatusDelivers)[status],
                                date: new Date()
                            } as IOrders)
                                .then(value => value ? resolve({
                                    status: 200,
                                    response: {
                                        message: "Le status de la commande a été correctement actualisé."
                                    }
                                }) : reject({
                                    status: 404,
                                    response: {
                                        message: "Aucune commande n'a pas été trouvée."
                                    }
                                }))
                                .catch(() => reject(errorMessage));
                        })
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public deleteOrder(idOrder: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de supprimer la commande."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Orders.findOneAndDelete({_id: idOrder})
                        .then(value => value ? resolve({
                            status: 200,
                            response: {
                                message: "La commande a été correctement supprimée."
                            }
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucune commande n'a pas été trouvée."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage))
        });
    }

    public statisticOrder(): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les statistiques."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    Orders.aggregate([
                        {$match: {date: {$gt: new Date(new Date().getDate() - 7)}}},
                        {
                            $group: {
                                "_id": {
                                    lastStatus: "$lastStatus",
                                    date: {$dateToString: {date: "$date", format: "%Y-%m-%d"}}
                                },
                                countCommand: {$sum: 1},
                                totalBenefice: {$sum: "$totalPrice"}
                            }
                        },
                        {$sort: {_id: -1}}
                    ])
                        .then(data => {

                            Orders.aggregate([
                                {$match: {lastStatus: {$ne: "Delivered"}}},
                                {
                                    $group: {
                                        "_id": null,
                                        countCommand: {$sum: 1},
                                        totalBenefice: {$sum: "$totalPrice"}
                                    }
                                }
                            ])
                                .then(result => result[0])
                                .then(generalStatistic => {

                                    Orders.aggregate([
                                        {
                                            $group: {
                                                "_id": null,
                                                countCommandEnd: {$sum: 1},
                                                totalBeneficeEnd: {$sum: "$totalPrice"}
                                            }
                                        }
                                    ])
                                        .then(result => result[0])
                                        .then(generalStatisticOrder => {
                                            resolve({
                                                status: 200,
                                                response: {
                                                    generalStats: {
                                                        ...generalStatistic,
                                                        ...generalStatisticOrder
                                                    },
                                                    data
                                                }
                                            })
                                        })
                                        .catch(() => reject(errorMessage));

                                })
                                .catch(() => reject(errorMessage));

                        })
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage))
        });
    }

    public statisticOrderByRestaurant(id: number): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les statistiques."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {

                    Orders.aggregate([
                        {
                            $match: {
                                date: {$gt: new Date(new Date().getDate() - 7)},
                                lastStatus: "Delivered"
                            }
                        },
                        {
                            $group: {
                                "_id": {$dateToString: {date: "$date", format: "%Y-%m-%d"}},
                                products: {
                                    $accumulator: {
                                        init: function () {
                                            return {
                                                totalPrice: 0,
                                                nbrProduct: 0,
                                            }
                                        },
                                        // @ts-ignore
                                        accumulate : function (state, products){
                                            return {
                                                totalPrice: state.totalPrice + products.length,
                                                // @ts-ignore
                                                nbrProduct: products.map(product => product.price).reduce((totalPrice, price) => price + totalPrice),
                                            };
                                        },
                                        accumulateArgs: ["$products"],
                                        // @ts-ignore
                                        merge: function (state1, state2)  {
                                            return {
                                                totalPrice: state1.totalPrice + state2.totalPrice,
                                                nbrProduct: state1.nbrProduct + state2.nbrProduct
                                            };
                                        },
                                        // @ts-ignore
                                        finalize: function (state) {
                                            return {
                                                totalPrice: state.totalPrice,
                                                nbrProduct: state.nbrProduct,
                                                meanPrice: (state.totalPrice / state.nbrProduct)
                                            }
                                        },
                                        lang: "js"
                                    }
                                }
                            }
                        },
                        {$sort: {_id: -1}}
                    ])
                        .then(statistics => {
                            resolve({
                                status: 200,
                                response: statistics
                            })
                        })
                        .catch(() => reject(errorMessage));

                })
                .catch(() => reject(errorMessage))
        });
    }
};