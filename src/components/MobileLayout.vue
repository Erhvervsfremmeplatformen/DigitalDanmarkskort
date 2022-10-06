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
import Map from './Map.vue';
import FacilityList from './FacilityList.vue';
import Filters from './Filters.vue';
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import { store } from '../store';

export default defineComponent({
  name: 'MobileLayout',
  components: {
    Map,
    FacilityList,
    Filters
  },
  computed: {
    ...mapGetters({
      tabIndex: 'getMainTabIndex'
    })
  },
  beforeCreate() {
    this.$store = store;
  }
  // mounted() {
  //   console.log(`index: ${this.tabIndex}`);
  // }
});
</script>

<style scoped lang="scss">
@import '../styles/components/_external.scss';
</style>
