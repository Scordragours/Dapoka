<template>
  <div class="banner">
      <div>
        <div class="line1">Vos plats préférés</div>
        <div class="line2">livrés chez vous</div>
     </div> 
  </div>
</template>

<script>
export default {
    name: 'Banner',

}
</script>

<style>

.line1,
.line2,

.line1 {
  font-size: 3.1em;
  padding: 0% 21% 0% 0%;
  font-weight: 700;
  color: #B1D5EA;
  font-family: 'Poppins';
  text-align: right;
}

.line2 {
  font-size: 3.3em;
  padding: 0% 21% 0% 0%;
  font-weight: 800;
  color: #fff;
  font-family: 'Poppins';
  text-align: right;
}

.banner {
    background-image:url("../../Banner.png");
    background-size:cover;
    background-position:right center;
    width: 100%;
    padding:60px 0; 
    
  }  

</style>