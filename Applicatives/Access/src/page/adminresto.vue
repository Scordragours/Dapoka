<template>
<div class="wrapper bg-white mt-sm-5">
      <h4 class="pb-4 border-bottom">Bienvenue sur l'interface restaurateur</h4>
      <br/>
      <router-link to='/addarticle' exact>
      <div class="admin1">
        <div class="tittlepage">Ajouter un article</div>
      </div>
      </router-link>
      <br/>
      <router-link to='/deletearticle' exact>
      <div class="admin2">
        <div class="tittlepage">Retirer un article</div>
      </div>
      </router-link>  
</div>
</template>

<script>
export default {

}
</script>

<style>
.admin1 {
    background-color:#2e3b42;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80");
    border-radius: 20px;
    background-size:cover;
    background-position:right center;
    width: 100%;
    padding: 40px 0;  
}
.admin1:hover {
    background-color:#435762;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80");
}
.admin2 {
    background-color:#2e3b42;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80");
    border-radius: 20px;
    background-size:cover;
    background-position:right center;
    width: 100%;
    padding: 40px 0;  
}
.admin2:hover {
    background-color:#435762;
    background-blend-mode: soft-light;
    background-image: url("https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80");
}
</style>