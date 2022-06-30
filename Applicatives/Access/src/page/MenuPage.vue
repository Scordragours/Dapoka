<template>
  <restaurantbanner/>
    
<div class="container">
    <div class="card">
        <div class="card-body">
            <br/>
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6">
                    <div class="white-box text-center"><img class="product--image" src="../../menu400300.jpg" alt="image menu"/></div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6">
                    <h4 class="box-title mt-5">Menu TripleCheese</h4>
                    <br/>
                    <p>Boission, accompagnement, et notre fameux Triple Cheese, avec Pain bun, 3 délicieux steaks hachés et ses 3 tranches de fromage fondant. Avec ketchup, mayonnaise, oignons en dé et cornichons</p>
                    <h2 class="mt-5">
                        8,99€
                    </h2>
                <form>
                    <fieldset class="form-group">
                        <div class="row">
                            <h5 class="box-title mt-4">Accompagnement</h5>
                                <div class="col-sm-10">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="acc" id="acc1" value="option1" checked>
                                        <label class="form-check-label" for="acc1">
                                        Frites
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="acc" id="acc2" value="option2" checked>
                                        <label class="form-check-label" for="acc2">
                                        Potatoes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="acc" id="acc3" value="option3" checked>
                                        <label class="form-check-label" for="acc3">
                                        Oignons Rings
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="acc" id="acc4" value="option4" checked>
                                        <label class="form-check-label" for="acc4">
                                        Aucun
                                        </label>
                                    </div>                                     
                                </div>
                        </div>
                
                    </fieldset>
                </form>
                <form>
                    <fieldset class="form-group">
                        <div class="row">
                            <h5 class="box-title mt-4">Boissons</h5>
                                <div class="col-sm-10">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="boisson" id="boisson1" value="option1" checked>
                                        <label class="form-check-label" for="boisson1">
                                        Coca-Cola (33cl)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="boisson" id="boisson2" value="option2" checked>
                                        <label class="form-check-label" for="boisson2">
                                        Ice-Tea (33cl)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="boisson" id="boisson3" value="option3" checked>
                                        <label class="form-check-label" for="boisson3">
                                        Fanta (33cl)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="boisson" id="boisson4" value="option4" checked>
                                        <label class="form-check-label" for="boisson4">
                                        Oasis (33cl)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="boisson" id="boisson5" value="option5" checked>
                                        <label class="form-check-label" for="boisson5">
                                        Tropico (33cl)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="boisson" id="boisson6" value="option6" checked>
                                        <label class="form-check-label" for="boisson6">
                                        Minute Maid Orange (33cl)
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="boisson" id="boisson7" value="option7" checked>
                                        <label class="form-check-label" for="boisson7">
                                        Vittel (50cl)
                                        </label>
                                    </div>                                     
                                </div>
                        </div>
                    </fieldset>
                    <br/>
                </form>
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
    name: 'menupage',
    components: {
        restaurantbanner,
    
    }
}
</script>

<style>

</style>