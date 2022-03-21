<template>
  <div class="position-relative" :class="showFilter ? 'map-container-on' : 'map-container-off'">
    <div id="map-root" ref="map-root" class="w-percent-100 h-full normal-map" />
    <FacilityDialog v-if="currentFacility" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source';
import { Geometry, Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { createEmpty, extend, getWidth } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import FacilityDialog from './FacilityDialog.vue';
import {mapActions, mapGetters} from 'vuex';
import {Facility} from '../store/types';
import RenderFeature from 'ol/render/Feature';


type MapData  = {
  source: VectorSource<Geometry>;
  map: null
}

export default Vue.extend({
  name: 'Map',
  components: {FacilityDialog},
  computed: {
    ...mapGetters({
      currentFacility: 'getCurrentFacility',
      filteredFacilities: 'getFilteredFacilities',
      showFilter: 'getShowFilter'
    }),
    classObject: function () {
      return {
        containerClass: this.showFilter ? "map-container-on" : "map-container-off"
      }
    }
  },
  data: (): MapData => ({
    source: new VectorSource<Geometry>({ features: [] }),
    map:null
  }),
  watch: {
    filteredFacilities() {
      this.setMarkers();
    },
    showFilter(){
     // console.log("hey");
      var map = this.map;
      setTimeout( function() { map.updateSize();}, 50);
      
    }
  },
  async mounted() {
    this.initiateMap();
    if (this.filteredFacilities.length > 0) {
      this.setMarkers();
    }
  },
  methods: {
    ...mapActions([
      'getFacility',
      'setCurrentFacility',
    ]),
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
      const outerCircleFillVirtual = new Fill({
        color: 'rgba(0,0,255,.3)',
      });
      const innerCircleFillVirtual = new Fill({
        color: 'rgba(0,0,255,.7)',
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
      const innerCircleVirtual = new CircleStyle({
        radius: 14,
        fill: innerCircleFillVirtual,
      });
      const outerCircleVirtual = new CircleStyle({
        radius: 20,
        fill: outerCircleFillVirtual,
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
        const features: Feature<Geometry>[] = feature.get('features');
        const size = features.length;

        const virtualFacilityFeatures = features.filter(x => x.get('isVirtual') === true);
        const notVirtualFacilityFeatures = features.filter(x => x.get('isVirtual') === false);

        if(size === 1) {
          const featureFacility = feature.get('features')[0];
          const isVirtual = featureFacility.get('isVirtual');

          return new Style({
            image: isVirtual ? virtualMarker : physicalMarker
          });
        }
        else if (virtualFacilityFeatures.length > 1 && virtualFacilityFeatures.length > notVirtualFacilityFeatures.length)
        {
          return [
            new Style({
              image: outerCircleVirtual,
            }),
            new Style({
              image: innerCircleVirtual,
              text: new Text({
                text: size.toString(),
                fill: textFill,
                stroke: textStroke,
              }),
            }),
          ];
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
      this.map = map;

      map.on("click", (event) => {
        clusters.getFeatures(event.pixel).then(async (features) => {
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
                view.fit(extent, { duration: 500, padding: [50, 50, 50, 50] });
                // Show an expanded view of the cluster members.
                // clickFeature = features[0];
                // clickResolution = resolution;
                // clusterCircles.setStyle(clusterCircleStyle);
              } else {
                // Zoom to the extent of the cluster members.
                view.fit(extent, { duration: 500, padding: [50, 50, 50, 50] });
              }
            }
            else if (clusterMembers.length === 1) {
              const feature = clusterMembers[0];
              const facilityId = feature.get('facilityId');

              const facility = await this.getFacility(facilityId);
              await this.setCurrentFacility(facility);
            }
          }
        });
      });
    },
    setMarkers() {
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
});
</script>

<style lang="scss" scoped>
@import '../styles/components/_external.scss';

.normal-map {
  height: 781px !important;
  max-height: 781px !important;
}
.small-map {
  height: 613px!important;
  max-height: 613px!important;
}

@media (min-width: map-get($grid-breakpoints, lg)) {
  //.normal-map {
  //  height: 827px !important;
  //  max-height: 827px !important;
  //}
  //.small-map {
  //  height: 659px;
  //  max-height: 659px;
  //}

}
</style>
