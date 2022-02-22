<!-- The entry point for the sandkasse applikation. Direct and indirect imports of components and stylesheets in this class will be included in the final applikation -->
<template>
  <div class="applikation-container bg-alternative">

    <div class="d-flex">
      <div class="grow d-flex flex-column">
        <h1>Overblik: Danske Test-, Demonstrations og Udviklingsfaciliteter</h1>
        <div class="d-flex flex-column">
          <Header />
        </div>
        <div
            class="main-container">
              <MediaQueryProvider :queries="{ mobile: '(max-width: 992px)' }">
              <MatchMedia v-slot="{ mobile }">
                <MobileLayout v-if="mobile" />
                <DesktopLayout v-else />
              </MatchMedia>
              </MediaQueryProvider>
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
import MobileLayout from './MobileLayout.vue';
import Header from './Header.vue';
import { MediaQueryProvider, MatchMedia } from 'vue-component-media-queries'
import DesktopLayout from "@/components/DesktopLayout.vue";
import { mapActions } from "vuex";
import 'tippy.js/dist/tippy.css';
import store from "@/store";

export default {
  name: 'Applikation',
  components: {
    DesktopLayout,
    MobileLayout,
    Header,
    MediaQueryProvider,
    MatchMedia,
  },
  computed: {
    ...mapActions(['getFacilities']),
  },
  async mounted() {
    await this.getFacilities;
  },
  store: store
};
</script>
<style lang="scss" scoped>
@import '../styles/components/_applikation.scss';

.main-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  position: relative;
  overflow: auto;

  //height: 635px;
  min-height: 635px;
  max-height: 635px;

  @media (min-width: map-get($grid-breakpoints, lg)) {
    //height: 837px;
    min-height: 837px;
    max-height: 837px;
  }

}

</style>
