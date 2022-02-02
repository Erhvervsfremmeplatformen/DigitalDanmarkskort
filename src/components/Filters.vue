<template>
  <div>
    <multiselect
        v-model="value"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :multiple="true"
        :taggable="true"
        @tag="addTag">
    </multiselect>
  </div>
</template>

<script lang="ts">
import Facility from "@/components/Facility.vue";
import Multiselect from 'vue-multiselect'

export default {
  name: "Filters",
  components: {
    Multiselect
  },
  data () {
    return {
      value: [
        { name: 'Javascript', code: 'js' }
      ],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
    }
  },
  methods: {
    addTag (newTag: any) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
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
  background-color: blue;
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
</style>