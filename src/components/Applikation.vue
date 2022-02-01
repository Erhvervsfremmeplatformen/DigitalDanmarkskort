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
        <div class="d-flex flex-column">
          <h4>Har du tilføjelser eller rettelser</h4>
          <p>(Kontaktoplysninger)</p>
          <h4>Hvad er en facilitet</h4>
          <p>
            En facilitet er et fysisk eller virtuelt miljø, hvor brugere fra fx virksomheder, universiteter
            og offentlige aktører kan udføre eller få udført test, demonstration og/eller udvikling af nye produkter,
            services, processer eller organisatoriske løsninger. Herunder skal faciliteten have etableret
            forretningsmodel og/eller service tilknyttet samt kunne tilgås efter aftale
          </p>
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

  //height: 635px;
  min-height: 635px;
  max-height: 635px;

  @media (min-width: map-get($grid-breakpoints, md)) {
    //height: 837px;
    min-height: 837px;
    max-height: 837px;
  }

}

</style>
