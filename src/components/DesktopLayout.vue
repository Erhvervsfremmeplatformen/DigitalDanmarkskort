<template>
  <div class="d-flex h-full w-percent-100">
    <div class="d-flex flex-1 h-full">
      <Map />
    </div>
    <div class="flex-1 position-relative overflow-auto">
      <FacilityList />
    </div>
  </div>
</template>

<script>
import Map from "@/components/Map";
import FacilityList from "@/components/FacilityList";
export default {
  name: "DesktopLayout",
  components: {FacilityList, Map}
}
</script>

<style scoped>
@import '../styles/components/_external.scss';

</style>
