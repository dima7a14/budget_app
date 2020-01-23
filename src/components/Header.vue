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
          to="/transactions"
          icon-left="wallet"
          type="is-dark"
          size="large"
          class="button"
          :inverted="$route.name === 'transactions'"
        >
          Transactions
        </b-button>
        <fb-button
          tag="router-link"
          to="tasks"
          icon-left="list-alt"
          type="is-dark"
          size="large"
          class="button"
          disabled
          :inverted="$route.name === 'tasks'"
        >
          Tasks
        </fb-button>
        <fb-button
          tag="router-link"
          to="statistics"
          icon-left="chart-area"
          type="is-dark"
          size="large"
          class="button"
          disabled
          :inverted="$route.name === 'statistics'"
        >
          Statistics
        </fb-button>
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
import Button from './Button.vue';

export default {
  name: 'Header',
  components: {
    'fb-button': Button,
  },
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
