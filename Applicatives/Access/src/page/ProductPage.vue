<template>
  <restaurantbanner/>
    
<div class="container">
    <div class="card">
        <div class="card-body">
            <br/>
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6">
                    <div class="white-box text-center"><img class="product--image" src="../../Burger400300.jpg" alt="image produit"/></div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6">
                    <h4 class="box-title mt-5">TripleCheese</h4>
                    <br/>
                    <p>Pain bun, 3 délicieux steaks hachés et ses 3 tranches de fromage fondant. Avec ketchup, mayonnaise, oignons en dé et cornichons</p>
                    <h2 class="mt-5">
                        6,99€
                    </h2>
                <div class="py-3 pb-4">
                    <button class="btn primary"><router-link to="/pannier" exact>Ajouter au panier</router-link></button>
                    <button class="btn border button"><router-link to="/resto" exact>Retour à la boutique</router-link></button>
                </div>

                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>

import restaurantbanner from '../components/RestaurantBanner.vue'

export default {
    name: 'productpage',
    components: {
        restaurantbanner,
    
    }
}
</script>

<style>

</style>