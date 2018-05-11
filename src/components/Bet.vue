<template>
  <div>
    <v-btn :disabled="!isGameReady" @click="makeBet">
      Bet {{ type }}
    </v-btn>
    <div v-if="isNumberValid" class="mt-2">
      <p>number {{ comparisonSymbol }} {{ userNumber }}</p>
      <p class="chance">chance: {{ chance }}%</p>
      <p class="payout">payout: {{ payout.toFixed(2) }}x</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { BetType, NumRange } from '@/types';

import { MathUtil } from '@/mixins';

export default Vue.extend({
  name: 'Bet',
  props: {
    type: {
      type: String,
      default: BetType.HI,
      validator(value: BetType): boolean {
        return Object.values(BetType).includes(value);
      },
    },
    userNumber: {
      type: Number,
      required: true,
    },
    isGameReady: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    comparisonSymbol(): string {
      return this.type === BetType.HI ? '>=' : '<=';
    },
    chance(): number {
      const { userNumber, type, mathRound } = this;
      const { MIN, MAX } = NumRange;

      const high = (MAX + 1 - userNumber) / MAX;
      const low = (userNumber + 1 - MIN) / MAX;
      const chance = type === BetType.HI ? high : low;

      return mathRound(chance * 100, 2);
    },
    payout(): number {
      const { chance, mathRound, mathTrunc } = this;
      const contraChance = mathRound(100 - chance, 2);
      const ratio = contraChance / chance;

      return mathTrunc(ratio + 1, 2);
    },
    isNumberValid(): boolean {
      const { userNumber } = this;
      const { MIN, MAX } = NumRange;
      
      return userNumber >= MIN && userNumber <= MAX;
    },
  },
  methods: {
    ...MathUtil.methods,
    makeBet() {
      const { type: betType, payout } = this;
      this.$emit('update:bet:data', { betType, payout });
    },
  },
});
</script>