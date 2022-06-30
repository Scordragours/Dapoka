<template>
  <topbar/>
  <div id="app">
    <router-view></router-view>
  </div>
  <FooterPage/>
</template>

<script>


import FooterPage from './components/FooterPage.vue'
import topbar from './components/topbar.vue'

export default {
  name: 'App',
  components: {
    topbar,
    FooterPage,
  }
}
</script>


<style>
@import url('./style/reset.css');
@import url('https://fonts.googleapis.com/css?family=Poppins:medium,bold,semibold');

.topbar {
  margin: 0;
  padding: 0;
}
</style>
