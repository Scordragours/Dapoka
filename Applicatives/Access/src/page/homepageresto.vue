<template>
<div class="wrapper bg-white mt-sm-5">
      <h4 class="pb-4 border-bottom">Bienvenue sur l'interface restaurateur</h4>
      <br/>
      <router-link to='/commandrecu' exact>
      <div class="choice1">
        <div class="tittlepage">Commandes à valider</div>
      </div>
      </router-link>
      <br/>
      <router-link to='/statresto' exact>
      <div class="choice2">
        <div class="tittlepage">Statistiques restaurant</div>
      </div>
      </router-link>
      <br/>
      <router-link to='/adminresto' exact>
      <div class="choice3">
        <div class="tittlepage">Gestion boutique</div>
      </div>
      </router-link>

</div>

</template>

<script>
export default {
    name: 'hompepageresto',

}
</script>

<style>
.tittlepage {
  font-size: 2.7em;
  font-weight: 600;
  color: #fff;
  font-family: 'Poppins';
  text-align: center;
}

.choice1 {
    background-color:#2e3b42;
    background-blend-mode: soft-light;
    background-image: url("https://images.rtl.fr/~c/2000v2000/rtl/www/1460953-un-hamburger-image-d-illustration.jpg");
    border-radius: 20px;
    background-size:cover;
    background-position:right center;
    width: 100%;
    padding: 40px 0;  
}
.choice1:hover {
    background-color:#435762;
    background-blend-mode: soft-light;
    background-image: url("https://images.rtl.fr/~c/2000v2000/rtl/www/1460953-un-hamburger-image-d-illustration.jpg");
}
.choice2 {
    background-color:#2e3b42;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80");
    border-radius: 20px;
    background-size:cover;
    background-position:right center;
    width: 100%;
    padding: 40px 0;  
}
.choice2:hover {
    background-color:#435762;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80");
}
.choice3 {
    background-color:#2e3b42;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1609692990224-e7361debec77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    border-radius: 20px;
    background-size:cover;
    background-position:right center;
    width: 100%;
    padding: 40px 0;  
}
.choice3:hover {
    background-color:#435762;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1609692990224-e7361debec77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
}
</style>