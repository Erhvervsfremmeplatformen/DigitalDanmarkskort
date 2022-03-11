<template>
  <div class="row h-full w-percent-100">
    <div class="col-7">
      <Map />
    </div>
    <div class="col">
      <FacilityList />
    </div>
  </div>
</template>

<script>
import Map from './Map';
import FacilityList from './FacilityList';
export default {
  name: 'DesktopLayout',
  components: { FacilityList, Map }
};
</script>

<style scoped lang="scss">
@import '../styles/components/_external.scss';
</style>
