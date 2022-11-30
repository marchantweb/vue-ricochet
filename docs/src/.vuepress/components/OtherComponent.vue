<template>
  <main style="width: 100%; aspect-ratio: 1.6; border-radius: 5px; overflow: hidden; background-color: #EDEDED;">

    <!-- Start Ricochet Example -->
    <ricochetContainer :config="config">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </ricochetContainer>
    <!-- End Ricochet Example -->

  </main>
</template>

<script setup>
import RicochetContainer from "../../../../src/components/RicochetContainer";
</script>

<script>

export default {
  data() {
    return {
      shape: 'line'
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

  }
}
</script>

<style scoped>

.block {
  width: 30px;
  height: 30px;
  background-color: hsla(160, 100%, 37%, 1);
  border-radius: 5px;
  border: 2px solid white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px 0;
}

.block:nth-child(2n) {
  background-color: #34495E;
}

.block--wide {
  animation: demo-width 4s infinite;
}

.block--tall {
  animation: demo-height 3s infinite;
}

@keyframes demo-width {
  0% {
    width: 30px;
  }
  50% {
    width: 100px;
  }
  0% {
    width: 30px;
  }
}

@keyframes demo-height {
  0% {
    height: 30px;
  }
  50% {
    height: 100px;
  }
  0% {
    height: 30px;
  }
}

</style>
