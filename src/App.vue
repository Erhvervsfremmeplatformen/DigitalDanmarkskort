<template>
  <div>
    <div id="app" class="app-body" tabindex="-1">
      <div class="flexgrow container pt-8 pb-8">
        <Applikation />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Applikation from './components/Applikation.vue';
import * as DKFDS from 'dkfds';
import axios from 'axios';

/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = `${process.env.VUE_APP_API_BASE_URI}/${process.env.VUE_APP_API_VERSION}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.VUE_APP_API_BASE_URI;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

export default {
  name: 'App',
  components: {
    Applikation
  },
  mounted() {
    DKFDS.init();
  }
};
</script>
<style lang="scss">
@import 'styles/_app.scss';
</style>
