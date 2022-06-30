<template>
  <div class="command--page">
    <div class="wrapper bg-white mt-sm-5">
    <h4 class="pb-4 border-bottom">Articles en boutique</h4>
    
        <div class="py-2">
            <deleteproduct/>
            <deleteproduct/>
            <deleteproduct/>
            <deleteproduct/>
            <deleteproduct/>              
        </div>
    </div>
</div>  
</template>

<script>
import deleteproduct from '../components/deleteproduct.vue'

export default {
    name: 'deletearticle',
    components: {
        deleteproduct,
    }

}
</script>

<style>

</style>