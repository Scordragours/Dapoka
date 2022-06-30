<template>
<div class="sommaire">
  <router-link to='/' exact><h4 class="pb-4 border-bottom">acceuil</h4></router-link>
  <router-link to='/apropos' exact><h4 class="pb-4 border-bottom">à propos</h4></router-link>
  <router-link to='/client' exact><h4 class="pb-4 border-bottom">mon compte</h4></router-link>
  <router-link to='/historique' exact><h4 class="pb-4 border-bottom">mes commandes</h4></router-link>
</div>

</template>

<script>
export default {

}
</script>

<style>

.sommaire {
    align-items: center;
    text-align: center;
    margin: 10%;
}

</style>