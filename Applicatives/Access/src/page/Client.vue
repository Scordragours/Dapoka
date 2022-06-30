<template>
  <div class="test">
    <div class="wrapper bg-white mt-sm-5">
        <h4 class="pb-5 border-bottom">Mon compte</h4>
      
        
      
    <div class="py-2">
        <div class="testtttt">
            <div v-for="(account, accounts) in accounts" :key="accounts.email" >
            {{ accounts.name }}
        </div>

        <div class="row py-2">
            <b>Mes informations</b>
            <br/>
            <br/>
            <div class="col-md-6">
                <label for="name">Prénom</label>
                <p>{{ accounts.name }}</p>
            </div>
            <br/>
            <div class="col-md-6 pt-md-0 pt-3">
                <label for="firstname">Nom</label>
                <p>{{ accounts.firstname }}</p>
            </div>
            <br/>
        </div>
        
        <div class="row py-2">
            <div class="col-md-6">
                <label for="email">Adresse Mail</label>
                <p>{{ accounts.email }}</p>
            </div>
            <br/>
            <div class="col-md-6 pt-md-0 pt-3">
                <label for="phone">Numéro de téléphone</label>
                <p>{{ accounts.telephoneNumber }}</p>
            </div>
            <br/>
        </div>
        <div class="row py-2">
            <div class="col-md-6 pt-md-0 pt-3">
                <label for="password">Mot de passe</label>
                <p>{{ accounts.password }}</p>
            </div>
                       
        </div>
        <br/>
        <div class="py-3 pb-4 border-bottom">
            <router-link to="/modifclient" exact><button class="btn primary">Modifier les informations</button></router-link>
        </div>
        <br/>
        <div class="py-3 pb-4 border-bottom">
            <div>
                <b>Parrainer un proche</b>
                <p>Transmettez votre code de parrainage à vos proches afin de bénéficier de réductions :</p>
            </div>
            <div class="code">
                CODE : <p>{{ accounts.code }}</p>
            </div>
            <br/>           
        </div>
        <br/>
        <div class="d-flex center justify-content-between" id="deactivate">
            <div>
                <b>Quitter Dapoka</b>
                <p>Si vous désactivez, toutes vos données seront supprimées</p>
            </div>
            <div class="button--danger">
                <button class="btn danger"><router-link to="/connexion" exact><div class="disconnect">Se déconnecter</div></router-link></button>
                <button class="btn danger">Désactiver</button>
            </div>
        </div>
    </div>
    </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
//import setAuthHeader from '@/setAuthHeader';

export default {
    name: 'Client',

    data(){
        return{
            accounts: {}
        }
    },

    mounted(){
        axios({
           method: "GET",
           url: "http://127.0.0.1:3000/account/"+localStorage.getItem('email'),
           headers: {
            "token-api": "210acc4851961df7553144e8b1d77f6f",
            "token": localStorage.getItem('jwtToken')
           }
        })
        
        .then((reponse) => {
            this.accounts = reponse.data
            console.log(this.accounts)
            console.log(localStorage.jwtToken)
        });
        
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.test{
    margin: 0% 10% 0% 10%;
    padding: 0;
    box-sizing: border-box;
}

body{
    font-family: 'Poppins', sans-serif;
    background-color: #fff;
}

.wrapper{
    padding: 30px 50px;
    border: 1px solid #B1D5EA;
    border-radius: 15px;
    margin: 10px auto;
    max-width: 900px;
}
h4{
    font-size: 30px;
    font-weight: 600;
    color: #445863;
}

b{
    color: #445863;
}

p{
    color: #445863;
}

.disconnect {
    color: #EC5564;
}

.disconnect:hover {
    color: #fff;
}

label{
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 500;
    color: #777;
    padding-left: 3px;
}

.form-control{
    border-radius: 10px;
}

input[placeholder]{
    font-weight: 500;
}
.form-control:focus{
    box-shadow: none;
    border: 1.5px solid #B1D5EA;
}
select{
    display: block;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    height: 40px;
    padding: 5px 10px;
    /* -webkit-appearance: none; */
}

select:focus{
    outline: none;
}
.button{
    background-color: #fff;
    color: #B1D5EA;
    
}
.button:hover{
    background-color: #B1D5EA;
    color: #fff;
}
.primary{
    background-color: #B1D5EA;
    color: #fff;
    margin-right: 30px;
}
.primary:hover{
    background-color: #445863;
    color: #fff;
}

.code{
    background-color: #fff;
    color: #9ED36A;
    border: 1px solid #9ED36A;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    font-size: 18px;

}
.code:hover{
    background-color: #9ED36A;
    color: #fff;
}

.button--danger{
    text-decoration: none;
    clear: both;
    float: right;   
}
.danger{

    background-color: #fff;
    text-decoration: none;
    color: #EC5564;
    border: 1px solid #EC5564;
    margin-left: 20px;

}
.danger:hover{
    background-color: #EC5564;
    color: #fff;
}
@media(max-width:576px){
    .wrapper{
        padding: 25px 20px;
    }
    #deactivate{
        line-height: 18px;
    }


}


</style>