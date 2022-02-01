<template>
<div class="w-percent-100 d-flex">
  <div v-if="getTabIndex === 0" class="grow">
    <Filters />
  </div>
  <div v-if="getTabIndex === 1" class="grow w-percent-100">
    <Map />
  </div>
  <div v-if="getTabIndex === 2" class="grow">
    <FacilityList />
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Map from "@/components/Map.vue";
import FacilityList from "./FacilityList.vue";
import Filters from "./Filters.vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: 'Main',
  components: {
    Map,
    FacilityList,
    Filters
  },
  // data: () => {
  //   return {
  //     tabValue: 1
  //   }
  // }
  computed: {
    ...mapGetters({
      tabIndex: "getMainTabIndex"
    }),
    getTabIndex(): number {
      return this.tabIndex();
    }
  }
});
</script>

<style scoped>

</style>
