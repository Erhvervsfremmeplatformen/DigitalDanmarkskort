<template>
  <div class="py-4 d-flex justify-content-center align-items-center">
    <button
        class="button button-unstyled button-small d-lg-none w-auto"
    >
      <i class="d-lg-none icon icon-tune"></i>
    </button>
    <div class="form-group search m-0">
      <label for="input-type-text-icon" class="sr-only"
      >Søg efter indhold</label
      >
      <input
          id="input-type-text-icon"
          class="form-input input-width-xs"
          name="search-icon"
          title="Search"
          type="search"
      />
      <button class="button button-search">
        <i class="icon icon-search"></i>
      </button>
    </div>
    <button
        class="button button-unstyled button-small d-lg-none w-auto"
    >
      <i class="icon icon-menu"></i>
    </button>
    <button
        class="button button-small px-2 button-unstyled d-none d-lg-flex justify-content-center"
    >
      <i v-if="show" class="icon icon-expand-more"></i>
      <i v-if="!show" class="icon icon-expand-less"></i>filter
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
  data: () => {
    return {
      show: false
    }
  },
}
</script>

<style scoped>

</style>