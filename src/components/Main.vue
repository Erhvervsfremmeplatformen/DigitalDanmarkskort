<template>
<div class="w-percent-100 d-flex">
  <div v-if="tabValue === 0" class="grow">
    <Filters />
  </div>
  <div v-if="tabValue === 1" class="grow w-percent-100">
    <Map />
  </div>
  <div v-if="tabValue === 2" class="grow">
    <FacilitieList />
  </div>
</div>
</template>

<script lang="ts">

import Map from "@/components/Map.vue";
import FacilitieList from "./FacilityList.vue";
import Filters from "./Filters.vue";

export default {
  name: 'Main',
  components: {
    Map,
    FacilitieList,
    Filters
  },
  data: () => {
    return {
      tabValue: 1
    }
  }
};
</script>

<style scoped>

</style>
