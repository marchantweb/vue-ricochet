# 🥏 vue-ricochet
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/marchantweb/vue-ricochet/main?style=flat-square)
![npm](https://img.shields.io/npm/v/vue-ricochet?style=flat-square)

**A lightweight, modern and flexible Vue 3 plugin for creative, responsive object layouts.** It is intended for use in creative programming applications, digital signage
solutions, and other applications where you need to position multiple _(sometimes dynamic)_ elements on the screen in a non-standard way.

![Screen capture of vue-ricochet in action](https://github.com/marchantweb/vue-ricochet/blob/main/cover.gif?raw=true)

## 📦 Installation

```bash
npm install vue-ricochet
```

Then simply call `app.use(ricochet)` to install before mounting your application. Global options can also be passed using the second parameter.

```js
import {createApp} from 'vue'
import ricochet from 'vue-ricochet'

const app = createApp().use(ricochet).mount('#app');
```

Vue-ricochet will available globally in your application, under `this.$ricochet`, although most of the time you will use components/directives to interact with it.

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
                shape: 'circle',
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

### 3. Custom Shape Functions

You can also pass a custom function to the `shape` property, instead of using one of the predefined shape functions. This callback function will be passed all the elements as a parameter, and should return an array of objects with `x` and `y` properties, representing the positions to place those elements at within the container.

Here's an example that takes each element, stacks it horizontally, and set's the vertical height based on a sine wave:

```js
export default {
    data() {
        return {
            config: {
                shape: function(elements = []){
                    let output = [];
                    let sumWidth = 0;
                    for (const element of elements) {
                        output.push({
                            x: sumWidth,
                            y: 300 + (Math.sin(new Date().getTime() / 400) * 100)
                        });
                        sumWidth += element.offsetWidth;
                    }
                    return output;
                }
            }
        }
    }
}
```
