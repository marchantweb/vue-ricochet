# Demo

This is a live demo showing Vue Ricochet in action:

<demoComponent />

This demo shows several blocks drawn in a diagonal line automatically, which transition into a circle, and then back into a line. This repeats indefinitely using a basic `setInterval` call.

The configuration to draw a diagonal line, with responsive positioning, would look something like:

```html
<template>

    <ricochetContainer :config="config">
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
        <div class="block"></div>
    </ricochetContainer>

</template>
```

```js
export default {
    data() {
        return {
            config: {
                shape: 'line',
                shapeConfig: {
                    start: {
                        x: "5%",
                        y: "5%"
                    },
                    end: {
                        x: "95%",
                        y: "95%"
                    }
                }
            }
        }
    }
}
```
