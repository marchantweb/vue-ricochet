<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'Demo',
  components: {
    HelloWorld
  },
  data() {
    return {
      type: 'line'
    }
  },
  methods: {
    setType(type) {
      this.type = type
    }
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>

    <div class="wrapper">
      <HelloWorld msg="🥏 vue-ricochet"/>
      <div style="margin-top: 20px; width: 100%; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
        <button @click.prevent="setType('line')">Line</button>
        <button @click.prevent="setType('chain')">Chain</button>
        <button @click.prevent="setType('circle')">Circle</button>
        <button @click.prevent="setType('arc')">Arc</button>
      </div>
    </div>
  </header>

  <main style="height: 800px; max-height: 90vh; border-radius: 5px; overflow: hidden; background-color: #EDEDED;">

    <!-- Start Ricochet Example -->
    <ricochetContainer :type="type">
      <div class="block block--wide"></div>
      <div class="block block--wide"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block block--tall"></div>
      <div class="block"></div>
      <h4>This is <strong style="font-weight: bold !important">vue-ricochet</strong>.</h4>
      <div class="block block--wide"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block block--wide"></div>
      <div class="block block--tall"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </ricochetContainer>
    <!-- End Ricochet Example -->

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

@keyframes demo-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
