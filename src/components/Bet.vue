<template>
  <div>
    <v-btn :disabled="!isGameReady" @click="makeBet">
      Bet {{ type }}
    </v-btn>
    <div v-if="isNumberValid" class="mt-2">
      <p>number {{ comparisonSymbol }} {{ userNumber }}</p>
      <p>chance: {{ chance }}%</p>
      <p>payout: {{ payout.toFixed(2) }}x</p>
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
      const { userNumber } = this;

      const high = (NumRange.MAX + 1 - userNumber) / NumRange.MAX;
      const low = (userNumber + 1 - NumRange.MIN) / NumRange.MAX;
      const chance = this.type === BetType.HI ? high : low;

      return this.mathRound(chance * 100, 2);
    },
    payout(): number {
      const contraChance = this.mathRound(100 - this.chance, 2);
      const ratio = contraChance / this.chance;

      return this.mathTrunc(ratio + 1, 2);
    },
    isNumberValid(): boolean {
      return this.userNumber >= 1 && this.userNumber <= 100;
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