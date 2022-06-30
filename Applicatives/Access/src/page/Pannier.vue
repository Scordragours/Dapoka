<template>
<br/>
<div class="container px-4 py-5 mx-auto">
<div class="card">
            <div class="row">
                <div class="col-md-8 cart">
                    <div class="title">
                        <div class="row">
                            <div class="col"><h4><b>Pannier</b></h4></div>

                        </div>
                    </div>    
                    <div class="row border-top border-bottom">
                        <div class="row main align-items-center">
                            <div class="col-3"><img class="img-fluid" src="../../menu400300.jpg"></div>
                            <div class="col-7">
                                <div class="row text-muted">Menu TripleCheese</div>
                                <div class="row">TripleCheese, Fanta, Frites</div>
                            </div>

                            <div class="col">&euro; 8,99 <span class="close">&#10005;</span></div>
                        </div><br/><br/>
                    </div>
                    
                    <div class="row">
                        <div class="row main align-items-center">
                            <div class="col-3"><img class="img-fluid" src="../../Burger400300.jpg"></div>
                            <div class="col-7">
                                <div class="row text-muted">TripleCheese</div>
                                <div class="row">Pain, 3 steaks, 3 cheddars</div>
                            </div>

                            <div class="col">&euro; 6,99 <span class="close">&#10005;</span></div>
                        </div><br/><br/>
                    </div>
                    <div class="back-to-shop"><router-link to="/resto" exact>&leftarrow; Retour</router-link></div>
                </div>
                <div class="col-md-4 summary">
                    <div><h5><b>Résumé de commande</b></h5></div>
                    <hr>
                    <div class="row">
                        <div class="col" style="padding-left:0;">Articles</div>
                        <div class="col text-right">&euro; 15,98</div>
                    </div>
                    <div class="row">
                        <div class="col" style="padding-left:0;">Livraison</div>
                        <div class="col text-right">&euro; 1,99</div>
                    </div>
                    <br/>
                    <form>
                        <p>Code promo :</p>
                        <input id="code" class="inputing" placeholder="Enter your code">
                    </form>
                    <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                        <div class="col">Total</div>
                        <div class="col text-right">&euro; 17,97</div>
                    </div>
                    <button class="btn btn-white ml-2"><router-link to="/paiement" exact>Commander</router-link></button>
                </div>
            </div>
            
        </div>
 </div>
</template>

<script>
export default {

}
</script>

<style>

@media(max-width:767px){
    .card{
        margin: 3vh auto;
    }
}
.cart{
    background-color: #fff;
    padding: 4vh 5vh;
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
}
@media(max-width:767px){
    .cart{
        padding: 4vh;
        border-bottom-left-radius: unset;
        border-top-right-radius: 1rem;
    }
}
.summary{
    background-color: #B1D5EA;
    border-radius: 4vh;
    padding: 4vh;
    color: #fff;
}
@media(max-width:767px){
    .summary{
    border-top-right-radius: unset;
    border-bottom-left-radius: 1rem;
    }
}
.summary .col-2{
    padding: 0;
}
.summary .col-10
{
    padding: 0;
}.row{
    margin: 0;
}
.title b{
    font-size: 1.5rem;
}

.close{
    margin-left: auto;
    font-size: 0.7rem;
}

.back-to-shop{
    margin-top: 4.5rem;
}

hr{
    margin-top: 1.25rem;
}
form{
    padding: 2vh 0;
}

.inputing{

    padding: 1vh;
    margin-bottom: 4vh;
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
}
input:focus::-webkit-input-placeholder
{
      color:transparent;
}


</style>