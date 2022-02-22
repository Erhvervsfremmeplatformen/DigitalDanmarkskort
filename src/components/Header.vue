<template>
  <div class="position-relative">
    <div class="py-4 d-flex justify-content-center align-items-center">
      <button class="button button-unstyled button-small d-lg-none w-auto" @click="setMainIndex(0)">
        <i class="d-lg-none icon icon-tune"></i>
      </button>
      <div class="form-group search m-0 mx-4">
        <label for="searchString" class="sr-only">Søg efter indhold</label>
        <input
            id="searchString"
            class="form-input searchInput"
            name="searchString"
            title="Search"
            type="search"
            v-model="searchString"
        />
        <button class="button button-search">
          <i class="icon icon-search" />
        </button>
      </div>

      <button class="button button-unstyled button-small d-lg-none w-auto" @click="setMainIndex(2)">
        <i v-if="tabIndex === 0 || tabIndex === 1" class="icon icon-menu"></i>
        <i v-if="tabIndex === 2" class="icon icon-map"></i>
      </button>
      <button class="button button-small px-2 button-unstyled d-none d-lg-flex justify-content-center"
              @click="toggleShowFilter">
        <i v-if="show" class="icon icon-expand-more"></i>
        <i v-if="!show" class="icon icon-expand-less"></i>Filtrer
      </button>
    </div>
    <div v-if="show" class="bg-alternative w-percent-100 d-none d-lg-flex">
      <Filters />
    </div>
  </div>
</template>

<script lang="ts">

import {mapActions, mapGetters, mapMutations} from 'vuex';
import Filter from "ol/format/filter/Filter";
import Filters from "@/components/Filters.vue";
import {FiltersMutations} from "@/store/modules/filters";

export default {
  name: 'Header',
  data: () => ({
    searchString: '',
    show: false,
    debounce: undefined
  }),
  components: {
    Filters
  },
  computed: {
    ...mapGetters({
      tabIndex: 'getMainTabIndex'
    }),
  },
  watch: {
    // whenever question changes, this function will run
    searchString: function(search: string) {
      if (this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = setTimeout(() => this.setSearchString(search), 300);
    }
  },
  methods: {
    ...mapActions(['setSearchString']),
    ...mapActions(['setMainTabIndex']),
    setMainIndex(index: number) {
      if(this.tabIndex === index) {
        this.setMainTabIndex(1);
      } else {
        this.setMainTabIndex(index);
      }
    },
    toggleShowFilter() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.searchInput {
  width: 40rem;
}
</style>
