<template>
  <div class="position-absolute z-10 fixed-bottom w-percent-100 p-4">
    <div class="card flex-none">
      <Facility :show-more="showMore" />
      <div class="card-footer card-action">
        <div class="action-links">
          <button class="d-flex flex-column align-items-center button m-auto button-small px-2 button-unstyled d-none d-lg-flex justify-content-center" @click="toggleShowMore">
            <span>
              <i v-if="showMore" class="icon icon-expand-more"></i>
              <i v-if="!showMore" class="icon icon-expand-less"></i>
            </span>
            <span>
              Se mere
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Facility from '@/components/Facility.vue';
export default {
  name: 'FacilityDialog',
  components: {Facility},
  data: () => ({
      showMore: false
    }),
  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
    }
  }
};
</script>

<style scoped>

</style>
