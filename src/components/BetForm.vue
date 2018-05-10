<template>
  <v-card>
    <v-card-title primary-title>
      <v-form>
        <v-text-field
          :value="bet || ''"
          label="Bet Amount"
          type="number"
          required
          @input="updateUserBet"
        />
        <v-text-field
          :value="userNumber || ''"
          label="Number"
          type="number"
          required
          @input="updateUserNumber"
        />
      </v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs6>
            <Bet
              :user-number="userNumber" 
              :is-game-ready="isGameReady"
              type="hi"
              @update:bet:data="updateBetData" />
          </v-flex>
          <v-flex xs6>
            <Bet
              :user-number="userNumber" 
              :is-game-ready="isGameReady"
              type="lo"
              @update:bet:data="updateBetData" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

import { BetType } from '@/types';

import Bet from './Bet.vue';

export default Vue.extend({
  name: 'BetForm',
  props: {
    userNumber: {
      type: Number,
      required: true,
    },
    bet: {
      type: Number,
      required: true,
    },
    isGameReady: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Bet,
  },
  methods: {
    updateUserBet(userBet: string) {
      this.$emit('update:bet', Number(userBet));
    },
    updateUserNumber(userNumber: string) {
      this.$emit('update:userNumber', Number(userNumber));
    },
    updateBetData(betData: object) {
      this.$emit('update:bet:data', betData);
    },
  },
});
</script>