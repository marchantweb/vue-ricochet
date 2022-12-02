# Getting Started

::: warning
**Vue Ricochet is in alpha release**, and is likely to have breaking changes as development progresses. It is not recommended to use it in production applications at this time.
:::

## Installation

```bash
npm install vue-ricochet
```

Then simply call `app.use(ricochet)` to install before mounting your application. Global options can also be passed using the second parameter.

```js{2,3}
import {createApp} from 'vue'
import ricochet from 'vue-ricochet'
const app = createApp().use(ricochet).mount('#app');
```

Vue Ricochet will available globally in your application, under `this.$ricochet`, although most of the time you will use components/directives to interact with it.

## Adding your first container

### 1. Start with a `<ricochetContainer>`

Using Vue Ricochet, your elements are positioned within containers. Think of a container like a list of DOM elements _(or components)_ you want to draw to the screen.

```html{3,8}
<template>
    
    <ricochetContainer>        
        <!-- Place anything you want here -->
        <div></div>
        <img src="---" alt="My Image" />
        <myCustomVueComponent />     
    </ricochetContainer>
    
</template>
```

::: tip
You can throw in as many elements as you want, nest them multiple levels deep, and have multiple on the same page/view. Elements will be ordered in the order they appear in the DOM, like a fancy flex container.
:::

### 2. Configure how the container lays out the elements

You can pass configuration parameters as a `config` object on the container. To see a list of available options, see the [VueContainer reference](#).

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
                shapeConfig: {                    
                    center: {
                        x: '50%',
                        y: '50%'
                    },
                    radius: '80%',
                },
                anchorElements: 'center center'
            }
        }
    }
}
```

As you can see from this example config above, you can pass any valid CSS value to properties (`px`, `%` `top, left, center, etc.)`. This allows you to position elements in a very flexible way. Vue-ricochet will automatically convert these values to pixels when it positions the elements; making highly-responsive layouts a breeze.
