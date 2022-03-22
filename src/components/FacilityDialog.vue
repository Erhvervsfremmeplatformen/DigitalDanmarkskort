<template>
  <div :class="showFilter ? ' position-absolute z-10 fixed-bottom w-percent-100 p-4' : 'position-absolute z-10 fixed-bottom w-percent-100 p-4'"> 
    <div  :class="showFilter ? ' card flex-none position-relative pt-7' : 'card flex-none position-relative pt-7'">
      <button
          style="right: 25px; top: 15px"
          aria-label="Luk facilitets vindue"
          class="modal-close function-link d-flex justify-content-center position-absolute"
          @click="setCurrentFacility(undefined)"
      >
        <i class="icon icon-close" />
        Luk
      </button>
      <div :class="showFilter ? 'filtershow ' : ''">
        <Facility :facility="facility" :show-more="showMore" />

      </div>
      <div class="card-footer card-action">
        <div class="action-links">
          <button 
              class="d-flex flex-column align-items-center button m-auto button-small px-2 button-unstyled d-none d-lg-flex justify-content-center"
              @click="toggleShowMore"
          >
            <span>
              <i v-if="showMore" class="icon icon-expand-more"></i>
              <i v-if="!showMore" class="icon icon-expand-less"></i>
            </span>
            <span aria-label="Se mere" v-if="!showMore"> Se mere </span>
            <span aria-label="Se mindre" v-if="showMore"> Se mindre </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Facility from './Facility.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FacilityDialog',
  components: { Facility },
  data: () => ({
    showMore: false
  }),
  computed: {
    ...mapGetters({
      facility: 'getCurrentFacility',
      showFilter: 'getShowFilter'
    })
  },
  methods: {
    ...mapActions(['setCurrentFacility']),
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    isDesktop() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.showMore = this.isDesktop();
  }
};
</script>

<style scoped lang="scss"> 
@import '../styles/components/_external.scss';

.filtershow{
  max-height:480px;
  overflow-y:auto;
}
</style>
