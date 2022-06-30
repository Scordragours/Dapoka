<template>
  <div class="restaurant--row">
      <div class="tittle">
          Découvrez les fastfood du moments :
      </div>
      <br/>
      <div class="wrap--card">
          <restaurant-card v-for="(card, index) in 5" :key="index"/>
      </div>
  </div>
</template>

<script>
import RestaurantCard from './RestaurantCard.vue'

export default {
  name: 'RestaurantRow',
  components: {
    RestaurantCard
  }
}
</script>

<style lang="scss">

.restaurant--row {


    .tittle{
        color: #965353;
        font-size: 25px;
        font-weight: 700;

    }

    .wrap--card {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

}

</style>