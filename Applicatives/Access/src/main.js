import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import setAuthHeader from "./setAuthHeader";//


import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './page/homepage.vue'
import Client from './page/Client.vue'
import connexion from './page/connexion.vue'
import creation from './page/creation.vue'
import historique from './page/Historique.vue'
import apropos from './page/apropos.vue'
import restaurantpage from './page/RestaurantPage.vue'
import sommaire from './page/Sommaire.vue'
import productpage from './page/ProductPage.vue'
import menupage from './page/MenuPage.vue'
import pannier from './page/Pannier.vue'
import paiement from './page/paiement.vue'
import suivi from './page/suivi.vue'
import mentions from './page/mentions.vue'
import conditions from './page/conditions.vue'
import aide from './page/aide.vue'
import homepageresto from './page/homepageresto.vue'
import commandrecu from './page/commandrecu.vue'
import livraisonhub from './page/livraisonhub.vue'
import livraisoninfo from './page/livraisoninfo.vue'
import deletearticle from './page/deletearticle.vue'
import addarticle from './page/addarticle.vue'
import adminresto from './page/adminresto.vue'
import modifclient from './page/modifclient.vue'


const routes = [
    {path: '/', component: Homepage},
    {path: '/client', component: Client},
    {path: '/connexion', component: connexion},
    {path: '/creation', component: creation},
    {path: '/historique', component: historique},
    {path: '/apropos', component: apropos},
    {path: '/resto', component: restaurantpage},
    {path: '/sommaire', component: sommaire},
    {path: '/productpage', component: productpage},
    {path: '/menupage', component: menupage},
    {path: '/pannier', component: pannier},
    {path: '/paiement', component: paiement},
    {path: '/mentions', component: mentions},
    {path: '/conditions', component: conditions},
    {path: '/aide', component: aide},
    {path: '/homepageresto', component: homepageresto},
    {path: '/commandrecu', component: commandrecu},
    {path: '/livraisonhub', component: livraisonhub},
    {path: '/livraisoninfo', component: livraisoninfo},
    {path: '/deletearticle', component: deletearticle},
    {path: '/adminresto', component: adminresto},
    {path: '/addarticle', component: addarticle},
    {path: '/modifclient', component: modifclient},
    {path: '/suivi', component: suivi}    
]
//
if (localStorage.jwtToken) {
    setAuthHeader(localStorage.jwtToken);
} else {
    setAuthHeader(false);
}
//
const router = createRouter({
        history: createWebHistory(),
        routes
    });

const VueApp = createApp(App)

VueApp.use(router)

VueApp.mount('#app');

/*createApp(App).mount('#app')
before each vue a faire

Meta*/