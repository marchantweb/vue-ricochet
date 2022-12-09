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
    </ricochetContainer>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const config = ref({
  shape: 'line',
  shapeParameters: {
    start: {
      x: "5%",
      y: "50%"
    },
    end: {
      x: "95%",
      y: "50%"
    },
  }
});
</script>
