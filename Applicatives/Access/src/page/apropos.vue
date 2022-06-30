<template>
    <div class="apropos--page">
        <div class="wrapper bg-white mt-sm-5">
            
            <h4 class="pb-4 border-bottom">Dapoka, c'est quoi ?</h4>
            <div class="py-2">
            <div class="row py-2">

            <div class="col-md-6">
                
            Praesent eget nibh sit amet purus ultrices volutpat. Vestibulum consequat neque elit, at dapibus augue pharetra quis. Cras quis consectetur odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sed porta erat. Quisque at sem eu velit semper rhoncus vitae et orci. Vivamus gravida, lectus in tempor dignissim, ex velit luctus est, sit amet hendrerit justo felis sed eros. Curabitur elementum, orci egestas egestas posuere, tellus erat vestibulum orci, id interdum libero lacus vel tellus.

            </div>
            <br/>
            <div class="col-md-6 pt-md-0 pt-3">
                <img class="aproposimg" src="../../mockup.jpg" alt="apropos"/>
            </div>
            <br/>
        </div>
        
        <div class="row py-2">
            Suspendisse pretium molestie elit vitae accumsan. Aliquam id sapien euismod, eleifend felis sed, laoreet tellus. Ut justo diam, maximus ullamcorper ullamcorper tristique, porta tincidunt neque. Proin id lacus tempor, congue neque blandit, gravida diam. Pellentesque iaculis sed lacus ut venenatis. Phasellus bibendum pharetra lectus non tincidunt. Nulla eros turpis, varius quis nulla eget, ultricies fermentum ex. Ut ut urna id augue interdum varius. Cras cursus vel erat eget mattis. Cras non nulla et massa tincidunt finibus.

        </div>
            
            
                
        </div>

    </div>
 </div>
</template>



<script>
export default {
    name: 'apropos',
}
</script>

<style>

.apropos--page {
    margin: 80px;
}

.aproposimg {
    height: 250px;
    border-radius: 10px;
}

@media (max-width: 1000px) and (min-width: 800px){
    .aproposimg {
    height: 200px;
    border-radius: 10px;
}

}

@media (max-width: 800px) and (min-width: 750px){
    .aproposimg {
    height: 150px;
    border-radius: 10px;
}

}

@media (max-width: 750px) and (min-width: 600px){
    .aproposimg {
    height: 250px;
    border-radius: 10px;
}

}

@media (max-width: 600px) and (min-width: 400px){
    .aproposimg {
    height: 200px;
    border-radius: 10px;
}

}

@media (max-width: 400px) {
    .aproposimg {
    height: 100px;
    border-radius: 10px;
}

}

</style>