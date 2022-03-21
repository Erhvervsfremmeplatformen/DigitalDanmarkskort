<template>
  <div  id="filter-multiselect" class="d-block w-percent-100">
    <div class="row mb-4">
      <div class="col-12 col-lg-6">
        <div style="height: 28px;line-height: 27px;">
          <label>
            <b>Branche(r)</b>
          </label>
        </div>
        <div class="my-multiselect">
          <multiselect
            :value="stateAreaTypes"
            select-label=""
            tag-placeholder=""
            deselect-label=""
            selected-label=""
            placeholder=""
            label="text"
            track-by="value"
            :options="areaTypes.options"
            :multiple="true"
            :taggable="true"
            :preselect-first="false"
            open-direction="bottom"
            @input="setAreaTypes"
          >
            <template slot="tag" slot-scope="props">
              <span class="multiselect__tag">
                <span>{{ props.option.text.length > 30 ? `${props.option.text.substr(0, 30)}...` : props.option.text }}</span>
                <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i
              ></span>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc d-flex align-items-center">
                <span class="option__title mr-2">{{ props.option.text }}</span>
                <div class="custom-tooltip">
                <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description" >
                  <i class="icon icon-help i-white" slot="trigger" />
                </Tooltip>
                  </div>
              </div>
            </template>
          </multiselect>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div style="height: 28px;line-height: 27px;">
          <label>
            <b>Kategori(er)</b>
          </label>
        </div>
        <div class="my-multiselect">
          <multiselect
            :value="stateCategories"
            select-label=""
            tag-placeholder=""
            deselect-label=""
            selected-label=""
            placeholder=""
            label="text"
            track-by="value"
            :options="categories.options"
            :multiple="true"
            :taggable="true"
            :preselect-first="false"
            open-direction="bottom"
            @input="setCategories"
          >
            <template slot="tag" slot-scope="props">
              <span class="multiselect__tag">
                <span>{{ props.option.text.length > 30 ? `${props.option.text.substr(0, 30)}...` : props.option.text }}</span>
                <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i
              ></span>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc d-flex align-items-center">
                <span class="option__title mr-2">{{ props.option.text }}</span>
                <div class="custom-tooltip">
                  <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description" >
                    <i class="icon icon-help i-white" slot="trigger"  />
                  </Tooltip>
                </div>
              </div>
            </template>
          </multiselect>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12 col-lg-6">
        <div class="d-flex" style="height: 28px;line-height: 27px;">
          <label class="mb-2 mr-2">
            <b>Service(s)</b>
          </label>
<!--          <button style="margin-top:-3px" id="Tooltip-ID" class="js-tooltip button-unstyled" data-tooltip="Hvilken ydelse eller service er tilknyttet faciliteten?" data-tooltip-trigger="click">-->
<!--            <i class="icon icon-help" /><span class="sr-only">Hvad betyder det?</span>-->
<!--          </button>-->
          <Tooltip content="Hvilken ydelse eller service er tilknyttet faciliteten?" >
            <i class="icon icon-help i-white" slot="trigger" />
          </Tooltip>
        </div>
        <!--          <button class="button button-unstyled">-->
        <!--            <Tooltip content="Hvilken ydelse eller service er tilknyttet faciliteten?">-->
        <!--              <i class="icon icon-help" slot="trigger" />-->
        <!--            </Tooltip>-->
        <!--          </button>-->
        <div class="my-multiselect">
          <multiselect
            :value="stateServiceTypes"
            select-label=""
            tag-placeholder=""
            deselect-label=""
            selected-label=""
            placeholder=""
            label="text"
            track-by="value"
            :options="serviceTypes.options"
            :multiple="true"
            :taggable="true"
            :preselect-first="false"
            open-direction="bottom"
            @input="setServiceTypes"
          >
            <template slot="tag" slot-scope="props">
              <span class="multiselect__tag">
                <span>{{ props.option.text.length > 30 ? `${props.option.text.substr(0, 30)}...` : props.option.text }}</span>
                <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i
              ></span>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc d-flex align-items-center">
                <span class="option__title mr-2">{{ props.option.text }}</span>
                <div class="custom-tooltip">
                  <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description" >
                    <i class="icon icon-help i-white" slot="trigger"  />
                  </Tooltip>
                </div>
              </div>
            </template>
          </multiselect>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div style="height: 28px;line-height: 27px;">
          <label>
            <b>Udbydertype(r)</b>
          </label>
        </div>
        <div class="my-multiselect">
          <multiselect
            :value="stateProviderTypes"
            select-label=""
            tag-placeholder=""
            deselect-label=""
            selected-label=""
            placeholder=""
            label="text"
            track-by="value"
            :options="providerTypes.options"
            :multiple="true"
            :taggable="true"
            :preselect-first="false"
            open-direction="bottom"
            @input="setProviderTypes"
          >
            <template slot="tag" slot-scope="props">
              <span class="multiselect__tag">
                <span>{{ props.option.text.length > 30 ? `${props.option.text.substr(0, 30)}...` : props.option.text }}</span>
                <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i
              ></span>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__desc d-flex align-items-center">
                <span class="option__title mr-2">{{ props.option.text }}</span>
                <div class="custom-tooltip">
                  <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description" >
                    <i class="icon icon-help i-white" slot="trigger"  />
                  </Tooltip>
                </div>
              </div>
            </template>
          </multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Multiselect from 'vue-multiselect';
