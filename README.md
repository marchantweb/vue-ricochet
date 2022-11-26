# 🥏 vue-ricochet

**A lightweight, modern and flexible VueJS plugin for creative, responsive object layouts.** It is intended for use in creative programming applications, digital signage
solutions, and other applications where you need to position multiple _(sometimes dynamic)_ elements on the screen in a non-standard way.

## 📦 Installation

```bash
npm install vue-ricochet
```

Then simply call `app.use()` to install, wherever you create the VueJS app. Global options can also be passed using the second parameter.

```js
import {createApp} from 'vue'
import ricochet from 'vue-ricochet'

const app = createApp();

app.use(ricochet);

app.mount('#app');
```

## 🚀 Getting Started

### 1. Add a `ricochetContainer` to your template

**vue-ricochet** positions elements within containers. Think of a container like a list of DOM elements you want to draw to the screen. Containers support any DOM element you can imagine, including other Vue components. You can have multiple `ricochetContainer` components on a page.

```html

<template>
    
    <ricochetContainer>
        
        <!-- Elements go here -->
        <div class="team-bio"></div>
        <img src="./myimage.jpg" alt="My Image">
        <myCustomVueComponent></myCustomVueComponent>
        
    </ricochetContainer>
    
</template>
```

Containers are responsive and fill the width/height of the parent DOM element. They are absolutely positioned, so the parent must have `position: relative` or `position: absolute` set.

### 2. Configure the `ricochetContainer`

You can pass configuration parameters as a `config` object on the container. To see a list of available options, see the [vueContainer documentation](#).

```html
<ricochetContainer :config="config">
    <!-- Elements go here -->
</ricochetContainer>
```

```js
export default {
    data() {
        return {
            config: {
                type: 'circle',
                radius: '80%',
                center: {
                    x: '50%',
                    y: '50%'
                },
                anchorElements: 'center center'
            }
        }
    }
}
```

As you can see from this example config above, you can pass any valid CSS value to properties (`px`, `%` `top, left, center, etc.)`. This allows you to position elements in a very flexible way. Vue-ricochet will automatically convert these values to pixels when it positions the elements; making highly-responsive layouts a breeze.

### 3. Animating between layouts

You can animate between layouts using the `animateTo()` method. This method accepts a config object as a parameter, and will animate the container to the new layout. You can also pass a duration, easing function, and callback function.

```js
this.$refs.myContainer.animateTo({
    type: 'circle',
    radius: '40%',
    center: {
        x: '50%',
        y: '50%'
    },
    anchorElements: 'center center'
}, 2000, 'easeInOut', () => {
    console.log('We made the circle a little smaller!');
});
```
