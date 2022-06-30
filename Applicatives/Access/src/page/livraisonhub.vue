<template>
  <div class="command--page">
    <br/>
    <div class="wrapper bg-white mt-sm-">
    <h4 class="pb-5 border-bottom">Courses disponibles</h4>
    
        <div class="py-2">
            <livraisonvalid/>
            <livraisonvalid/>
            <livraisonvalid/>
            <livraisonvalid/>            
        </div> 
    </div>
</div>
</template>

<script>
import livraisonvalid from '../components/livraisonvalid.vue'

export default {
    name: 'livraisonhub',
    components: {
        livraisonvalid,

    }

}
</script>

<style>

</style>