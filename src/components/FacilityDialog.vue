<template>
  <div class="position-absolute z-10 fixed-bottom w-percent-100 p-4">
    <div class="card flex-none">
      <Facility />
      <div class="card-footer card-action">
        <div class="action-links">
          <button @click="toggleShowMore" class="d-flex flex-column align-items-center button m-auto button-small px-2 button-unstyled d-none d-lg-flex justify-content-center">
            <div>
              <i v-if="show" class="icon icon-expand-more"></i>
              <i v-if="!show" class="icon icon-expand-less"></i>
            </div>
            <div>
              Se mere
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Facility from "@/components/Facility.vue";
export default {
  name: "FacilityDialog",
  data: () => {
    return {
      show: false
    }
  },
  components: {Facility},
  methods: {
    toggleShowMore() {
      this.show = !this.show;
    }
  }
}
</script>

<style scoped>

</style>