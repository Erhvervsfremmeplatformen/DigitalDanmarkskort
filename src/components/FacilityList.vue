<template>
  <div class="row">
    <div class="col-12 mb-5">
      <div class="d-flex align-items-center mb-2">
        <span class="bg-blue rounded-full badge mr-4" style="padding: 12px"></span> Virtuel facilitet
      </div>
      <div class="d-flex align-items-center">
        <span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span> Fysisk facilitet
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
        <b>{{error}}</b>
      </div>
      <div v-for="facility in facilities" :key="facility.uId" class="card flex-none mb-5">
        <Facility v-bind:facility="facility" />
        <div class="card-footer card-action">
          <div class="action-links">
            <button @click="showFacilityDialog(facility)" class="button button-primary">Læs mere</button>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--  <div class="d-flex flex-column position-absolute w-percent-100">-->
<!--    <div class="d-flex flex-column pb-4">-->
<!--      <div class="d-flex align-items-center mb-2">-->
<!--        <span class="bg-blue rounded-full badge mr-4" style="padding: 12px"></span> Virtuel facilitet-->
<!--      </div>-->
<!--      <div class="d-flex align-items-center">-->
<!--        <span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span> Fysisk facilitet-->
<!--      </div>-->
<!--    </div>-->
<!--    <div v-if="loading === 'pending'">-->
<!--      <div class="spinner"></div>-->
<!--      <div class="spinner-status" role="status">Arbejder</div>-->
<!--    </div>-->
<!--    <div class="h-full d-flex align-items-center justify-content-center" v-if="facilities.length === 0 && loading === 'idle' && !error">-->
<!--      <b>Ingen faciliteter fundet</b>-->
<!--    </div>-->
<!--    <div class="h-full d-flex align-items-center justify-content-center" v-if="error">-->
<!--      <b>{{error}}</b>-->
<!--    </div>-->
<!--    <div v-for="facility in facilities" :key="facility.uId" class="card flex-none mb-4">-->
<!--      <Facility v-bind:facility="facility" />-->

<!--      <div class="card-footer card-action">-->
<!--        <div class="action-links">-->
<!--          <button @click="showFacilityDialog(facility)" class="button button-primary">Læs mere</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script lang="ts">
import Facility from './Facility.vue';
import { Facility as FacilityType } from '../store/types';
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'FacilityList',
  components: {Facility},
  computed: {
    ...mapGetters({
      facilities: 'getFilteredFacilities',
      error: 'getError',
      loading: 'getLoading'
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

<style lang="scss" scoped>
$color-primary:               #0059B3;
$color-primary-medium:        #004993;
$color-primary-dark:          #003972;

$font-path:         '~dkfds/src/fonts/IBMPlexSans/';
$image-path:        '~dkfds/src/img';
$site-image-path:   '~dkfds/src/img';
$icons-folder-path: '~dkfds/src/img/svg-icons';
@import '~dkfds/src/stylesheets/dkfds';
@import '../styles/components/_external.scss';

</style>
