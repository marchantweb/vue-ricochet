<template>
  <div class="demo-container">

    <ricochetContainer :config="config">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const config = ref({
  shape: 'line',
  shapeParameters: {
    start: {
      x: "10%",
      y: "50%"
    },
    end: {
      x: "90%",
      y: "50%"
    },
  },
  loopElements: true
});

const intervalTimer = ref(null);

onMounted(() => {
  intervalTimer.value = setInterval(() => {
    config.value.shape = config.value.shape === 'line' ? 'circle' : 'line';
  }, 2000);
});

onUnmounted(() => {
  clearInterval(intervalTimer.value);
});

</script>
