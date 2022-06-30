<template>
  <restaurantbanner/>
  <div class="allproducts">
    <h4 class="pb-4 border-bottom">Nos produits</h4>
    <div class="products">
      <Product/><Product/><Product/><Product/>
    </div>
    <div class="products">
      <Product/><Product/><Product/><Product/>
    </div>
        <h4 class="pb-4 border-bottom">Nos menus</h4>
    <div class="products">
      <Menus/><Menus/><Menus/><Menus/>
    </div>
    <div class="products">
      <Menus/><Menus/><Menus/><Menus/>
    </div>
  </div>
  
  

  
</template>

<script>
import restaurantbanner from '../components/RestaurantBanner.vue'
import Product from '../components/Product.vue'
import Menus from '../components/Menus.vue'


export default {
    name: 'restaurantpage',
    components: {
        restaurantbanner,
        Product,
        Menus,
        

    
    }
}
</script>

<style>

.allproducts{
  margin: 4% 10% 0% 10%;

}

.products {
  margin: 0% 3% 2% 3%;
  display: flex;
  justify-content: space-between;
}

</style>