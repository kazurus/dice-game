import { NumRange } from './types';

export default {
  userNumber: {
    presence: { allowEmpty: false },
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: NumRange.MIN,
      lessThanOrEqualTo: NumRange.MAX,
      notLessThanOrEqualTo: '^Number must be less than or equal to %{count}',
      notGreaterThanOrEqualTo:
        '^Number must be greater than or equal to %{count}',
    },
  },
  bet: {
    presence: { allowEmpty: false },
    numericality: true,
    format: {
      pattern: /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      message: 'only allows 2 decimal places',
    },
  },
};
