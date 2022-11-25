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
    <h3>
      Ricochet is a lightweight JS library that integrates with VueJS and provides creative options for object positioning. This is a demo page showing some creative uses.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2rem;
}

h3 {
  font-size: 1.2rem;
  margin-top: 20px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
  width: 100%;
  display: block;
}

</style>
