<template>
  <canvas :width="containerSize.width" :height="containerSize.height" class="ricochet-canvas canvas__anchors"
          ref="ricochet-canvas-anchor"/>
  <div class="ricochet-container" ref="ricochetContainer">
    <template v-for="(vnode, index) in $slots.default()">
      <!--suppress JSValidateTypes -->
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
import layoutSquare from "../layouts/square";
import layoutFigureEight from "../layouts/figureEight";
import layoutBezier from "../layouts/bezier";

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
      this.changeObserver = new MutationObserver(function () {
        this._handleReposition();
      }.bind(this));
      this.resizeObserver = new ResizeObserver(function () {
        this.updateContainerSize();
        this._handleReposition();
      }.bind(this));
      this.resizeElementObserver = new ResizeObserver(function () {
        this._handleReposition();
      }.bind(this));
      // Observe the container for changes/resize
      if (this.$refs['ricochetContainer']) {
        this.changeObserver.observe(this.$refs['ricochetContainer'], {
          attributes: false,
          childList: true,
          characterData: false,
          subtree: false
        });
        this.resizeObserver.observe(this.$refs['ricochetContainer']);
      }
      // Observe each element for resize
      for (const element of this.elements) {
        this.resizeElementObserver.observe(element);
      }
    },

    /**
     * Ensure we're always update the DOM should ambient motion exist in the configuration.
     */
    _handleAmbientMotion() {
      if (this.config.loopElements) {
        this._handleReposition();
      }
      window.requestAnimationFrame(this._handleAmbientMotion);
    },

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
      let shapeGenerator = false;

      // List of built-in shape functions
      const shapeFunctionMapping = {
        'line': layoutLine,
        'circle': layoutCircle,
        'arc': layoutArc,
        'square': layoutSquare,
        'figureEight': layoutFigureEight,
        'bezier': layoutBezier
      };

      // List of built-in layout functions
      const layoutFunctionMapping = {
        'chain': layoutChain
      }

      // Look for layout functions
      if (!config.shape) {
        if (config.layout in layoutFunctionMapping) {
          // Return the layout object from the mapping
          return layoutFunctionMapping[config.layout](this.elements);
        } else if (typeof config.layout === 'function') {
          // Return the layout object from user-passed layout
          return config.layout(this.elements);
        }
      }

      // Continue with a shape function
      if (config.shape in shapeFunctionMapping) {
        // Get the shape generator function from the mapping
        shapeGenerator = shapeFunctionMapping[config.shape](config.shapeParameters, this.containerSize);
      } else if (typeof config.shape === 'function') {
        // Get the shape generator function from user-passed shape
        shapeGenerator = config.shape(config.shapeParameters, this.containerSize);
      } else {
        console.error(config);
        throw new Error("Vue Ricochet: Invalid shape function or layout function passed.");
      }

      // Return the layout object from the shape generator
      return this.getLayoutFromShapeGenerator(shapeGenerator, config);
    },

    /**
     * Takes a passed shape generator and applies it to each element in the container.
     * @param shapeGenerator - The callback function to generate a point along the designated shape.
     * @param config - The configuration object for the layout.
     */
    getLayoutFromShapeGenerator(shapeGenerator = () => {
      return false
    }, config = null) {
      const output = [];

      for (let i = 0; i < this.elements.length; i++) {
        const element = this.elements[i];

        // Determine the percentage along the shape to position the element
        // If the configuration uses any looping, or is circular, we leave space at the end for the first element to loop back to.
        let percentage = ((1 / (this.elements.length - (config?.loopElements || config.shape === 'circle' ? 0 : 1))) * i);

        // Handle automatic rotation (looping/wrapping) over time
        if (config?.loopElements) {
          percentage += ((new Date().getTime() % 10000) / 10000);
        }
        if (percentage > 1) {
          percentage -= (~~percentage);
        } else if (percentage < 0) {
          percentage -= (~~percentage - 1);
        }

        // Get the element's X/Y position from the shape generator
        const positionOnShape = shapeGenerator(percentage);

        // Offset the element's position by its anchor point
        positionOnShape["x"] -= this.getElementOffset(element, config)["x"];
        positionOnShape["y"] -= this.getElementOffset(element, config)["y"];

        // Add the position to the output
        output.push(positionOnShape);
      }

      // All done!
      return output;
    },

    getElementOffset(element, config) {

      // Horizontal offset
      let offsetX = element.offsetWidth / 2;
      if (config?.elementAnchor?.includes("left")) {
        offsetX = 0;
      } else if (config?.elementAnchor?.includes("right")) {
        offsetX =  element.offsetWidth;
      }

      // Vertical offset
      let offsetY = element.offsetHeight / 2;
      if (config?.elementAnchor?.includes("top")) {
        offsetY = 0;
      } else if (config?.elementAnchor?.includes("bottom")) {
        offsetY =  element.offsetHeight;
      }

      // All done
      return {
        x: offsetX,
        y: offsetY
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
     * Sets the base configuration options for the ricochet container.
     */
    mergedConfig: function () {
      return {
        ...{
          shape: 'line',
          layout: null,
          shapeParameters: {},
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
     * @returns [{x: number, y: number}]
     */
    outputLayout() {
      let blendedLayout = this.layout;
      if (this.priorLayouts.length) {
        this.priorLayouts.forEach((priorLayoutConfig) => {
          this.calculateLayout(priorLayoutConfig).forEach((priorLayout, elementIndex) => {
            if (blendedLayout[elementIndex]) {
              blendedLayout[elementIndex].x = blendedLayout[elementIndex].x + ((1 - priorLayoutConfig.exitPercentage) * (priorLayout.x - blendedLayout[elementIndex].x))
              blendedLayout[elementIndex].y = blendedLayout[elementIndex].y + ((1 - priorLayoutConfig.exitPercentage) * (priorLayout.y - blendedLayout[elementIndex].y))
            }
          });
        });
      }
      return blendedLayout;
    },

  }
  ,
  mounted() {
    this.updateContainerSize();
    this._handleReposition();
    this.setupObservers();
    window.requestAnimationFrame(this._handleAmbientMotion);
  },
  watch: {

    'config.shape'(newValue, oldValue) {
      if (oldValue) {
        this.priorLayouts.push({
          shape: oldValue,
          exitPercentage: 0
        });
        gsap.to(this.priorLayouts[this.priorLayouts.length - 1], {
          exitPercentage: 1,
          duration: 1,
          onUpdate: function () {
            this._handleReposition();
          }.bind(this),
        });
      }
    },

    'config.layout'(newValue, oldValue) {
      if (oldValue) {
        this.priorLayouts.push({
          layout: oldValue,
          exitPercentage: 0
        });
        gsap.to(this.priorLayouts[this.priorLayouts.length - 1], {
          exitPercentage: 1,
          duration: 1,
          onUpdate: function () {
            this._handleReposition();
          }.bind(this),
        });
      }
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
