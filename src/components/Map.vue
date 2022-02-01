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

export default Vue.extend({
  name: 'Map',
  components: {FacilityDialog},
  computed: {
    ...mapGetters({
      currentFacility: 'getCurrentFacility'
    }),
  },
  async mounted() {
    await this.initiateMap();
  },
  methods: {
    initiateMap() {
    //   const count = 2000;
    //   const features = new Array(count);
    //   const e = 4500000;
    //   for (let i = 0; i < count; ++i) {
    //     const coordinates = [
    //       2 * e * Math.random() - e,
    //       2 * e * Math.random() - e,
    //     ];
    //     features[i] = new Feature(new Point(coordinates));
    //   }
    //
    //   const source = new VectorSource({
    //     features: features,
    //   });
    //
    //   const circleDistanceMultiplier = 1;
    //   const circleFootSeparation = 28;
    //   const circleStartAngle = Math.PI / 2;
    //
    //   const outerCircleFill = new Fill({
    //     color: "rgba(255,102,102,0.3)",
    //   });
    //   const innerCircleFill = new Fill({
    //     color: "rgba(255,0,0,0.7)",
    //   });
    //   const textFill = new Fill({
    //     color: "#fff",
    //   });
    //   const textStroke = new Stroke({
    //     color: "rgba(0, 0, 0, 0.6)",
    //     width: 1,
    //   });
    //   const innerCircle = new CircleStyle({
    //     radius: 14,
    //     fill: innerCircleFill,
    //   });
    //   const outerCircle = new CircleStyle({
    //     radius: 20,
    //     fill: outerCircleFill,
    //   });
    //
    //
    //   let clickFeature: any, clickResolution: any;
    //   /**
    //    * Style for clusters with features that are too close to each other, activated on click.
    //    * @param {Feature} cluster A cluster with overlapping members.
    //    * @param {number} resolution The current view resolution.
    //    * @return {Style} A style to render an expanded view of the cluster members.
    //    */
    //   function clusterCircleStyle(
    //       cluster: Feature<any>,
    //       resolution: number
    //   ): Array<Array<number>> | void {
    //     if (cluster !== clickFeature || resolution !== clickResolution) {
    //       return;
    //     }
    //     const clusterMembers = cluster.get("features");
    //     return generatePointsCircle(
    //         clusterMembers.length,
    //         cluster.getGeometry().getCoordinates(),
    //         resolution
    //     );
    //   }
    //
    //   /**
    //    * From
    //    * https://github.com/Leaflet/Leaflet.markercluster/blob/31360f2/src/MarkerCluster.Spiderfier.js#L55-L72
    //    * Arranges points in a circle around the cluster center, with a line pointing from the center to
    //    * each point.
    //    * @param {number} count Number of cluster members.
    //    * @param {Array<number>} clusterCenter Center coordinate of the cluster.
    //    * @param {number} resolution Current view resolution.
    //    * @return {Array<Array<number>>} An array of coordinates representing the cluster members.
    //    */
    //   function generatePointsCircle(
    //       count: number,
    //       clusterCenter: Array<number>,
    //       resolution: number
    //   ): Array<Array<number>> {
    //     const circumference =
    //         circleDistanceMultiplier * circleFootSeparation * (2 + count);
    //     let legLength = circumference / (Math.PI * 2); //radius from circumference
    //     const angleStep = (Math.PI * 2) / count;
    //     const res = [];
    //     let angle;
    //
    //     legLength = Math.max(legLength, 35) * resolution; // Minimum distance to get outside the cluster icon.
    //
    //     for (let i = 0; i < count; ++i) {
    //       // Clockwise, like spiral.
    //       angle = circleStartAngle + i * angleStep;
    //       res.push([
    //         clusterCenter[0] + legLength * Math.cos(angle),
    //         clusterCenter[1] + legLength * Math.sin(angle),
    //       ]);
    //     }
    //
    //     return res;
    //   }
    //
    //   function clusterStyle(feature: Feature<any>): Style[] {
    //     const size = feature.get("features").length;
    //     return [
    //       new Style({
    //         image: outerCircle,
    //       }),
    //       new Style({
    //         image: innerCircle,
    //         text: new Text({
    //           text: size.toString(),
    //           fill: textFill,
    //           stroke: textStroke,
    //         }),
    //       }),
    //     ];
    //   }
    //
    //   const clusterSource = new Cluster({
    //     distance: 35,
    //     source: source,
    //   });
    //
    //   // Layer displaying the clusters and individual features.
    //   const clusters = new VectorLayer({
    //     source: clusterSource,
    //     style: clusterStyle,
    //   });
    //
    //   // Layer displaying the expanded view of overlapping cluster members.
    //   const clusterCircles = new VectorLayer({
    //     source: clusterSource,
    //     style: clusterCircleStyle,
    //   });
    //
      const raster = new TileLayer({
        source: new OSM(),
      });

      const map = new Map({
        // layers: [raster, clusters, clusterCircles],
        layers: [raster],
        target: this.$refs['map-root'],
        view: new View({
          center: fromLonLat([9.501785, 56.26392]),
          zoom: 7,
          maxZoom: 19,
          showFullExtent: true,
        }),
      });
    //
    //   map.on("click", (event) => {
    //     clusters.getFeatures(event.pixel).then((features) => {
    //       if (features.length > 0) {
    //         const clusterMembers = features[0].get("features");
    //         const view = map.getView();
    //         if (clusterMembers.length > 1) {
    //           // Calculate the extent of the cluster members.
    //           const extent = createEmpty();
    //           clusterMembers.forEach((feature: Feature<any>) =>
    //               extend(extent, feature.getGeometry().getExtent())
    //           );
    //           const resolution = map.getView().getResolution();
    //           if (
    //               view.getZoom() === view.getMaxZoom() ||
    //               (resolution &&
    //                   getWidth(extent) < resolution &&
    //                   getWidth(extent) < resolution)
    //           ) {
    //             // Show an expanded view of the cluster members.
    //             clickFeature = features[0];
    //             clickResolution = resolution;
    //             clusterCircles.setStyle(clusterCircleStyle);
    //           } else {
    //             // Zoom to the extent of the cluster members.
    //             view.fit(extent, { duration: 500, padding: [50, 50, 50, 50] });
    //           }
    //         }
    //       }
    //     });
    //   });
    },
  },
});
</script>

<style scoped>

</style>
