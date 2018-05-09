<template>
  <v-card>
    <v-card-title primary-title>
      <v-form>
        <v-text-field
          v-model.number="bet"
          label="Bet Amount"
          type="number"
          required
        />
        <v-text-field
          v-model.number="number"
          label="Number"
          type="number"
          required
        />
      </v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs6>
            <Bet type="hi" />
          </v-flex>
          <v-flex xs6>
            <Bet type="lo" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Bet from './Bet.vue';

export default Vue.extend({
  name: 'BetForm',
  data: () => ({
    bet: null,
    number: null,
  }),
  components: {
    Bet
  },
});
</script>