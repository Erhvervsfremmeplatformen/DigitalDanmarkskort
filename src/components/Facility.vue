<template>
  <div class="h-full w-percent-100 max-h overflow-auto">
    <div class="card-header d-flex align-items-center pt-5">
      <span v-if="facility.isVirtual" class="bg-blue rounded-full badge mr-4" style="padding: 12px"></span>
      <span v-if="!facility.isVirtual" class="bg-red rounded-full badge mr-4" style="padding: 12px"></span>
      <h3 class="header-title">{{ facility.name }}</h3>
    </div>

    <div class="card-text">
      <p>
        <b>{{ facility.organisation }}</b>
      </p>
    </div>

    <div class="card-action">
      <div class="action-links d-flex align-items-center">
        <i class="icon icon-open-in-new mr-4"></i>
        <a v-bind:href="getWebsiteLink(facility.website)" target="_blank">Besøg website</a>
      </div>
    </div>

    <div class="card-text">
      <p><b>Udbydertype:</b> {{ getProviders }}</p>
      <p><b>Kategori(er):</b> {{ getCategories }}</p>
      <p><b>Område(r):</b> {{ getAreas }}</p>
    </div>

    <div v-if="showMore" class="card-text">
      <p><b>Service(s):</b> {{ getServices }}</p>
      <p><b>Brugerbetaling:</b> {{ getPayment }}</p>
      <p><b>Beskrivelse:</b> {{ facility.description }}</p>
    </div>

    <div v-if="showMore" class="card-action">
      <div class="action-links d-flex align-items-center">
        <i class="icon icon-location-on mr-4"></i>
        <a target="_blank" v-bind:href="`https://maps.apple.com/?daddr=${facility.city}+${facility.zip}+${facility.address}&dirflg=d`"
        >{{ facility.address }}, {{ facility.city }}, {{ facility.zip }}</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Facility, ListItem, ProviderTypes, Categories, AreaTypes, ServiceTypes } from '../store/types';

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
      return (
          this.facility.providerTypes
              ?.map((item: ListItem) => {
                const data = ProviderTypes[Number(item.value)];
                return `${data.text}`;
              })
              ?.join(', ') ?? ''
      );
    },
    getCategories(): string {
      return (
          this.facility.categories
              ?.map((item: ListItem) => {
                const data = Categories[Number(item.value)];
                return `${data.text}`;
              })
              ?.join(', ') ?? ''
      );
    },
    getAreas(): string {
      return (
          this.facility.areaTypes
              ?.map((item: ListItem) => {
                const data = AreaTypes[Number(item.value)];
                return `${data.text}`;
              })
              ?.join(', ') ?? ''
      );
    },
    getServices(): string {
      return (
          this.facility.serviceTypes
              ?.map((item: ListItem) => {
                const data = ServiceTypes[Number(item.value)];
                return `${data.text}`;
              })
              ?.join(', ') ?? ''
      );
    },
    getPayment(): string {
      if (this.facility.paymentType == 0) return 'Nej';
      if (this.facility.paymentType == 1) return 'Ja';
      if (this.facility.paymentType == 2) return 'I nogen tilfælde';
      return 'Ukendt';
    }
  },
  methods: {
    getWebsiteLink(url: string): string {
      return url.startsWith('http') ? url : `https://${url}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/components/_external.scss';

.max-h {
  max-height: 500px;

  @media (min-width: map-get($grid-breakpoints, lg)) {
    max-height: 690px;
  }



}
</style>
