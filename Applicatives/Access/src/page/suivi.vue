<template>
<div class="container px-1 px-md-4 py-5 mx-auto">
    <br/>
    <h4 class="col-lg-8 mx-auto text-center">Suivi de commande</h4>
    <div class="cardd">    
        <div class="topsuivi">
                <h5>Commande 00012</h5>
            <div class="d-flex flex-column text-sm-right">
                <p class="mb-0">Arrivée prévue : 19:45</p>
            </div><br/>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        <br/>
        </div>
        <div class="row d-flex justify-content-between px-3 topsuivi">
            <div class="d-flex">
                <h6><span class="text-primary font-weight-bold">2022-05-27 19:20:34
                    </span>-- Commande validée</h6>
            </div>
        </div>
        <div class="row d-flex justify-content-between px-3 topsuivi">
            <div class="d-flex">
                <h6><span class="text-primary font-weight-bold">2022-05-27 19:21:13
                    </span>-- Commande en préparation</h6>
            </div>
        </div>
        <div class="row d-flex justify-content-between px-3 topsuivi">
            <div class="d-flex">
                <h6><span class="text-primary font-weight-bold">2022-05-27 19:33:44
                    </span>--Commande en cours de livraison</h6>
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


.cardd {

    background-color: #deeef7;
    padding-bottom: 20px;
    margin-top: 90px;
    margin-bottom: 90px;
    border-radius: 10px;
}

.cardd2 {
    background-color: #deeef7;
    padding-bottom: 30px;
    margin: 50px;
    border-radius: 10px;
}

.topsuivi {
    padding-top: 30px;
    padding-left: 15% !important;
    padding-right: 15% !important;
}


</style>