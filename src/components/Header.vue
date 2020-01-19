<template>
  <b-navbar
    class="header"
    fixed-top
    type="is-dark">
    <template v-slot:brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="logo">
        Family Budget
      </b-navbar-item>
    </template>
    <template v-slot:end>
      <b-navbar-item tag="div" class="buttons">
        <b-button
          tag="router-link"
          :to="$route.name === 'transactions' ? '/transactions' : $route.path"
          icon-left="wallet"
          type="is-dark"
          size="large"
          class="button"
          :inverted="$route.name === 'transactions'"
        >
          Transactions
        </b-button>
        <b-button
          tag="router-link"
          :to="$route.name === 'tasks' ? '/tasks' : $route.path"
          icon-left="list-alt"
          type="is-dark"
          size="large"
          class="button"
          disabled
          :inverted="$route.name === 'tasks'"
        >
          Tasks
        </b-button>
        <b-button
          tag="router-link"
          :to="$route.name === 'statistics' ? '/statistics' : $route.name"
          icon-left="chart-area"
          type="is-dark"
          size="large"
          class="button"
          disabled
          :inverted="$route.name === 'statistics'"
        >
          Statistics
        </b-button>
      </b-navbar-item>
      <b-navbar-dropdown label="Settings">
        <b-navbar-item tag="router-link" :to="{ path: '/settings/user' }">
          Account info
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/settings/families' }">
          Families
        </b-navbar-item>
        <b-navbar-item>
          Logout
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script lang="ts">
export default {
  name: 'Header',
};
</script>

<style scoped lang="scss">
@import "@/theme/fonts";
@import "@/theme/variables";

.header {
  .logo {
    @include styled-text;
    font-size: 1.5rem;
    color: $primary;
  }

  .buttons {
    padding: 0;
    margin-bottom: 0;

    .button {
      height: 100%;
      margin-right: 0;
      margin-bottom: 0;
      border-radius: 0;
    }
  }
}
</style>
