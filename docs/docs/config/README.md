---
sidebar: auto
---

# Config

## Built-in shape functions

### Line

**The line shape function takes the elements within the container and lays them out in a line, in any direction.** While this may be overkill for horizontal/vertical layouts, it can be useful for laying out elements in a diagonal line, or transition elements from a regular stack into a different shape.

<demoLine />

The configuration for a line only requires a `start` and `end` point, which looks like this:

@[code{23-36} js](@demo/demoLine.vue)

As you can see, the line `start` and `end` parameters support responsive values, which are relative to the container width/height. This means that you can use the same configuration for different screen sizes, and the line will adjust accordingly.
