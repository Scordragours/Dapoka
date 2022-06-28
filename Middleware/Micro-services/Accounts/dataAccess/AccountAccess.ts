import {Sequelize, DataTypes, ModelCtor, Op} from "sequelize";
import crypto from "crypto";

export default class AccountAccess {
    protected _sequelize: Sequelize;
    protected _account!: ModelCtor<any>;

    public constructor(sequelize?: Sequelize) {
        this._sequelize = sequelize ?? new Sequelize({
            dialect: "mssql",
            host: process.env.SQL_NETWORK,
            database: process.env.SQL_DATABASE,
            username: process.env.SQL_USER,
            password: process.env.SQL_PASSWWORD
        });
    }

    public async init(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await this._sequelize
                .authenticate()
                .then(async () => {
                    this._account = this._sequelize.define('Accounts', {
                        group: {
                            type: DataTypes.STRING,
                            allowNull: false,
                            defaultValue: "Users"
                        },

                        name: {
                            type: DataTypes.STRING,
                            allowNull: false
                        },
                        firstname: {
                            type: DataTypes.STRING,
                            allowNull: false
                        },

                        picture: {
                            type: DataTypes.STRING,
                            allowNull: true
                        },

                        email: {
                            type: DataTypes.STRING,
                            allowNull: false,
                            unique: true
                        },
                        telephoneNumber: {
                            type: DataTypes.STRING,
                            allowNull: false,
                            unique: true
                        },
                        password: {
                            type: DataTypes.TEXT,
                            allowNull: false
                        },

                        refreshToken: {
                            type: DataTypes.STRING,
                            allowNull: true
                        },
                        dateExpirationToken: {
                            type: DataTypes.DATE,
                            allowNull: true
                        },

                        suspended: {
                            type: DataTypes.BOOLEAN,
                            defaultValue: false
                        },
                        activate: {
                            type: DataTypes.BOOLEAN,
                            defaultValue: false
                        },

                        sponsorshipCode: {
                            type: DataTypes.STRING,
                            allowNull: false
                        },
                        sponsorshipCodeLastUsed: {
                            type: DataTypes.DATE,
                            allowNull: false
                        },

                        location: {
                            type: DataTypes.STRING,
                            allowNull: true
                        },
                        card: {
                            type: DataTypes.STRING,
                            allowNull: true
                        }
                    });
                    await this._sequelize.sync();
                    return resolve("");
                })
                .catch((error) => reject(error));
        });
    }

    public getAllAccounts(query?: any): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer les comptes."
            }
        };

        return new Promise((resolve, reject) => {
            this.init()
                .then(() => {
                    this._account.findAll({
                        limit: query.limit,
                        offset: query.offset,
                        order: [["id", "ASC"]],
                        where: {
                            [Op.and]: [
                                {group: {[Op.like]: `${query.group ?? ''}%`}},
                                {[Op.or]: [{name: {[Op.like]: `${query.search ?? ''}%`}}, {firstname: {[Op.like]: `${query.search ?? ''}%`}}]}
                            ]
                        }
                    })
                        .then(values => values.length > 0 ? resolve({
                            status: 200,
                            response: values
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun compte n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage));
        });
    }

    public getAccount(email: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de récupérer le compte."
            }
        };

        return new Promise((resolve, reject) =>
            this.init()
                .then(() =>
                    this._account.findOne({where: {email}})
                        .then(value => value ? resolve({
                            status: 200,
                            response: value
                        }) : reject({
                            status: 404,
                            response: {
                                message: "Aucun compte n'a été trouvé."
                            }
                        }))
                        .catch(() => reject(errorMessage))
                )
                .catch(() => reject(errorMessage))
        );
    }

    public createAccount(account: any): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de créer le compte."
            }
        };

        return new Promise((resolve, reject) =>
            this.init()
                .then(() => {
                    let token = crypto.randomBytes(128).toString("base64");
                    let date = new Date();
                    date.setDate(date.getDate() + 1);

                    let dateUsed = new Date();
                    dateUsed.setDate(date.getDate() - 8);

                    this._account.create({
                        ...account,
                        refreshToken: token,
                        dateExpirationToken: date,
                        sponsorshipCode: `${account.name.toUpperCase().slice(account.name.length - 3)}${account.firstname.toUpperCase().slice(account.firstname.length - 3)}${account.telephoneNumber.slice(account.telephoneNumber.length - 4)}`,
                        sponsorshipCodeLastUsed: dateUsed
                    })
                        .then(() => resolve({
                            status: 200,
                            token: token,
                            response: {
                                message: "Le compte a été correctement créé."
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject(errorMessage))
        );
    }

    public updateAccount(email: string, data: any): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de modifier le compte."
            }
        };

        return new Promise((resolve, reject) => {
            this.getAccount(email)
                .then(() => {
                    this.init()
                        .then(() => {
                            this._account.update(data, {where: {email}})
                                .then(() => resolve({
                                    status: 200,
                                    response: {
                                        message: "Le compte a été correctement modifié."
                                    }
                                }))
                                .catch(() => reject(errorMessage))
                        })
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject({
                    status: 404,
                    response: {
                        message: "Aucun compte n'a été trouvé."
                    }
                }))
        });
    }

    public deleteAccount(email: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de supprimer le compte."
            }
        };

        return new Promise((resolve, reject) => {
            this.getAccount(email)
                .then(() => {
                    this.init()
                        .then(() => this._account.destroy({where: {email}})
                            .then(() => resolve({
                                status: 200,
                                response: {
                                    message: "Le compte a été correctement supprimé."
                                }
                            }))
                            .catch(() => reject(errorMessage))
                        )
                        .catch(() => reject(errorMessage))
                })
                .catch(() => reject({
                    status: 404,
                    response: {
                        message: "Aucun compte n'a été trouvé."
                    }
                }))
        });
    }

    public authentication(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getAccount(email)
                .then(value => value.response)
                .then(value => {
                    if (value.email !== email || value.password !== password) {
                        reject({
                            status: 500,
                            response: {
                                message: "Le mot de passe ou l'email ne correspondent pas."
                            }
                        })
                        return;
                    }

                    if (!value.activate || value.suspended) {
                        reject({
                            status: 500,
                            response: {
                                message: "Impossible de vous connecter."
                            }
                        })
                        return;
                    }

                    let token = crypto.randomBytes(128).toString("base64");
                    let date = new Date();
                    date.setDate(date.getDate() + 1);

                    this.updateAccount(email, {
                        refreshToken: token,
                        dateExpirationToken: date
                    })
                        .then(() => resolve({
                            status: 200,
                            response: {
                                token,
                                email
                            }
                        }))
                        .catch(() => reject({
                            status: 500,
                            response: {
                                message: "Impossible de vous connecter."
                            }
                        }));

                })
                .catch(() => reject({
                    status: 404,
                    response: {
                        message: "Aucun compte n'a été trouvé."
                    }
                }));
        });
    }

    public forgetPassword(email: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de générer un nouveau mot de passe."
            }
        };

        return new Promise((resolve, reject) => {
            this.getAccount(email)
                .then(value => value.response)
                .then(value => {
                    if (value.email !== email || !value.activate || value.suspended) {
                        reject(errorMessage)
                        return;
                    }

                    let token = crypto.randomBytes(128).toString("base64");
                    let date = new Date();
                    date.setDate(date.getDate() + 1);

                    this.updateAccount(email, {
                        refreshToken: token,
                        dateExpirationToken: date
                    })
                        .then(() => resolve({
                            status: 200,
                            response: {
                                token,
                                email
                            }
                        }))
                        .catch(() => reject(errorMessage));
                })
                .catch(() => reject({
                    status: 404,
                    response: {
                        message: "Aucun compte n'a été trouvé."
                    }
                }));
        });
    }

    public changePassword(email: string, token: string, password: string): Promise<any> {
        let errorMessage = {
            status: 500,
            response: {
                message: "Impossible de changer le mot de passe."
            }
        };

        return new Promise((resolve, reject) => {
            this.getAccount(email)
                .then(value => value.response)
                .then(value => {
                    if (value.email !== email || value.refreshToken !== token || !value.activate || value.suspended) {
                        reject(errorMessage)
                        return;
                    }

                    this.updateAccount(email, {
                        password
                    })
                        .then(() => resolve({
                            status: 200,
                            response: {
                                message: "Le mot de passe a été correctement changé."
                            }
                        }))
                        .catch(() => reject({
                            status: 404,
                            response: {
                                message: "Aucun compte n'a été trouvé."
                            }
                        }));
                })
                .catch(() => reject({
                    status: 404,
                    response: {
                        message: "Aucun compte n'a été trouvé."
                    }
                }));
        });
    }

    public activateAccount(email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.updateAccount(email, {
                activate: true
            })
                .then(() => resolve({
                    status: 200,
                    response: {
                        message: "Le compte a été correctement activé."
                    }
                }))
                .catch(() => reject({
                    status: 500,
                    response: {
                        message: "Impossible d'activer le compte."
                    }
                }))
        });
    }

    public verifyCode(code: string, email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let errorMessage = {
                status: 500,
                response: {
                    message: "Impossible d'utiliser le code promotionnel."
                }
            };

            this.init()
                .then(() => {
                    let date = new Date();
                    date.setDate(date.getDate() - 7);
                    this._account.findOne({
                        where: {
                            [Op.and]: [
                                {sponsorshipCode: code},
                                {email: {[Op.ne]: email}},
                                {sponsorshipCodeLastUsed: {[Op.lte]: date}}
                            ]
                        }
                    })
                        .then(value => value ? resolve({
                            status: 200,
                            response: {
                                email: value.email,
                                value: 5/100,
                                message: "Code promotionnel valide."
                            }
                        }) : reject(errorMessage))
                        .catch(() => reject(errorMessage))
                })
                .catch(() => reject(errorMessage));
        });
    }

    public useCode(code: string, email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.verifyCode(code, email)
                .then(value => value.response)
                .then(account => {
                    this.updateAccount(account.email, {
                        sponsorshipCodeLastUsed: new Date()
                    })
                        .then(() => resolve({
                            status: 200,
                            response: {
                                message: "Le code promotionnel a été utilisé avec succès.",
                                promo: account.value,
                            }
                        }))
                        .catch(() => reject({
                            status: 500,
                            response: {
                                message: "Impossible d'utiliser le code promotionnel."
                            }
                        }));
                })
                .catch(error => reject(error));
        });
    }
}