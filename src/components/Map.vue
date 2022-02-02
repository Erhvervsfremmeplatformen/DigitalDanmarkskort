<template>
  <div class="h-full w-percent-100 position-relative">
    <div ref="map-root" class="w-percent-100 h-full" />
      <FacilityDialog v-if="currentFacility" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source';
import { Geometry, Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { createEmpty, extend, getWidth } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import FacilityDialog from '@/components/FacilityDialog.vue';
import {mapGetters} from 'vuex';
import {Facility} from '@/store/types';
import RenderFeature from 'ol/render/Feature';

type MapData  = {
  source: VectorSource<Geometry>;
}

export default Vue.extend({
  name: 'Map',
  components: {FacilityDialog},
  computed: {
    ...mapGetters({
      currentFacility: 'getCurrentFacility',
      filteredFacilities: 'getFilteredFacilities'
    }),
  },
  data: (): MapData => ({
    source: new VectorSource<Geometry>({ features: [] }),
  }),
  watch: {
    filteredFacilities() {
      const facilities: Facility[] = this.filteredFacilities;
      const facilityCount = facilities.length;
      const features = new Array<Feature<Geometry>>();

      for(let i = 0; i < facilityCount; i++) {
        const facility = facilities[i];
        if (!facility.longitude || !facility.latitude)
        {
          continue;
        }

        const feature = new Feature(new Point(fromLonLat([Number(facility.longitude), Number(facility.latitude)])));
        feature.setProperties({
          isVirtual: facility.isVirtual ?? false,
          facilityId: facility.uId
        });
        features.push(feature);
      }
      this.source.clear();
      this.source.addFeatures(features);
    }
  },
  async mounted() {
    this.initiateMap();
  },
  methods: {
    initiateMap() {
      // const source = new VectorSource({
      //   features: this.features,
      // });
      // this.source = source;
      const source = this.source;

      const outerCircleFill = new Fill({
        color: 'rgba(255,102,102,0.3)',
      });
      const innerCircleFill = new Fill({
        color: 'rgba(255,0,0,0.7)',
      });
      const textFill = new Fill({
        color: '#fff',
      });
      const textStroke = new Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 1,
      });
      const innerCircle = new CircleStyle({
        radius: 14,
        fill: innerCircleFill,
      });
      const outerCircle = new CircleStyle({
        radius: 20,
        fill: outerCircleFill,
      });
      const virtualMarker = new CircleStyle({
        radius: 10,
        fill: new Fill({
          color: 'rgba(0,0,255,1)'
        })
      });

      const physicalMarker = new CircleStyle({
        radius: 10,
        fill: new Fill({
          color: 'rgba(255,0,0,1)'
        })
      });

      function clusterStyle(feature: Feature<Geometry> | RenderFeature, resolution: number): (void | Style | Style[]) {
        const size = feature.get('features').length;

        if(size === 1) {
          const featureFacility = feature.get('features')[0];
          const isVirtual = featureFacility.get('isVirtual');

          return new Style({
            image: isVirtual ? virtualMarker : physicalMarker
          });
        }

        return [
          new Style({
            image: outerCircle,
          }),
          new Style({
            image: innerCircle,
            text: new Text({
              text: size.toString(),
              fill: textFill,
              stroke: textStroke,
            }),
          }),
        ];
      }

      const clusterSource = new Cluster({
        distance: 35,
        source: source,
      });

      // Layer displaying the clusters and individual features.
      const clusters = new VectorLayer({
        source: clusterSource,
        style: clusterStyle,
      });

      const raster = new TileLayer({
        source: new OSM(),
      });

      const map = new Map({
         layers: [raster, clusters],
        // layers: [raster],
        target: this.$refs['map-root'],
        view: new View({
          center: fromLonLat([9.501785, 56.26392]),
          zoom: 7,
          maxZoom: 19,
          showFullExtent: true,
        }),
      });

      map.on("click", (event) => {
        clusters.getFeatures(event.pixel).then((features) => {
          console.log(features)
          if (features.length > 0) {
            const clusterMembers = features[0].get("features");
            const view = map.getView();
            if (clusterMembers.length > 1) {
              // Calculate the extent of the cluster members.
              const extent = createEmpty();
              clusterMembers.forEach((feature: Feature<any>) =>
                  extend(extent, feature.getGeometry().getExtent())
              );
              const resolution = map.getView().getResolution();
              if (
                  view.getZoom() === view.getMaxZoom() ||
                  (resolution &&
                      getWidth(extent) < resolution &&
                      getWidth(extent) < resolution)
              ) {
                // Show an expanded view of the cluster members.
                // clickFeature = features[0];
                // clickResolution = resolution;
                // clusterCircles.setStyle(clusterCircleStyle);
              } else {
                // Zoom to the extent of the cluster members.
                view.fit(extent, { duration: 500, padding: [50, 50, 50, 50] });
              }
            }
            else {

            }
          }
        });
      });
    },
  },
});
</script>

<style scoped>

</style>
