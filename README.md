# 🥏 vue-ricochet

Ricochet is a lightweight JS library for **creative object positioning in Vue 3**. It is intended for use in creative programming applications, digital signage
solutions, and other applications where you need to position elements on the screen in a creative way.

## 📦 Installation

```bash
npm install vue-ricochet
```

Then simply call `app.use()` to install, wherever you create the VueJS app.

```js
import {createApp} from 'vue'
import ricochet from 'vue-ricochet'

const app = createApp();

app.use(ricochet, {
    // Global configuration options...
    fps: 30 // Default is 60, here we lower it for example purposes...
});

app.mount('#app');
```

## 🚀 Usage

### `ricochet-container`

**Ricochet** positions elements within containers. Think of a container as a canvas on which you can position elements. You can have multiple containers on a page, it's just a component.

```html

<template>
    <ricochet-container>
        <!-- Elements go here -->
    </ricochet-container>
</template>
```

By default, containers are responsive and fill the width/height of the parent DOM element. You can override this by setting the `width` and `height` props or by using CSS styles/classes.

```html
<ricochet-container width="800" height="600">
    <!-- Elements go here -->
</ricochet-container>
```

You can also pass additional configuration parameters as a `config` object. To see a list of available options, see the [vue-container](#) documentation. These will override any global configuration options.

```html
<ricochet-container :config="config">
    <!-- Elements go here -->
</ricochet-container>
```

```js
export default {
    data() {
        return {
            config: {
                nestElements: true, // Wrap each element in the container in it's own DOM, and apply transformations to that instead.
            }
        }
    }
}
```
