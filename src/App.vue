<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <img src="./assets/logo.png">
          <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'app',
  components: {
    HelloWorld,
  },
});
</script>