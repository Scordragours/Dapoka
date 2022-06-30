<template>
<div class="connexion">
  <div class="container px-4 py-5 mx-auto">
    <div class="card card0">
        <div class="d-flex flex-lg-row flex-column-reverse">
            <div class="card card2">
                <div class="my-auto mx-md-5 px-md-5 right">
                    <img class="logoimg" src="../../logodapoka.svg" height="85" alt="logo dapoka" />
                    <br/>
                    <br/>
                    <small class="text-white">Créé avec l'objectif de renforcer le lien entre consomateurs et restaurants, Dapoka a vu le jour en 2022 afin de permettre aux petits gourmants de commander et dégutser leurs plats préférés sans bouger de chez eux.</small>
                </div>
            </div>
            <div class="card card1">
                <div class="row justify-content-center my-auto">
                    <div class="col-md-10 col-10 my-2">
                        <h3 class="mb-2 text-center heading">Bienvenue sur Dapoka</h3>

                        <h6 class="msg-info text-center">Ne perds pas une seconde et connectes-toi</h6>

                        <form @submit.prevent="loginUser">

                        <div class="form-group">
                            <label class="form-control-label text-muted">Identifiant</label>
                            <input type="text" id="email" name="email" placeholder="Adresse e-mail" class="form-control" v-model="email">
                        </div>

                        <div class="form-group">
                            <label class="form-control-label text-muted">Mot de passe</label>
                            <input type="password" id="password" name="password" placeholder="Mot de passe" class="form-control" v-model="password">
                        </div>

                        <div class="row justify-content-center my-2 px-3">
                            <button class="btn-block btn-color" type="submit">Se connecter</button>
                        </div>
                        
                        </form>

                        <div class="row text-center my-1">
                            <a href="#"><small class="text-muted">Mot de passe oublié ?</small></a>
                        </div>
                    </div>
                </div>
                <div class="bottom text-center mb-1">
                    <p href="#" class="sm-text mx-auto mb-3">Tu n'es pas encore inscrit ?</p>
                    <div class="button--white">
                        <button class="btn btn-white ml-2"><router-link to="/creation" exact>Créer un compte</router-link></button>
                        
                    </div>
                </div>
                <br/>
            </div>

        </div>
    </div>
  </div>
</div>
</template>

<script>
//import {useRouter} from "vue-router";
import axios from "axios";
import setAuthHeader from '@/setAuthHeader';

export default {
    name: 'connexion',

    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        loginUser() {
            const credentials = {
                email: this.email,
                password: this.password,
            };

            //const router = useRouter();

            axios({
                method: "POST",
                url: "http://127.0.0.1:3000/account/authentication/",
                headers: {
                "token-api": "210acc4851961df7553144e8b1d77f6f"
                },
                data:credentials
                })
              .then((response) => {
                localStorage.setItem('jwtToken', response.data.token)
                setAuthHeader(response.data.token);
              })
              //.then(this.$router.push('/'))
              .catch((err) => console.log(err.response));
              
                
            
        },
    },
    
};
</script>

<style>
body {
    color: #445863;
    overflow-x: hidden;
    height: 80%;
    background-repeat: no-repeat;
}

input:focus, textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #445863 !important;
    outline-width: 0;
    font-weight: 400;
}

button:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline-width: 0;
}

.card {
    border-radius: 0;
    border: none;
}

.card1 {
    width: 50%;
    padding: 40px 30px 10px 30px;
}

.card2 {
    width: 50%;
    background-color: #B1D5EA;
}

#logo {
    width: 70px;
    height: 60px;
}

.heading {
    margin-bottom: 60px !important;
}

::placeholder {
    color: #BECED7 !important;
    opacity: 1;
}

:-ms-input-placeholder {
    color: #445863 !important;
}

::-ms-input-placeholder {
    color: #445863 !important;
}

.form-control-label {
    font-size: 12px;
    margin-left: 15px;
}

.msg-info {
    padding-left: 15px;
    margin-bottom: 30px;
}

.btn-color {
    text-decoration: none;
    border-radius: 50px;
    color: #fff;
    background-color: #B1D5EA;
    padding: 15px;
    cursor: pointer;
    border: none !important;
    margin-top: 40px;
}

.btn-color:hover {
    color: #fff;
    background-color: #445863;
}

.btn--white {
    text-decoration: none;
    clear: both;
    font-size: 15px;
    margin-left: 10px;
}

.btn-white {
    text-decoration: none;
    border-radius: 50px;
    color: #445863;
    font-size: 15px;
    background-color: #fff;
    padding: 8px 40px;
    cursor: pointer;
    border: 2px solid #445863 !important;
}

.btn-white:hover {
    color: #fff;
    background-color: #445863;
}

a {
    text-decoration: none;

}

a:hover {
    text-decoration: none;

}

.bottom {
    width: 100%;
    margin-top: 50px !important;
}

.sm-text {
    font-size: 15px;
}

@media screen and (max-width: 992px) {
    .card1 {
        width: 100%;
        padding: 40px 30px 10px 30px;
    }

    .card2 {
        width: 100%;
    }

    .right {
        margin-top: 100px !important;
        margin-bottom: 100px !important;
    }
}

@media screen and (max-width: 768px) {
    .container {
        padding: 10px !important;
    }

    .card2 {
        padding: 50px;
    }

    .right {
        margin-top: 50px !important;
        margin-bottom: 50px !important;
    }
}
</style>