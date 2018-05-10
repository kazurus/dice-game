<template>
  <div class="mb-2">
    <v-card>
      <v-card-title primary-title>
        <v-form>
          <v-text-field
            :value="balance.toFixed(2)"
            label="Balance"
            type="number"
            readonly
          />

          <v-btn
            :disabled="isBalancePositive"
            @click="addCredit">
            Free Credits
          </v-btn>
        </v-form>
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Balance',
  props: {
    balance: {
      type: Number,
      default: 100,
      validator(value: number): boolean {
        return !isNaN(value);
      },
    },
  },
  computed: {
    isBalancePositive(): boolean {
      return this.balance > 0;
    },
  },
  methods: {
    addCredit() {
      this.$emit('update:balance', 100);
    },
  },
});
</script>