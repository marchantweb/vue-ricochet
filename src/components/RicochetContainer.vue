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
export default {
  data() {
    return {
      elements: [],
      changeObserver: null,
      resizeObserver: null,
    }
  },
  methods: {

    /**
     * Position the initial elements, and watch for changes to the DOM.
     */
    initialContainerSetup() {
      this.registerElements();
      this.positionElements();
      this.changeObserver = new MutationObserver(function (mutations) {
        this.registerElements();
        this.positionElements();
      }.bind(this));
      this.resizeObserver = new ResizeObserver(function (entries) {
        console.log("Resize observed");
        this.registerElements();
        this.positionElements();
      }.bind(this));
      this.changeObserver.observe(this.$refs['ricochet-container'], {attributes: false, childList: true, characterData: false, subtree: false});
      for(const element of this.elements){
        this.resizeObserver.observe(element);
      }
    },

    /**
     * Capture the array of vnodes that exist within the container.
     */
    registerElements() {
      this.elements = this.$el.children;
    },

    /**
     * Position elements in the ricochet container
     */
    positionElements() {
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
    this.initialContainerSetup();
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
