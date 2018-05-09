<template>
  <div>
    <v-btn>
      Bet {{ type }}
    </v-btn>
    <p>number:</p>
    <p>chance:</p>
    <p>payout:</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Bet',
  data: () => ({
    number: null,
  }),
  props: {
    type: {
      type: String,
      default: 'hi',
      validator(value: string): boolean {
        return ['hi', 'lo'].indexOf(value) !== -1
      }
    }
  }
});
</script>