<template>
  <div class="h-full w-percent-100">
      <div class="card-header d-flex align-items-center">
        <span class="bg-red rounded-full badge mr-4" style="padding: 12px"></span>
        <h2 class="header-title">{{ facility.name }}</h2>
      </div>

      <div class="card-action">
        <div class="action-links d-flex align-items-center">
          <i class="icon icon-open-in-new mr-4"></i>
          <a href="/komponenter/cards/">Besøg website</a>
        </div>
      </div>

      <div class="card-text">
        <p><b>Udbydertype:</b> {{getProviders}}</p>
        <p><b>Kategori(er):</b> {{getCategories}}</p>
        <p><b>Område(r):</b> {{getAreas}}</p>
      </div>

      <div v-if="showMore" class="card-text">
        <p><b>Service:</b> {{getServices}}</p>
        <p><b>Beskrivelse:</b> {{facility.description}}</p>
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
import {Facility, ListItem} from "@/store/types";

export default {
  name: 'Facility',
  props: {
    showMore: {
      type: Boolean,
      default: false
    },
    facility: {
      type: Object as () => Facility
    }
  },
  computed: {
    getProviders(): string {
      return this.facility.providerTypes?.map((item: ListItem) => item.text)?.join(',') ?? '';
    },
    getCategories(): string {
      return this.facility.categories?.map((item: ListItem) => item.text)?.join(',') ?? '';
    },
    getAreas(): string {
      return this.facility.areaTypes?.map((item: ListItem) => item.text)?.join(',') ?? '';
    },
    getServices(): string {
      return this.facility.serviceTypes?.map((item: ListItem) => item.text)?.join(',') ?? '';
    }
  }

};
</script>

<style scoped>

</style>
