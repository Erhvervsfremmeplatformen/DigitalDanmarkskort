<template>
  <div id="filter-multiselect" class="d-flex flex-1 flex-column flex-lg-row">
    <div class="flex-1 d-flex flex-column">
      <div class="flex-1 m-3">
        <label class="d-block mb-2">
          Område(r)
        </label>
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
          @input="setAreaTypes">
        <template slot="tag" slot-scope="props">
            <span class="multiselect__tag">
            <span>{{props.option.text.length > 30 ? `${props.option.text.substring(0,30)}...` : props.option.text}}</span>
              <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i></span>
        </template>
        <template slot="option" slot-scope="props">
          <div class="option__desc d-flex align-items-center"><span class="option__title mr-2">{{ props.option.text }}</span>
              <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description">
                <i class="icon icon-help i-white" slot="trigger" />
              </Tooltip>
          </div>
        </template>
      </multiselect>
      </div>
      <div class="flex-1 m-3">
        <div class="d-flex align-items-center">
        <label class="mb-2 mr-2">
          Service
        </label>
          <Tooltip content="Hvilken ydelse eller service er tilknyttet faciliteten?">
            <i class="icon icon-help" slot="trigger" />
          </Tooltip>
        </div>
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
            @input="setServiceTypes">
          <template slot="tag" slot-scope="props">
            <span class="multiselect__tag">
            <span>{{props.option.text.length > 30 ? `${props.option.text.substring(0,30)}...` : props.option.text}}</span>
              <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i></span>
          </template>
          <template slot="option" slot-scope="props">
            <div class="option__desc d-flex align-items-center"><span class="option__title mr-2">{{ props.option.text }}</span>
              <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description">
                <i class="icon icon-help i-white" slot="trigger" />
              </Tooltip>
            </div>
          </template>
        </multiselect>
      </div>
    </div>
    <div class="flex-1 d-flex flex-column">
      <div class="flex-1 m-3">
        <label class="d-block mb-2">
          Kategori(er)
        </label>
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
            @input="setCategories">
          <template slot="tag" slot-scope="props">
            <span class="multiselect__tag">
            <span>{{props.option.text.length > 30 ? `${props.option.text.substring(0,30)}...` : props.option.text}}</span>
              <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i></span>
          </template>
          <template slot="option" slot-scope="props">
            <div class="option__desc d-flex align-items-center"><span class="option__title mr-2">{{ props.option.text }}</span>
              <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description">
                <i class="icon icon-help i-white" slot="trigger" />
              </Tooltip>
            </div>
          </template>
        </multiselect>
      </div>
      <div class="flex-1 m-3">
        <label class="d-block mb-2">
          Udbydertype
        </label>
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
            @input="setProviderTypes">
          <template slot="tag" slot-scope="props">
            <span class="multiselect__tag">
            <span>{{props.option.text.length > 30 ? `${props.option.text.substring(0,30)}...` : props.option.text}}</span>
              <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i></span>
          </template>
          <template slot="option" slot-scope="props">
            <div class="option__desc d-flex align-items-center"><span class="option__title mr-2">{{ props.option.text }}</span>
              <Tooltip v-if="props.option.description" trigger="click" :content="props.option.description">
                <i class="icon icon-help i-white" slot="trigger" />
              </Tooltip>
            </div>
          </template>
        </multiselect>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Multiselect from 'vue-multiselect';
import {ProviderTypes, ListItem, Categories, AreaTypes, ServiceTypes} from '@/store/types';
import {mapActions, mapGetters} from "vuex";
import Tooltip from "@/components/Tooltip.vue";

export default {
  name: 'Filters',
  components: {
    Tooltip,
    Multiselect
  },
  data() {
    const providerTypes = Object.keys(ProviderTypes)
        .map((x: string): ListItem => ({ text: ProviderTypes[Number(x)].text, value: x, description: ProviderTypes[Number(x)].description }));
    const categories = Object.keys(Categories)
        .map((x: string): ListItem => ({ text: Categories[Number(x)].text, value: x, description: Categories[Number(x)].description }));
    const areaTypes = Object.keys(AreaTypes)
        .map((x: string): ListItem => ({ text: AreaTypes[Number(x)].text, value: x, description: AreaTypes[Number(x)].description }));
    const serviceTypes = Object.keys(ServiceTypes)
        .map((x: string): ListItem => ({ text: ServiceTypes[Number(x)].text, value: x, description: ServiceTypes[Number(x)].description }));

    return {
      categories: {
        options: categories
      },
      providerTypes: {
        options: providerTypes,
      },
      areaTypes: {
        options: areaTypes,
      },
      serviceTypes: {
        options: serviceTypes,
      }
    }
  },
  computed:{
    ...mapGetters({
      stateProviderTypes: 'getProviderTypes',
      stateAreaTypes: 'getAreaTypes',
      stateCategories: 'getCategories',
      stateServiceTypes: 'getServiceTypes',
    })
  },
  methods: {
    ...mapActions(["setProviderTypes", "setCategories", "setAreaTypes", "setServiceTypes"])
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
#filter-multiselect .multiselect__element {
  ul > li {
    margin-top: 0;
    padding-left: 0;
    line-height: 0;
  }
  ul > li::before {
    display: none;
  }
}
#filter-multiselect .multiselect__element {
  list-style-type: none;
}
#filter-multiselect .multiselect__tag-icon:focus,
#filter-multiselect .multiselect__tag-icon:hover {
  background-color: royalblue;
}
#filter-multiselect .multiselect__tag {
  background-color: blue;
}
#filter-multiselect .multiselect__tags {
  border-radius: 0;
}
#filter-multiselect ul > li {
  margin-top: 0 !important;
  padding-left: 0 !important;
  line-height: 0 !important;
}
#filter-multiselect ul > li::before {
  display: none !important;
}
#filter-multiselect .multiselect__tag-icon:after {
color: white;
}

#filter-multiselect .multiselect__option--selected.multiselect__option--highlight {
  background-color: transparent;
  color: black;
}

#filter-multiselect .multiselect__option--highlight {
  background-color: blue;
}

#filter-multiselect .multiselect__option--highlight .i-white {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(128deg) brightness(102%) contrast(104%);
}

#filter-multiselect .multiselect__option--selected.multiselect__option--highlight .i-white {
  filter: invert(0%) sepia(6%) saturate(0%) hue-rotate(324deg) brightness(91%) contrast(102%);
}

</style>
