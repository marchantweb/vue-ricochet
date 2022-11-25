<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>

    <div class="wrapper">
      <HelloWorld msg="🥏 vue-ricochet"/>
    </div>
  </header>

  <main style="height: 800px; max-height: 90vh; border-radius: 5px; overflow: hidden; background-color: #EDEDED;">
    <ricochet-container>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </ricochet-container>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.block{
  width: 50px;
  height: 50px;
  background-color: hsla(160, 100%, 37%, 1);
  border-radius: 5px;
  border: 2px solid white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    flex-direction: column;
    gap: 40px;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
