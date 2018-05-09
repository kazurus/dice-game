<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div>Provably Fair Hash:</div>
        <h3 class="headline">{{ hash }}</h3>
      </div>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Hash',
  data: () => ({
    hash: 'thiswillbehash'
  }),
});
</script>