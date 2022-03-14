<template>
  <div class="d-flex h-full w-percent-100">
    <div class="flex-7 padding-right-16">
      <Map />
    </div>
    <div class="flex-5 padding-left-16">
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

.flex-7{
  flex:7;
}
.flex-5{
  flex:5;
}

.padding-right-16{
  padding-right:16px;
}

.padding-left-16{
  padding-left:16px;
}
</style>
