<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/registration">Registration</router-link> |
      <router-link to="/transactions">System</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
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