import { ProviderTypes, ListItem, Categories, AreaTypes, ServiceTypes } from '../store/types';
import { mapActions, mapGetters } from 'vuex';
import Tooltip from './Tooltip.vue';
import * as DKFDS from 'dkfds';

export default {
  name: 'Filters',
  components: {
    Tooltip,
    Multiselect
  },
  inject: ['refreshKey'],
  mounted() {
    //new DKFDS.Tooltip(document.getElementById('Tooltip-ID'));
  },
  data() {
    const providerTypes = Object.keys(ProviderTypes).map(
      (x: string): ListItem => ({ text: ProviderTypes[Number(x)].text, value: x, description: ProviderTypes[Number(x)].description })
    );
    const categories = Object.keys(Categories).map(
      (x: string): ListItem => ({ text: Categories[Number(x)].text, value: x, description: Categories[Number(x)].description })
    );
    const areaTypes = Object.keys(AreaTypes).map(
      (x: string): ListItem => ({ text: AreaTypes[Number(x)].text, value: x, description: AreaTypes[Number(x)].description })
    );
    const serviceTypes = Object.keys(ServiceTypes).map(
      (x: string): ListItem => ({ text: ServiceTypes[Number(x)].text, value: x, description: ServiceTypes[Number(x)].description })
    );

    return {
      categories: {
        options: categories
      },
      providerTypes: {
        options: providerTypes
      },
      areaTypes: {
        options: areaTypes
      },
      serviceTypes: {
        options: serviceTypes
      }
    };
  },
  computed: {
    /*
    ...mapGetters({
      stateProviderTypes: 'getProviderTypes',
      stateAreaTypes: 'getAreaTypes',
      stateCategories: 'getCategories',
      stateServiceTypes: 'getServiceTypes'
    }),
    */
    stateProviderTypes() {
      return this.refreshKey.value ? this.$store.getters.getProviderTypes : [];
    },
    stateAreaTypes() {
      return this.refreshKey.value ? this.$store.getters.getAreaTypes : [];
    },
    stateCategories() {
      return this.refreshKey.value ? this.$store.getters.getCategories : [];
    },
    stateServiceTypes() {
      return this.refreshKey.value ? this.$store.getters.getServiceTypes : [];
    }
  },
  methods: {
    ...mapActions(['setProviderTypes', 'setCategories', 'setAreaTypes', 'setServiceTypes'])
  }
};
</script>

<style lang="scss" scoped>
//
//@import '~tippy.js/dist/tippy';
//>>> .tippy-box {
//  // import vue-multiselect as scoped
//
//
//
//    font-size: 1.6rem !important;
//    line-height: 2.4rem !important;
//    font-weight: 400 !important;
//    color: #1a1a1a !important;
//    text-transform: none !important;
//    font-size: 1.6rem !important;
//    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3) !important;
//    background-color: #fff !important;
//    border: 1px solid #747474 !important;
//    border-radius: 4px !important;
//    padding: .3rem .6rem !important;
//  
//}


>>> .my-multiselect {
  // import vue-multiselect as scoped
  
  @import 'vue-multiselect/dist/vue-multiselect.min';

  // Override default vue-multiselect styling
  .multiselect__element {
    ul > li {
      margin-top: 0;
      padding-left: 0;
      line-height: 0;
    }
    ul > li::before {
      display: none;
    }
  }
  .multiselect__element {
    list-style-type: none;
  }
  .multiselect__tag-icon:focus,
  .multiselect__tag-icon:hover {
    background-color: royalblue;
  }
  .multiselect__tag {
    background-color: darkblue;
  }
  .multiselect__tags {
    border-radius: 0;
  }
  ul > li {
    margin-top: 0 !important;
    padding-left: 0 !important;
    line-height: 0 !important;
  }
  ul > li::before {
    display: none !important;
  }
  .multiselect__tag-icon:after {
    color: white;
  }

  .multiselect__option--selected.multiselect__option--highlight {
    background-color: transparent;
    color: black;
  }

  .multiselect__option--highlight {
    background-color: darkblue;
  }

  .multiselect__option--highlight .i-white {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(128deg) brightness(102%) contrast(104%);
  }

  .multiselect__option--selected.multiselect__option--highlight .i-white {
    filter: invert(0%) sepia(6%) saturate(0%) hue-rotate(324deg) brightness(91%) contrast(102%);
  }
}
@import '../styles/components/_external.scss';

.tooltip-popper {
  z-index: 9999 !important;
}
</style>
