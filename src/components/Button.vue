<template>
  <b-button v-bind="$props" v-bind="$attrs" />
</template>

<script lang="ts">
import Vue from 'vue';
import BuefyButton from 'buefy/src/components/button/Button.vue';

interface IOwnProps {
  disabled: boolean;
}

const Button = Vue.extend<{}, {}, {}, IOwnProps>({
  name: 'Button',
  extends: BuefyButton,
});

export default Button;
</script>
