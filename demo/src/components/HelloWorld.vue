<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h2>Absolute positioning library.</h2>
    <h3>
      A lightweight, modern and flexible VueJS plugin for creative, responsive object layouts.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2rem;
}

h2 {
  font-weight: 700;
  font-size: 1.2rem;
}

h3 {
  font-size: 1.1rem;
  margin-top: 20px;
}

h1, h2, h3 {
  text-align: center;
  width: 100%;
  display: block;
}

</style>
