<template>
  <div class="row">
    <div class="col-7">
      <Map />
    </div>
    <div class="col-5">
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
