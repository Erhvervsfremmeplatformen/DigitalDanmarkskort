<template>
  <div v-on:click.stop.prevent>
    <div class="d-flex" ref="trigger">
      <slot name="trigger"></slot>
    </div>

    <div class="d-flex" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import tippy from 'tippy.js';
import humps from 'humps';

export default {
  name: "Tooltip",
  data: () => {
    return {
      tip: null,
      options: {
        content: String
      }
    }
  },
  props: {
    content: {
      type: String,
      required: true
    },
    toElement: {
      type: String
    },
    toSelector: {
      type: String
    },
    to: {
      type: String
    },
    visible: Boolean
  },
  watch: {
    content() {
      if (this.tip) {
        this.tip.set(this.getOptions());
      }
    },
    visible(val: boolean) {
      if (!this.tip) return;
      if (val) {
        this.tip.show();
      } else {
        this.tip.hide();
      }
    }
  },
  mounted() {
    this.init();
    var that = this;
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        console.log(mutationRecord);
       var t =mutationRecord.target as HTMLElement;
       if(t.classList.contains("multiselect__option--highlight")){
         that.tip.show();
        // console.log("hightligt")
       } else{
         that.tip.hide();
         //console.log("not hig");
       }
        // console.log("changed?")
        // console.log(that.$refs.trigger);
        //that.tip.show();

      });
    });

    var target = that.$refs.trigger;
    if(target) {
      var newTarget = target.closest(".multiselect__option");
      if (newTarget)
        observer.observe(newTarget, {attributes: true, attributeFilter: ['class']});
    }
    
  },
  updated() {
    if (this.tip && !this.content) {
      this.tip.set(this.getOptions());
    }
  },
  beforeDestroy() {
    if (!this.tip) return;
    this.tip.destroy();
  },
  computed: {
    isManualTrigger() {
      return this.options.trigger === "manual";
    }
  },
  methods: {
    init() {
      if (this.tip) {
        try {
          this.tip.destroy();
        } catch (error) { }
        this.tip = null;
      }
      let elm = this.toElement;
      if (elm == null) {
        if (this.to) {
          elm = document.querySelector(`.applikation-container [name='${this.to}']`);
        } else if (this.toSelector) {
          elm = document.querySelector(".applikation-container " + this.toSelector);
        }
        else if (
            this.$refs.trigger &&
            this.$refs.trigger.childElementCount > 0
        ) {
          elm = this.$refs.trigger;
        } else {
          elm = this.$el.parentElement;
        }
      }
      if (!elm) {
        return;
      }
      let tip = tippy(elm, this.getOptions());
      if (!tip) {
        return;
      }
      if (Array.isArray(tip)) {
        if (tip.length > 0) {
          this.tip = tip[0];
        } else {
          return;
        }
      }
      this.tip = tip;
      this.$emit("onCreate", this.tip);
      this.$emit("init", this.tip);

      if (this.isManualTrigger && this.visible === true) {
        this.tip.show();
      }
    },
    getOptions() {
      this.options.content = this.content ? this.content : this.$refs.content;
      Object.assign(this.options, humps.camelizeKeys(this.$attrs));
      return this.options;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/components/_external.scss';
</style>
