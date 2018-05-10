<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex xs4 offset-xs2>
              <BetForm
                :user-number.sync="userNumber"
                :bet.sync="userBet"
                :is-game-ready="isGameReady"
                @update:bet:data="handleBet" />
            </v-flex>
            <v-flex xs4>
              <Balance :balance.sync="balance" />
              <Result :result="result" />
              <Hash :hash="hash" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { BetResult, BetType, NumRange } from './types';

import { MathUtil } from './mixins';
import Balance from './components/Balance.vue';
import BetForm from './components/BetForm.vue';
import Hash from './components/Hash.vue';
import Result from './components/Result.vue';

export default Vue.extend({
  name: 'app',
  components: {
    Balance,
    BetForm,
    Hash,
    Result,
  },
  data: () => ({
    balance: 0,
    secretNumber: 0,
    userNumber: 0,
    userBet: 0,
    result: 0,
  }),
  computed: {
    isGameReady(): boolean {
      const { balance, userBet, userNumber } = this;
      return (
        userBet > 0 &&
        userBet <= balance &&
        userNumber >= NumRange.MIN &&
        userNumber <= NumRange.MAX
      );
    },
    hash(): string {
      return this.mathGenHash(this.secretNumber.toString());
    },
  },
  methods: {
    ...MathUtil.methods,
    handleBet(betData: { betType: BetType; payout: number }) {
      const { betType, payout } = betData;
      const { balance, userNumber, secretNumber, userBet } = this;

      const isWin = this.isWin(betType, userNumber, secretNumber);
      const payoutRate = payout - 1;
      const credit = isWin ? userBet * payoutRate : -userBet;
      const roundCredit = this.mathRound(credit, 2);
      const newBalance = this.mathRound(balance + roundCredit, 2);

      this.result = roundCredit;
      this.balance = newBalance;
      this.secretNumber = this.randomNum();
    },
    isWin(type: BetType, userNum: number, secretNum: number): boolean {
      switch (type) {
        case BetType.HI:
          return secretNum >= userNum;

        case BetType.LO:
          return secretNum <= userNum;

        default:
          throw new Error('[App:isWin] Unexpected value');
      }
    },
    randomNum() {
      const { MIN, MAX } = NumRange;
      return this.mathRandom(MIN, MAX);
    },
  },
  created() {
    this.secretNumber = this.randomNum();
  },
});
</script>