<template>
  <div class="mb-2">
    <v-card>
      <v-card-title primary-title>
        <div>
          <div>Result:</div>
          <h3 class="headline">{{ resultMessage }}</h3>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { BetResult } from '@/types';

export default Vue.extend({
  name: 'Result',
  props: {
    result: {
      type: Number,
      required: true,
    },
  },
  computed: {
    resultMessage(): string {
      const { result } = this;

      switch (true) {
        case result > 0:
          return `${result.toFixed(2)} WIN`;

        case result < 0:
          return `${(-result).toFixed(2)} LOSS`;

        default:
          return 'Try to guess';
      }
    },
  },
});
</script>