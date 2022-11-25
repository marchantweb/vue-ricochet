<template>
  <canvas :width="containerSize.width" :height="containerSize.height" class="ricochet-canvas canvas__anchors" ref="ricochet-canvas-anchor"/>
  <div class="ricochet-container" ref="ricochet-container">
    <template v-for="(vnode, index) in $slots.default()" :key="index">
      <!--suppress JSValidateTypes -->
      <component :is="vnode" :ref="'element--' + index"/>
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
      resizeElementObserver: null,
      repositionElements: _.throttle(this._handleReposition, (1000 / this.$ricochet._config.fps), {'trailing': false}),
      containerSize: {
        width: 0,
        height: 0
      }
    }
  },
  methods: {

    /**
     * Setup observers to watch for changes to the container and its children.
     */
    setupObservers() {
      this.changeObserver = new MutationObserver(function (mutations) {
        this.repositionElements();
      }.bind(this));
      this.resizeObserver = new ResizeObserver(function (entries) {
        this.updateContainerSize();
        this.repositionElements();
      }.bind(this));
      this.resizeElementObserver = new ResizeObserver(function (entries) {
        this.repositionElements();
      }.bind(this));
      // Observe the container for changes/resize
      this.changeObserver.observe(this.$refs['ricochet-container'], {attributes: false, childList: true, characterData: false, subtree: false});
      this.resizeObserver.observe(this.$refs['ricochet-container']);
      // Observe each element for resize
      for (const element of this.elements) {
        this.resizeElementObserver.observe(element);
      }
    },

    /**
     * Position elements in the ricochet container (throttled to the config FPS).
     */
    _handleReposition() {
      this.elements = this.$refs['ricochet-container'].children;
      let sumWidth = 0;
      let sumHeight = 0;
      for (const element of this.elements) {
        element.style.setProperty("position", "absolute");
        element.style.setProperty("left", (sumWidth) + "px");
        element.style.setProperty("top", (sumHeight) + "px");
        sumWidth += element.offsetWidth;
        sumHeight += element.offsetHeight;
      }
    },

    /**
     * Handle the resize event.
     */
    updateContainerSize() {
      if (this.$refs['ricochet-container']) {
        this.containerSize.width = this.$refs['ricochet-container'].offsetWidth;
        this.containerSize.height = this.$refs['ricochet-container'].offsetHeight;
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
    this.updateContainerSize();
    this.repositionElements();
    this.setupObservers();
  },
  beforeDestroy: function () {

    /**
     * Clean-up the change and resize observers
     */
    this.changeObserver.disconnect();
    this.resizeElementObserver.disconnect();
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
  width: 100%;
  height: 100%;
  z-index: 1;
}

.ricochet-canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

</style>
