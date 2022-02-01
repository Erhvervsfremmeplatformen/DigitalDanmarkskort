<template>
  <div class="d-flex flex-column px-4 position-absolute w-percent-100">
    <div class="d-flex flex-column py-4">
      <div class="d-flex align-items-center mb-2">
        <span class="bg-blue rounded-full badge mr-4" style="padding: 12px"></span> Virtuel facilitet
      </div>
      <div class="d-flex align-items-center">
        <span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span> Fysisk facilitet
      </div>
    </div>

    <div v-for="item in items" class="card flex-none mb-4">
      <div class="card-header d-flex align-items-center">
        <span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span>
        <h2 class="header-title">Eksempel på card-komponenten</h2>
      </div>

      <div class="card-action">
        <div class="action-links d-flex align-items-center">
          <i class="icon icon-open-in-new mr-4"></i>
          <a href="/komponenter/cards/">Gå til komponent</a>
        </div>
      </div>

      <div class="card-text">
        <p><b>test</b></p>
        <p><b>test</b></p>
        <p><b>test</b></p>
        <p><b>test</b></p>
      </div>

      <div class="card-footer card-action">
        <div class="action-links">
          <button class="button button-secondary">Sekundærknap</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: "FacilityList",
  data: () => {
    return {
      items: [
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Foo'},
        {message: 'Bar'}
      ]
    }
  }
}
</script>

<style scoped>
</style>