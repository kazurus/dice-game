<template>
  <v-card>
    <v-card-title primary-title>
      <v-form>
        <v-text-field
          :value="bet || ''"
          label="Bet Amount"
          type="number"
          required
          :error="!!errors.bet"
          :error-messages="errors.bet"
          @input="updateUserBet"
          @blur="validateField({ bet: String(bet || '') })"
        />
        <v-text-field
          :value="userNumber || ''"
          label="Number"
          type="number"
          required
          :error="!!errors.userNumber"
          :error-messages="errors.userNumber"
          @input="updateUserNumber"
          @blur="validateField({ userNumber: String(userNumber || '') })"
        />
      </v-form>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs6>
            <Bet
              :user-number="userNumber" 
              :is-game-ready="isFormValid && isGameReady"
              type="hi"
              @update:bet:data="updateBetData" />
          </v-flex>
          <v-flex xs6>
            <Bet
              :user-number="userNumber" 
              :is-game-ready="isFormValid && isGameReady"
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
import mixinDeep from 'mixin-deep';
import validate from 'validate.js';
import constraints from '@/validation';

import { BetType } from '@/types';

import Bet from './Bet.vue';

export default Vue.extend({
  name: 'BetForm',
  props: {
    userNumber: {
      type: Number,
      required: true,
    },
    balance: {
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
  data: () => ({
    errors: {},
  }),
  watch: {
    balance(val: number) {
      this.validateField({ bet: String(this.bet) });
    },
  },
  computed: {
    isFormValid(): boolean {
      return !Object.keys(this.errors).length;
    },
  },
  methods: {
    updateUserBet(userBet: string) {
      this.validateField({ bet: userBet });
      this.$emit('update:bet', Number(userBet));
    },
    updateUserNumber(userNumber: string) {
      this.validateField({ userNumber });
      this.$emit('update:userNumber', Number(userNumber));
    },
    updateBetData(betData: { type: BetType; payout: number }) {
      this.$emit('update:bet:data', betData);
    },
    validateField(data: { [key: string]: any }) {
      const extraConstraints = {
        bet: {
          numericality: {
            lessThanOrEqualTo: this.balance,
            notLessThanOrEqualTo: 'must be less than or equal to Balance',
          },
        },
      };

      Object.keys(data).forEach(key => {
        const finalConstraints = mixinDeep({}, constraints, extraConstraints);

        const result = validate(data, finalConstraints);

        if (result && result[key]) {
          this.$set(this.errors, key, result[key]);
        } else {
          this.$delete(this.errors, key);
        }
      });
    },
  },
});
</script>