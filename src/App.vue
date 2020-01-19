<template>
  <div id="app">
    <fb-header></fb-header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import Header from './components/Header.vue';

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#app',
});

export default {
  components: {
    'fb-header': Header,
  },
};
</script>

<style lang="scss">
@import "./theme/fonts";
@import "./theme/variables";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-light;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $text-light;

    &.router-link-exact-active {
      color: $link;
    }
  }
}
</style>
