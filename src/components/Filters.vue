<template>
  <div id="filter-multiselect" class="d-flex flex-1 flex-column flex-lg-row">
    <div class="flex-1 d-flex flex-column">
      <div class="flex-1 m-4">
        <label>
          Område(r)
        </label>
      <multiselect
          v-model="value"
          select-label=""
          tag-placeholder=""
          deselect-label=""
          selected-label=""
          placeholder=""
          label="name"
          track-by="code"
          :options="options"
          :multiple="true"
          :taggable="true"
          @tag="addTag">
      </multiselect>
      </div>
      <div class="flex-1 m-4">
        <label>
          Service
        </label>
        <multiselect
            v-model="value"
            select-label=""
            tag-placeholder=""
            deselect-label=""
            selected-label=""
            placeholder=""
            label="name"
            track-by="code"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag">
        </multiselect>
      </div>
    </div>
    <div class="flex-1 d-flex flex-column">
      <div class="flex-1 m-4">
        <label>
          Kategori(er)
        </label>
        <multiselect
            v-model="value"
            select-label=""
            tag-placeholder=""
            deselect-label=""
            selected-label=""
            placeholder=""
            label="name"
            track-by="code"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag">
        </multiselect>
      </div>
      <div class="flex-1 m-4">
        <label>
          Udbydertype
        </label>
        <multiselect
            v-model="value"
            select-label=""
            tag-placeholder=""
            deselect-label=""
            selected-label=""
            placeholder=""
            label="name"
            track-by="code"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag">
        </multiselect>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Facility from '@/components/Facility.vue';
import Multiselect from 'vue-multiselect';

export default {
  name: 'Filters',
  components: {
    Multiselect
  },
  data() {
    return {
      value: [
        { name: 'Javascript', code: 'js' }
      ],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
    };
  },
  methods: {
    addTag(newTag: any) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      };
      this.options.push(tag);
      this.value.push(tag);
    }
  }
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
color: ghostwhite;
}
</style>
