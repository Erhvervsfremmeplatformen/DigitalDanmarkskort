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
