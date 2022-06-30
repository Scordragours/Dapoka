<template>
    <div class="test">
    <div class="wrapper bg-white mt-sm-5">
    <div class="py-2">
        <form @submit.prevent="modifUser">
        <div class="row py-2">
            <b>Modifier mes informations</b><br/><br/>
            <div class="col-md-6">
                <label for="firstname">Prénom</label>
                <input type="text" class="bg-light form-control" id="firstname" name="firstname" placeholder="Prénom" v-model="firstname">
            </div>
            <br/>
            <div class="col-md-6 pt-md-0 pt-3">
                <label for="lastname">Nom</label>
                <input type="text" class="bg-light form-control" id="name" name="name" placeholder="Nom" v-model="name">
            </div>
            <br/>
        </div>
        
        <div class="row py-2">
            <div class="col-md-6">
                <label for="email">Adresse Mail</label>
                <input type="text" class="bg-light form-control" id="email" name="email" placeholder="Saisis ton e-mail" v-model="email">
            </div>
            <br/>
            <div class="col-md-6 pt-md-0 pt-3">
                <label for="phone">Numéro de téléphone</label>
                <input type="number" class="bg-light form-control" id="telephoneNumber" name="telephoneNumber" placeholder="Numéro de téléphone" v-model="telephoneNumber">
            </div>
            <br/>
        </div>
        <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3">
                <label for="password">Mot de passe</label>
                <input type="password" class="bg-light form-control" minlength="8" required id="password" name="password" placeholder="Mot de passe" v-model="password">
            </div>
                       
        </div>
        <br/>
        <div class="py-3 pb-4 border-bottom">
            <button class="btn primary" type="submit">Sauvegarder les modifications</button>
        </div>
        </form>
    </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {useRouter} from "vue-router";

export default {
    data() {
        return {
            
            name: "",
            firstname: "",
            email: "",
            password: "",
            telephoneNumber: "",
        };
    },
    methods: {
        modifUser() {
            const credentials = {

                name: this.name,
                firstname: this.firstname,
                email: this.email,
                password: this.password,
                telephoneNumber: this.telephoneNumber,
            };

            const router = useRouter();

            axios({
                method: "POST",
                url: "http://10.176.128.135:3000/account/",
                headers: {
                "token-api": "210acc4851961df7553144e8b1d77f6f"
                },
                data:credentials
                })
              .then((response) => console.log(response.data))
              .then(router.push('/client'))
              .catch((err) => console.log(err.response));

            
            
        },
    },
    
};
</script>

<style>

</style>