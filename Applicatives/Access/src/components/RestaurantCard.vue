<template>
  <div class="restaurant--card">
      <router-link to='/resto' exact><div class="restaurant--image"></div></router-link>
      <div class="restaurant--informations">
         <div class="top">
            <p class="price">
              Burger Queen
            </p>
            <p class="productname">
              Fast Food - Burger
            </p>
            <p class="address">
              33 avenue de Clichy à Paris 18, 75018
            </p>
         </div>
      </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss">
.restaurant--card {
    width: 18%;
    height: 30vh;

    p {
        margin: 0px;
    }

    .restaurant--image {
        background-image: url("https://images.rtl.fr/~c/2000v2000/rtl/www/1460953-un-hamburger-image-d-illustration.jpg");
        height: 170px;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        
    }

    .restaurant--informations {
        

        .top {
            margin: 10px 0px;
            align-items: center;
            justify-content: space-between;

            .name {
                font-size: 120%;
                font-weight: 700;
                color: #445863;
                
            }

            .tags {
                font-size: 80%;
                font-weight: 600;
                margin: 3px 0px;
                color: #445863;
            }

            .address {
                font-size: 60%;
                margin: 3px 0px;
                color: #445863;
            }
        }
    }
}


@media (max-width: 740px){
.restaurant--card {
    .restaurant--image {
        height: 90px; 
    
    }

    .address {
        display: none;
    }
}

}

@media (max-width: 1400px) and (min-width: 740px){
.restaurant--card {
    .restaurant--image {
        height: 130px; 
    
    }
}

}

</style>