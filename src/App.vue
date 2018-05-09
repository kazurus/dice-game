<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex xs4 offset-xs2>
              <BetForm />
            </v-flex>
            <v-flex xs4>
              <Balance />
              <Result />
              <Hash />
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
});
</script>