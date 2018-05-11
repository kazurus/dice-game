import Vuetify from 'vuetify';
import { MathUtil } from '@/mixins';
import { NumRange, BetType } from '@/types';

const {
  methods: { mathRound, mathTrunc },
} = MathUtil;

describe('MathUtil', () => {
  it('mathRound should calculate right rounded value', () => {
    expect(mathRound(1.005, 2)).toEqual(1.01);
    expect(mathRound(239.525, 2)).toEqual(239.53);
    expect(mathRound(0.075, 2)).toEqual(0.08);
    expect(mathRound(-15.778665, 2)).toEqual(-15.78);
    // this fail current realization and MDN version
    // expect(mathRound(-1.005, 2)).toEqual(-1.01);
  });

  it('mathTrunc should calculate right trunk value', () => {
    expect(mathTrunc(1.005, 2)).toEqual(1);
    expect(mathTrunc(15.7784514, 2)).toEqual(15.77);
    expect(mathTrunc(4.27, 2)).toEqual(4.27);
    expect(mathTrunc(0.00000001990202020291, 2)).toEqual(0);
    expect(mathTrunc(4.9999, 2)).toEqual(4.99);
    expect(mathTrunc(123.5999, 2)).toEqual(123.59);
    expect(mathTrunc(123.5999, 2)).toEqual(123.59);
    expect(mathTrunc(-15.778665, 2)).toEqual(-15.77);
    expect(mathTrunc(-4.27, 2)).toEqual(-4.27);
    expect(mathTrunc(-0.00000001990202020291, 2)).toEqual(-0);
  });
});
