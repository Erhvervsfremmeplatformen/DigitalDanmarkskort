<!-- The entry point for the sandkasse applikation. Direct and indirect imports of components and stylesheets in this class will be included in the final applikation -->
<template>
  <div class="applikation-container" style="background-color: gold;">
    <div class="d-flex" style="background-color: red;">
      <div class="grow d-flex flex-column" style="background-color: yellow;">
        <h1>Overblik: Danske Test-, Demonstrations og Udviklingsfaciliteter</h1>
        <div class="d-flex flex-column" style="background-color: royalblue;">
          <Header />
        </div>
        <div
            class="main-container">
          <div class="d-flex flex-1 h-full" style="background-color: blueviolet;">
            <Main />
          </div>
          <div class="d-md-flex flex-1 d-none position-relative overflow-auto">
            <FacilityList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Main from './Main.vue';
import Header from './Header.vue';
import FacilityList from './FacilityList.vue';

export default {
  name: 'Applikation',
  components: {
    Main,
    Header,
    FacilityList
  },
};
</script>
<style lang="scss" scoped>
@import '../styles/components/_applikation.scss';

.main-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  position: relative;


  //height: 837px;
  min-height: 837px;
  max-height: 837px;
}

</style>
