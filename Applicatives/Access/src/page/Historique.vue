<template>
<div class="historique--page">
    <div class="wrapper bg-white mt-sm-5">
    <h4 class="pb-4 border-bottom">Historique de commande</h4>
    
        <div class="py-2">
            <pastcommand/>
            <pastcommand/>
            <pastcommand/>
            <pastcommand/>            
        </div>
    </div>
</div>
</template>

<script>
import pastcommand from '../components/pastcommand.vue'

export default {
    name: 'historique',
    components: {
        pastcommand,

    }

}
</script>

<style>

</style>