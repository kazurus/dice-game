<template>
  <div class="mb-2">
    <v-card>
      <v-card-title primary-title>
        <div>
          <div>Result:</div>
          <h3 class="headline">{{ result }}</h3>
        </div>
      </v-card-title>
    </v-card>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Result',
  data: () => ({
    result: 'Try to guess'
  }),
});
</script>