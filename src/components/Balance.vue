<template>
  <div class="mb-2">
    <v-card>
      <v-card-title primary-title>
        <v-form>
          <v-text-field
            v-model.number="balance"
            label="Bet Amount"
            type="number"
            required
          />

          <v-btn>
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
  data: () => ({
    balance: 100,
  }),
});
</script>