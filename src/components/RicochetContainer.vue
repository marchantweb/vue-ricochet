<template>
  <canvas :width="containerSize.width" :height="containerSize.height" class="ricochet-canvas canvas__anchors" ref="ricochet-canvas-anchor"/>
  <div class="ricochet-container" ref="ricochetContainer">
    <template v-for="(vnode, index) in $slots.default()">
      <component :is="vnode" :ref="'element--' + index" :style="elementStyles[index]"/>
    </template>
  </div>
</template>

<script>
import {gsap} from 'gsap';

import layoutChain from "../layouts/chain";
import layoutCircle from "../layouts/circle";
import layoutArc from "../layouts/arc";
import layoutLine from "../layouts/line";

export default {
  props: {
    config: null,
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
      if (this.$refs['ricochetContainer']) {
        this.changeObserver.observe(this.$refs['ricochetContainer'], {attributes: false, childList: true, characterData: false, subtree: false});
        this.resizeObserver.observe(this.$refs['ricochetContainer']);
      }
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
      this.layout = this.calculateLayout(this.mergedConfig);
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
        const shapeGenerator = layoutCircle();
        return this.calculateObjectPositions(shapeGenerator, config);
      } else if (config.shape === 'arc') {
        const shapeGenerator = layoutArc();
        return this.calculateObjectPositions(shapeGenerator, config);
      } else if (config.shape === 'line') {
        const shapeGenerator = layoutLine();
        return this.calculateObjectPositions(shapeGenerator, config);
      } else {
        return layoutChain(this.elements);
      }
    },

    /**
     * Takes a passed shape generator and applies it to each element in the container.
     * @param shapeGenerator - The callback function to generate a point along the designated shape.
     * @param config - The configuration object for the layout.
     */
    calculateObjectPositions(shapeGenerator = null, config = null) {
      const output = [];
      for (let i = 0; i < this.elements.length; i++) {
        const element = this.elements[i];
        let percentage = ((1 / (this.elements.length - (config?.loopElements || config.shape === 'circle' ? 0 : 1))) * i);
        if (config?.loopElements) {
          percentage += ((new Date().getTime() % 10000) / 10000);
        }
        if (percentage > 1) {
          percentage -= (~~percentage);
        } else if (percentage < 0) {
          percentage -= (~~percentage - 1);
        }
        const positionOnShape = shapeGenerator(percentage);
        if (config?.elementAnchor?.includes("top")) {
          //
        } else if (config?.elementAnchor?.includes("bottom")) {
          positionOnShape.y -= element.offsetHeight;
        } else {
          positionOnShape.y -= (element.offsetHeight / 2);
        }
        if (config?.elementAnchor?.includes("left")) {
          //
        } else if (config?.elementAnchor?.includes("right")) {
          positionOnShape.x -= element.offsetWidth;
        } else {
          positionOnShape.x -= (element.offsetWidth / 2);
        }

        output.push(positionOnShape);
      }
      return output;
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
     * Sets the base configuration options for the ricochet container.
     * @returns {{shape: string, loopElements: boolean, shapeOptions: {}, elementAnchor: string}}
     */
    mergedConfig: function () {
      return {
        ...{
          shape: 'line',
          shapeOptions: {},
          elementAnchor: 'center center',
          loopElements: true,
        },
        ...this.config
      }
    },

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
