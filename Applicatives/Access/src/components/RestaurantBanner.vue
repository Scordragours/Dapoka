<template>

  <div class="banner--resto">
      <div>
        <div class="restoname">Burger Queen</div>
        <div class="restoaddress">33 avenue de Clichy à Paris 18, 75018</div>
        <div class="restowords">Fast Food - Burger</div>
     </div> 
  </div>
 
</template>

<script>
export default {
    name: 'restaurantbanner',
}
</script>

<style>
.restoname,
.restoaddress,
.restowords,

.restoname {
  font-size: 3.1em;
  padding: 0% 0% 0% 12%;
  font-weight: 700;
  color: #fff;
  font-family: 'Poppins';
  text-align: left;
}

.restoaddress {
  font-size: 1.3em;
  padding: 0% 0% 0% 12%;
  font-weight: 400;
  color: #fff;
  font-family: 'Poppins';
  text-align: left;
}

.restowords {
  font-size: 1.1em;
  padding: 0% 0% 0% 12%;
  font-weight: 600;
  color: #B1D5EA;
  font-family: 'Poppins';
  text-align: left;
}

.banner--resto {
    background-color:#2e3b42;
    background-blend-mode: soft-light;
    background-image: url("https://images.rtl.fr/~c/2000v2000/rtl/www/1460953-un-hamburger-image-d-illustration.jpg");
    
    background-size:cover;
    background-position:right center;
    width: 100%;
    padding:60px 0;
    
  }  
</style>