import crypto from 'hash.js';

// This method allows only one mixin for the component in TS.
// There is a solution for vue-class-component.
//
// Usage: MixinName.extend({ ... });
//
// import Vue form 'vue';
//
// export const MathUtil = Vue.extend({
//   methods: {
//     ...
//   },
// });

export const MathUtil = {
  methods: {
    mathGenHash(val: string) {
      return crypto
        .sha256()
        .update(val)
        .digest('hex')
        .toString()
        .slice(0, 18);
    },
    mathRandom(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    mathRound(num: number, decimals: number) {
      return Number(Math.round(Number(num + `e${decimals}`)) + `e-${decimals}`);
    },
    mathTrunc(num: number, decimals: number) {
      return Number(num.toFixed(decimals + 4).slice(0, -4));
    },
  },
};
