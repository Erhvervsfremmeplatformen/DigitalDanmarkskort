<template>
  <div class="row">
    <div class="col-12">
      <div class="card border-0 shadow-0">
        <div class="card-text bg-alternative">
          <div class="d-flex align-items-center mb-2">
            <span class="bg-blue rounded-full badge mr-4" style="padding: 12px"></span> Virtuel facilitet
          </div>
          <div class="d-flex align-items-center"><span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span> Fysisk facilitet</div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div v-if="loading === 'pending'">
        <div class="spinner"></div>
        <div class="spinner-status" role="status">Arbejder</div>
      </div>
      <div class="h-full d-flex align-items-center justify-content-center" v-if="facilities.length === 0 && loading === 'idle' && !error">
        <b>Ingen faciliteter fundet</b>
      </div>
      <div class="h-full d-flex align-items-center justify-content-center" v-if="error">
        <b>{{ error }}</b>
      </div>
      <div v-for="facility in facilities" :key="facility.uId" class="card flex-none mb-5 customCard">
        <Facility v-bind:facility="facility" />
        <div class="card-footer card-action pb-5 pt-0">
          <div class="action-links">
            <button @click="showFacilityDialog(facility)" class="button button-primary">Læs mere</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Facility from './Facility.vue';
import { Facility as FacilityType } from '../store/types';
import { mapActions, mapGetters } from 'vuex';
import { FiltersMutations } from '../store/modules/filters';

export default {
  name: 'FacilityList',
  components: { Facility },
  inject: ['refreshKey'],
  computed: {
    ...mapGetters({
      currentFacility: 'getCurrentFacility',
      filteredFacilities: 'getFilteredFacilities',
      showFilter: 'getShowFilter'
    }),
    /*
    ...mapGetters({
      error: 'getError', a
      loading: 'getLoading'
    }),
    */
    // Use the injected refreshKey to make the store getter reeactive
    facilities() {
      return this.refreshKey.value && this.$store.getters.getFilteredFacilities;
    },
    error() {
      return this.refreshKey.value && this.$store.getters.getError;
    },
    loading() {
      return this.refreshKey.value && this.$store.getters.getLoading;
    }
  },
  methods: {
    ...mapActions(['setCurrentFacility', 'setMainTabIndex']),
    showFacilityDialog(facility: FacilityType) {
      window.scrollTo(0, 0);
      this.setCurrentFacility(facility);
      this.setMainTabIndex(1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/components/_external.scss';

.border-0 {
  border: none;
}

.shadow-0 {
  box-shadow: none;
}

.customCard{
 border:1px solid #d7dadf;
}

.customCard:hover {
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.25) !important;
  //font-size:12px!important;
}
</style>
