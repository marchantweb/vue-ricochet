<template>
  <div class="ricochet-container" ref="ricochet-container">
    <template v-for="(vnode, index) in $slots.default()" :key="index">
      <div class="ricochet-container__element">
        <!--suppress JSValidateTypes -->
        <component :is="vnode" :ref="'element--' + index"/>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash';

export default {

  data() {
    return {
      elements: [],
      changeObserver: null,
      resizeObserver: null,
      repositionElements: _.throttle(this._handleReposition, (1000 / this.$ricochet._config.fps), {'trailing': false}),
    }
  },
  methods: {

    /**
     * Position the initial elements, and watch for changes to the DOM.
     */
    setupObservers() {
      this.changeObserver = new MutationObserver(function (mutations) {
        this.repositionElements();
      }.bind(this));
      this.resizeObserver = new ResizeObserver(function (entries) {
        this.repositionElements();
      }.bind(this));
      this.changeObserver.observe(this.$refs['ricochet-container'], {attributes: false, childList: true, characterData: false, subtree: false});
      for (const element of this.elements) {
        this.resizeObserver.observe(element);
      }
    },

    /**
     * Position elements in the ricochet container (throttled to the config FPS).
     */
    _handleReposition() {
      this.elements = this.$el.children;
      let sumWidth = 0;
      let sumHeight = 0;
      for (const element of this.elements) {
        element.style.setProperty("left", (sumWidth) + "px");
        element.style.setProperty("top", (sumHeight) + "px");
        sumWidth += element.offsetWidth;
        sumHeight += element.offsetHeight;
      }
    }

  },
  computed: {

    /**
     * How many elements are in our container?
     * @returns {number}
     */
    elementCount() {
      return this.elements.length;
    }

  },
  mounted() {
    this.repositionElements();
    this.setupObservers();
  },
  beforeDestroy: function () {

    /**
     * Clean-up the change and resize observers
     */
    this.changeObserver.disconnect();
    this.resizeObserver.disconnect();
  }
}
</script>

<style scoped>

.ricochet-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.ricochet-container__element {
  position: absolute;
}

</style>
