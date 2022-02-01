<template>
  <div class="position-relative">
    <div class="py-4 d-flex justify-content-center align-items-center">
      <button class="button button-unstyled button-small d-lg-none w-auto" @click="setMainIndex(0)"
      >
        <i class="d-lg-none icon icon-tune"></i>
      </button>
      <div class="form-group search m-0">
        <label for="input-type-text-icon" class="sr-only">Søg efter indhold</label>
        <input
            id="input-type-text-icon"
            class="form-input input-width-xs"
            name="search-icon"
            title="Search"
            type="search"
        />
        <button class="button button-search">
          <i class="icon icon-search" />
        </button>
      </div>
      <button class="button button-unstyled button-small d-lg-none w-auto" @click="setMainIndex(2)">
        <i class="icon icon-menu"></i>
      </button>
      <button class="button button-small px-2 button-unstyled d-none d-lg-flex justify-content-center" @click="toggleShowFilter">
        <i v-if="show" class="icon icon-expand-more"></i>
        <i v-if="!show" class="icon icon-expand-less"></i>filter
      </button>
    </div>
    <div v-if="show" class="position-absolute z-10 bg-alternative p-4 w-percent-100 d-none d-lg-flex">
      test
    </div>
  </div>
</template>

<script lang="ts">

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Header",
  data: () => {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      tabIndex: "getMainTabIndex"
    }),
  },
  methods: {
    ...mapActions(["setMainTabIndex"]),
    setMainIndex(index: number) {
      if(this.tabIndex === index)
        this.setMainTabIndex(1);
      else
        this.setMainTabIndex(index);
    },
    toggleShowFilter() {
      this.show = !this.show;
    }
  }
}
</script>

<style scoped>

</style>