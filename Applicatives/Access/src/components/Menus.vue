<template>
  <div class="product--card">
<router-link to='/menupage' exact>
      <img class="menu--image" src="../../menu400300.jpg" alt="image menu"/>
      <div class="product--informations">
         <div class="topp">
            <div class="text">
                <div class="productname">Menu Tripple Cheese</div>

            </div>
            <div class="price">8,99€</div>
         </div>
      </div>
</router-link>
  </div>

</template>

<script>
export default {

}
</script>

<style>
.menu--image {

    width: 100%;
    height: 100%;


}

.product--card {
    width: 20%;
    height: 30%;
    padding: 0% 0% 2% 0%;
}

.product--card:hover {
    -webkit-box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
    box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
    -webkit-transition: .3s;
    transition: .3s;
}

.topp {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.productname {
    margin: 0% 0% 0% 10%;
    font-size: 19px;
    font-weight: 600;
    color: #445863;
}

.price {
    margin: 0% 10% 0% 0%;
    font-size: 19px;
    font-weight: 700;
    color: #445863;
}

@media (max-width: 740px){
.product--card {
    width: 30%;
    height: 40%;
    padding: 0% 0% 2% 0%;
}
.topp {
    display: unset;
    justify-content: space-between;
    align-items: center;
}
.productname {
font-size: 10px;
font-weight: 500;
text-align: center;
margin: 0%;
}

.price {
font-size: 14px;
text-align: center;
margin: 0%;
}


}

@media (max-width: 1400px) and (min-width: 740px){
.product--card {
    width: 20%;
    height: 30%;
    padding: 0% 0% 2% 0%;
}
.topp {
    display: unset;
    justify-content: space-between;
    align-items: center;
}
.productname {
font-size: 18px;
font-weight: 500;
text-align: center;
margin: 0%;
}

.price {
font-size: 18px;
text-align: center;
margin: 0%;
}




}

</style>