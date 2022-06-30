<template>
  <div class="container py-5">
    <!-- For demo purpose -->
    <div class="row mb-4">
        <div class="col-lg-8 mx-auto text-center">
            <h4>Procédez au paiement</h4>
        </div>
    </div> <!-- End -->
    <div class="row">
        <div class="col-lg-6 mx-auto">
            <div class="card ">
                <div class="card-header">
                        <div id="credit-card" class="tab- show active pt-3">
                            <form role="form" onsubmit="event.preventDefault()">
                                <div class="form-group"> <label for="username">
                                        <h6>Nom du propriétaire</h6>
                                    </label> <input type="text" name="username" placeholder="Nom Prénom" required class="form-control "> </div>
                                <div class="form-group"> <label for="cardNumber">
                                    <br/>
                                        <h6>Numéros de carte</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" name="0000 0000 0000 0000" placeholder="Valid card number" class="form-control " required>

                                    </div>
                                </div>
                                <br/>
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group"> <label><span class="hidden-xs">
                                                    <h6>Date d'expiration</h6>
                                                </span></label>
                                            <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required> <input type="number" placeholder="AA" name="" class="form-control" required> </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div class="col-sm-4">
                                        <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                                <h6>Cryptograme <i class="fa fa-question-circle d-inline"></i></h6>
                                            </label> <input type="text" required class="form-control"> </div>
                                    </div>
                                    <br/>
                                </div>
                                <div class="basicc"> <button class="btn primary"><router-link to="/suivi" exact><div class="white">Confirmer le paiement</div></router-link></button></div>
                            </form>
                        </div></div>

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
.white {
    color: #fff;
}

.card-header {
    background-color: #deeef7;
    padding: 25px;
}
</style>