<template>
  <div class="command--page">
    <div class="wrapper bg-white mt-sm-5">
    <h4 class="pb-4 border-bottom">Commandes reçues</h4>
    
        <div class="py-2">
            <commandevalid/>
            <commandevalid/>
            <commandevalid/>
            <commandevalid/>            
        </div>
    <br/>
    <h4 class="pb-4 border-bottom">Commandes passées</h4>
    
        <div class="py-2">
            <pastcommand/>
            <pastcommand/>
            <pastcommand/>
            <pastcommand/>
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
import commandevalid from '../components/commandevalid.vue'

export default {
    name: 'commandrecu',
    components: {
        pastcommand,
        commandevalid,

    }
}
</script>

<style>

</style>