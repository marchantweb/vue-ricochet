<template>
  <canvas :width="containerSize.width" :height="containerSize.height" class="ricochet-canvas canvas__anchors" ref="ricochet-canvas-anchor"/>
  <div class="ricochet-container" ref="ricochetContainer">
    <template v-for="(vnode, index) in $slots.default()" :key="index">
      <!--suppress JSValidateTypes -->
      <component :is="vnode" :ref="'element--' + index" :style="elementStyles[index]"/>
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
import {gsap} from 'gsap';

import layoutChain from "../layouts/chain";
import layoutCircle from "../layouts/circle";
import layoutArc from "../layouts/arc";
import layoutLine from "../layouts/line";

export default {
  props: {
    config: {
      default: {
        shape: 'line',
        shapeOptions: {}
      },
    }
  },
  data() {
    return {
      elements: [],
      layout: null,
      priorLayouts: [],
      changeObserver: null,
      resizeObserver: null,
      resizeElementObserver: null,
      //repositionElements: _.throttle(this._handleReposition, (1000 / this.$ricochet._config.fps), {'trailing': false, 'leading': true}),
      repositionElements: this._handleReposition,
      containerSize: {
        width: 0,
        height: 0
      }
    }
  }
  ,
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
      this.changeObserver.observe(this.$refs['ricochetContainer'], {attributes: false, childList: true, characterData: false, subtree: false});
      this.resizeObserver.observe(this.$refs['ricochetContainer']);
      // Observe each element for resize
      for (const element of this.elements) {
        this.resizeElementObserver.observe(element);
      }
    }
    ,

    /**
     * Position elements in the ricochet container (throttled to the config FPS).
     */
    _handleReposition() {
      if (!this.$refs['ricochetContainer']) {
        return;
      }
      this.elements = [].slice.call(this.$refs['ricochetContainer'].children);
      this.layout = this.calculateLayout(this.config);
    },

    /**
     * Calculate the layout based on a passed configuration.
     * @param config
     * @returns {[]|*}
     */
    calculateLayout(config) {
      if (typeof config.shape === 'function') {
        return config.shape(this.elements);
      }
      if (config.shape === 'circle') {
        return layoutCircle(this.elements, config.shapeOptions, this);
      } else if (config.shape === 'arc') {
        return layoutArc(this.elements, {
          center: {
            x: this.containerSize.width / 2,
            y: this.containerSize.height / 2
          },
          startAngle: 0,
          endAngle: 180,
        });
      } else if (config.shape === 'line') {
        return layoutLine(this.elements, {
          start: {
            x: 50,
            y: 50
          },
          end: {
            x: (this.containerSize.width) - 50,
            y: (this.containerSize.height) - 50
          },
        });
      } else {
        return layoutChain(this.elements);
      }
    },

    /**
     * Handle the resize event.
     */
    updateContainerSize() {
      if (this.$refs['ricochetContainer']) {
        this.containerSize.width = this.$refs['ricochetContainer'].offsetWidth;
        this.containerSize.height = this.$refs['ricochetContainer'].offsetHeight;
      }
    }

  }
  ,
  computed: {

    /**
     * How many elements are in our container?
     * @returns {number}
     */
    elementCount() {
      return this.elements.length;
    }
    ,

    /**
     * Returns an array of styles for each element in the container.
     * @returns {*[]}
     */
    elementStyles() {
      let styles = [];
      if (this.outputLayout && this.elements.length === this.outputLayout.length) {
        for (let i = 0; i < this.elements.length; i++) {
          styles.push({
            position: 'absolute',
            transition: 'none',
            top: 0,
            left: 0,
            'transform': "translate(" + this.outputLayout[i].x + "px, " + this.outputLayout[i].y + "px)",
          });
        }
      }
      return styles;
    },

    /**
     * Outputs the final layout by taking the current layout and blending prior layouts based on their interpolated weight as they exit.
     * @returns {null}
     */
    outputLayout() {
      let blendedLayout = this.layout;
      if (this.priorLayouts.length) {
        this.priorLayouts.forEach((priorLayoutConfig) => {
          this.calculateLayout(priorLayoutConfig).forEach((priorLayout, elementIndex) => {
            blendedLayout[elementIndex].x = blendedLayout[elementIndex].x + ((1 - priorLayoutConfig.exitPercentage) * (priorLayout.x - blendedLayout[elementIndex].x))
            blendedLayout[elementIndex].y = blendedLayout[elementIndex].y + ((1 - priorLayoutConfig.exitPercentage) * (priorLayout.y - blendedLayout[elementIndex].y))
          });
        });
      }
      return blendedLayout;
    },

  }
  ,
  mounted() {
    this.updateContainerSize();
    this.repositionElements();
    this.setupObservers();
  }
  ,
  watch: {

    'config.shape'(newValue, oldValue) {
      this.priorLayouts.push({
        shape: oldValue,
        exitPercentage: 0
      });
      gsap.to(this.priorLayouts[this.priorLayouts.length - 1], {
        exitPercentage: 1,
        duration: 1,
        onUpdate: function () {
          this.repositionElements();
        }.bind(this),
      });
    },

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
