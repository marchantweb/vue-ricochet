<template>
  <div class="demo-container">

    <ricochetContainer :config="config">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div style="width: 300px; height: 300px">
        <ricochetContainer :config="{
          shape: 'circle'
        }">
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
        </ricochetContainer>
      </div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </ricochetContainer>

  </div>
</template>

<script>

export default {
  data() {
    return {
      shape: 'line',
      intervalTimer: null,
    }
  },
  computed: {

    /**
     * The configuration of the demo ricochetContainer
     * @returns {{shape: string}}
     */
    config() {
      return {
        shape: this.shape
      }
    }

  },
  mounted: function () {

    /**
     * When mounted, start an interval timer to change the shape of the ricochetContainer
     */
    this.intervalTimer = setInterval(() => {
      this.shape = this.shape === 'line' ? 'circle' : 'line'
    }, 2000);

  },
  beforeDestroy: function () {

    /**
     * When destroyed, clear the interval timer
     */
    clearInterval(this.intervalTimer)

  }
}
</script>
