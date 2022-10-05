<!-- The entry point for the sandkasse applikation. Direct and indirect imports of components and stylesheets in this class will be included in the final applikation -->
<template>
  <div class="applikation-container bg-alternative">
    <div class="grow d-flex flex-column">
      <Header />
      <div class="main-container">
        <div v-if="!isMobile()">
          <DesktopLayout />
        </div>
        <div v-else>
          <MobileLayout />
        </div>
      </div>
      <div class="d-flex flex-column footer" style="align-items: start">
        <h4>Har du tilføjelser eller rettelser?</h4>
        <p>
          Se vejledning og kontaktinformation på
          <a target="_blank" class="icon-link" href="https://www.atv.dk/testfaciliteter"
            >ATV’s hjemmeside <svg class="icon-svg" focusable="false" aria-hidden="true"><use xlink:href="#open-in-new"></use></svg
          ></a>
        </p>
        <h4>Hvad er en facilitet?</h4>
        <p>
          Faciliteterne på kortet er fysiske eller virtuelle miljøer, hvor brugere fra fx virksomheder, universiteter og offentlige aktører kan udføre
          eller få udført test, demonstration og/eller udvikling af nye produkter, services, processer eller organisatoriske løsninger. Faciliteterne
          har en etableret forretningsmodel og/eller service tilknyttet og kan tilgås efter aftale.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MobileLayout from './MobileLayout.vue';
import Header from './Header.vue';
// TODO: AJP - fjern ts-ignore ...
// @ts-ignore
import DesktopLayout from './DesktopLayout.vue';
import { mapActions } from 'vuex';

import store from '../store';

export default {
  name: 'Applikation',
  components: {
    DesktopLayout,
    MobileLayout,
    Header
  },
  computed: {
    ...mapActions(['getFacilities'])
  },
  async mounted() {
    this.$store.subscribe((mutation: any, state: any) => {
      this.refreshKey++;
    });
    await this.getFacilities;
  },
  data() {
    return {
      refreshKey: 1
    };
  },
  methods: {
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    }
  },
  provide() {
    // Make it available for sub components as "prop"
    const refreshKey = {};
    Object.defineProperty(refreshKey, 'value', {
      enumerable: true,
      get: () => this.refreshKey
    });
    return {
      refreshKey
    };
  },
  store: store
};
</script>
<style lang="scss" scoped>
@import '../styles/components/external.scss';
@import '../styles/components/_applikation.scss';

.main-container {
  //height: 635px;
  min-height: 635px;
  padding-right: 1px;
  //max-height: 635px;

  @media (min-width: map-get($grid-breakpoints, lg)) {
    //height: 837px;
    min-height: 837px;
    //max-height: 837px;
  }
}

a:visited > .icon-link {
  color: rgb(128, 0, 128);
}

.footer {
  & h4 {
    margin-top: 24px;
    margin-bottom: 16px;
  }

  & p {
    margin: 0 !important;
  }
}
</style>
