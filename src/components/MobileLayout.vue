<template>
<div class="w-percent-100 d-flex">
  <div v-if="tabIndex === 0" class="grow">
    <Filters />
  </div>
  <div v-if="tabIndex === 1" class="grow w-percent-100">
    <Map />
  </div>
  <div v-if="tabIndex === 2" class="grow d-lg-none">
    <FacilityList />
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Map from './Map.vue';
import FacilityList from './FacilityList.vue';
import Filters from './Filters.vue';
import {mapGetters} from 'vuex';

export default Vue.extend({
  name: 'MobileLayout',
  inject: ['refreshKey'],
  components: {
    Map,
    FacilityList,
    Filters
  },
  computed: {
    // ...mapGetters({
    //   tabIndex: 'getMainTabIndex',
    // })
    tabIndex() {
      return this.refreshKey.value && this.$store.getters.getMainTabIndex;
    },
  },
});
</script>

<style scoped>
@import '../styles/components/_external.scss';
</style>
