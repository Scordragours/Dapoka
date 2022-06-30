<template>
<div class="pastcommand">
<router-link to="/suivi" exact>
    <div class="py-2 border-bottom">
                <div class="card-body py-3">
                  <div class="row no-gutters align-items-center">


                        <div class="row no-gutters align-items-center col-11">
                           
                           <div class="media col-3 align-items-center">
                              <img class="img--command" src="https://media.istockphoto.com/photos/hamburger-with-cheese-and-french-fries-picture-id1188412964?k=20&m=1188412964&s=612x612&w=0&h=Ow-uMeygg90_1sxoCz-vh60SQDssmjP06uGXcZ2MzPY=">

                           </div>

                        
                            <div class="col-7">
                                <div class="nameresto">Burger Queen</div>
                                <div class="text-muted small mt-1">Menu XL (Triple Cheese - Frites - IceTea) &nbsp;&middot;&nbsp; 15 nuggets</div>
                                <div class="datecommand"><br/>20 octobre 2021 - 19:47</div>
                            </div>
                            <div class="col-1">
                                <div class="price">16,99€</div>
                            </div>
                        </div>
                     
                     



                  </div>
               </div>                               
    </div>
</router-link>
</div>
  
</template>

<script>
export default {
    name: 'pastcommand',

}
</script>

<style>
.img--command {
    width: 100%;
    height: 100%;
}

.nameresto{
    font-weight: 600;
}

.price{
    font-weight: 800;
    font-size: 18px;
}

.datecommand{
    font-size: 12px;
}


@media (max-width: 740px){
.nameresto{
    font-weight: 600;
    font-size: 11px;
}

.price{
    font-weight: 800;
    font-size: 11px;
}

.datecommand{
    font-size: 8px;
}


}

@media (max-width: 1400px) and (min-width: 740px){
.nameresto{
    font-weight: 600;
    font-size: 13px;
}

.price{
    font-weight: 800;
    font-size: 13px;
}

.datecommand{
    font-size: 10px;
}

}


</style>