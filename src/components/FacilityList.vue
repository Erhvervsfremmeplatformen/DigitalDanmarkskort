<template>
  <div class="d-flex flex-column px-4 position-absolute h-full w-percent-100">
    <div class="d-flex flex-column py-4">
      <div class="d-flex align-items-center mb-2">
        <span class="bg-blue rounded-full badge mr-4" style="padding: 12px"></span> Virtuel facilitet
      </div>
      <div class="d-flex align-items-center">
        <span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span> Fysisk facilitet
      </div>
    </div>
    <div class="h-full d-flex align-items-center justify-content-center" v-if="facilities.length === 0">
      <b>Ingen faciliteter fundet</b>
    </div>
    <div v-for="facility in facilities" :key="facility.uId" class="card flex-none mb-4">
      <Facility v-bind:facility="facility" />

      <div class="card-footer card-action">
        <div class="action-links">
          <button @click="showFacilityDialog(facility)" class="button button-primary">Se mere</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Facility from '@/components/Facility.vue';
import { Facility as FacilityType } from '@/store/types';
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'FacilityList',
  components: {Facility},
  computed: {
    ...mapGetters({
      facilities: 'getFilteredFacilities'
    })
  },
  methods: {
    ...mapActions(['setCurrentFacility', 'setMainTabIndex']),
    showFacilityDialog (facility: FacilityType) {
      this.setCurrentFacility(facility);
      this.setMainTabIndex(1);
    }
  }
};
</script>

<style scoped>
</style>
