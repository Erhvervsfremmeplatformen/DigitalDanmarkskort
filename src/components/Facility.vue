<template>
  <div class="h-full w-percent-100">
    <div class="card-header d-flex align-items-center">
      <span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span>
      <h2 class="header-title">Eksempel på card-komponenten</h2>
    </div>

    <div class="card-action">
      <div class="action-links d-flex align-items-center">
        <i class="icon icon-open-in-new mr-4"></i>
        <a href="/komponenter/cards/">Besøg website</a>
      </div>
    </div>

    <div class="card-text">
      <p><b>Udbydertype:</b></p>
      <p><b>Kategori(er):</b></p>
      <p><b>Område(r):</b></p>
    </div>

    <div v-if="showMore" class="card-text">
      <p><b>Service:</b></p>
      <p><b>Beskrivelse:</b></p>
    </div>

    <div v-if="showMore" class="card-action">
      <div class="action-links d-flex align-items-center">
        <i class="icon icon-location-on mr-4"></i>
        <a href="/komponenter/cards/">Besøg website</a>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'Facility',
  props: {
    showMore: {
      type: Boolean,
      default: false
    }
  }

};
</script>

<style scoped>

</style>
