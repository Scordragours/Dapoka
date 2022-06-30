<template>
  <div class="homepage">
      <banner/>

      
      <div class="resto--row">
        <RestaurantRow/>
      </div>  
      <div class="saut"><br/></div> 
      <div class="resto--row">
        <RestaurantRow/>
      </div>
      <div class="saut2"><br/></div> 
      
      <BannerPub/>
      
      
      <div class="resto--row">
        <RestaurantRow/>
      </div>
      <div class="saut"><br/></div>
      <div class="resto--row">
        <RestaurantRow/>
      </div>
      <div class="saut2"><br/></div> 
  </div>
</template>

<script>
//import BDD from '../BDD.js'

import RestaurantRow from '../components/RestaurantRow.vue'
import Banner from '../components/Banner.vue'
import BannerPub from '../components/BannerPub.vue'



export default {
  name: 'Homepage',
  components: {
    RestaurantRow,
    Banner,
    BannerPub,
    
  },  
  //setup() {
//    class Restaurant {
  //    constructor (name, image, address, tags) {
    //    this.name = name
      //  this.image = image
        //this.address = address
    //    this.tags = tags
      //}
   // }

  //  var resto = new Restaurant('Burger Queen',)

 // }
}
</script>

<style>

.resto--row {
  font-family: 'Poppins', sans-serif;
  padding: 40px;

}

@media (max-width: 740px){
.saut {
  margin: -70px;
}
.saut2 {
  margin: -40px;
}

}
</style>




