<template>
  <div class="row bg-alternative">
    <div class="col-12">
      <h1>Danske Testfaciliteter</h1>
    </div>
    <div class="col-12 py-4 d-flex justify-content-center align-items-center">
      <button class="button button-unstyled button-small d-lg-none w-auto" @click="setMainIndex(0)">
        <i class="d-lg-none icon icon-tune"></i>
      </button>
      <div class="form-group search m-0 mx-4">
        <label for="searchString" class="sr-only">Søg efter indhold</label>
        <input id="searchString" class="form-input searchInput" name="searchString" title="Search" type="search" v-model="searchString" />
        <button class="button button-search">
          <i class="icon icon-search" />
        </button>
      </div>

      <button class="button button-unstyled button-small d-lg-none w-auto" @click="setMainIndex(2)">
        <i v-if="tabIndex === 0 || tabIndex === 1" class="icon icon-format-list-bulleted"></i>
        <i v-if="tabIndex === 2" class="icon icon-map"></i>
      </button>
      <button class="button button-small px-2 button-unstyled d-none d-lg-flex justify-content-center align-items-center" @click="setShowFilter">
        <i v-if="show" class="icon icon-expand-more"></i>
        <i v-if="!show" class="icon icon-expand-less"></i>Filtrer
      </button>
    </div>
    <div v-if="show" class="col-12 bg-alternative w-percent-100 d-none d-lg-flex">
      <Filters />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Filters from './Filters.vue';

export default {
  name: 'Header',
  inject: ['refreshKey'],
  data: () => ({
    searchString: '',
    // show: false,
    debounce: undefined
  }),
  components: {
    Filters
  },
  computed: {
    // ...mapGetters({
    //   tabIndex: 'getMainTabIndex'
    //   //show: 'getShowFilter'
    // }),
    tabIndex() {
      return this.refreshKey.value && this.$store.getters.getMainTabIndex;
    },
    show() {
      return this.refreshKey.value && this.$store.getters.getShowFilter;
    }
  },
  watch: {
    // whenever question changes, this function will run
    searchString: function (search: string) {
      if (this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = setTimeout(() => this.setSearchString(search), 300);
    }
  },
  methods: {
    ...mapActions(['setSearchString', 'setMainTabIndex', 'setShowFilter']),
    setMainIndex(index: number) {
      if (this.tabIndex === index) {
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

<style scoped lang="scss">
@import '../styles/components/_external.scss';
.searchInput {
  max-width: 40rem;
}
</style>
