<template>
<div class="footer--page">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="company">&copy; 2022 Dapoka - Tous droits réservés.</div>

    <div class="imgbottom">
      <img class="logoimg" src="../../BurgerLogo.svg" height="45" alt="logo dapoka" />
    </div>

    <div class="links">
      <li><router-link to='/mentions' exact>Mentions légales</router-link></li>
      <li><router-link to="/conditions" exact>Conditions</router-link></li>
      <li><router-link to='/aide'>Aide</router-link></li>
    </div>
  </footer>
</div>
</template>

<script> 
export default {
    name: 'FooterPage',

}
</script>

<style>

.footer--page {
  padding: 45px;
  color: #445863;
}
.company {
  color: #445863;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  text-decoration: none;
  padding: 0 15px;
}
.imgbottom {
  text-align: center;
}

.links {
  display: flex;
  list-style: none;
}

.links li a{
  color: #445863;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  text-decoration: none;
  padding: 0 15px;
}
.links li a:hover{
  color: #965353;
}

</style>