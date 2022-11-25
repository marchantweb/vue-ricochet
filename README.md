# 🥏 vue-ricochet

Ricochet is a lightweight JS library for **creative object positioning in Vue 3**. It is intended for use in creative programming applications, digital signage
solutions, and other applications where you need to position elements on the screen in a creative way.

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

Containers are responsive and fill the width/height of the parent DOM element. They are absolutely positioned, so the parent must have `position: relative` or `position: absolute` set.

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
                unwrapElements: true, // Apply transforms to the elements directly, instead of wrapping them in a div.
            }
        }
    }
}
```
