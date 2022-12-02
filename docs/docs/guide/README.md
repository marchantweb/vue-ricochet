---
# NavLink
next:
    text: Get Started / Installation
    link: /guide/getting-started.html
---

# Introduction

#### **🥏 Vue Ricochet is a lightweight, modern and flexible Vue 3 plugin for responsive object layouts.**

It's open source and completely free to use. It is intended for use in creative programming applications, digital signage solutions, and other applications where you need to position multiple dynamic elements on the screen in a non-standard way.

![Screen capture of vue-ricochet in action](https://github.com/marchantweb/vue-ricochet/blob/main/cover.gif?raw=true)

::: warning
**Vue Ricochet is in alpha release**, and is likely to have breaking changes as development progresses. It is not recommended to use it in production applications at this time.
:::

## How It Works

At a surface level, Vue Ricochet wraps groups of DOM elements in a parent container, and then applies absolute positioning to those elements. It takes a shape generator function and any passed parameters, and uses the output to determine where to position elements on the X/Y axis.

Under the hood, it's a bit more complex. Multiple mutation and resize observers are established to keep track of each element's size and other attributes, and to reposition elements when anything changes. It parses relative positioning parameters to actual pixel values to allow elements to be responsive to container size changes, and uses `gsap` to animate smoothly between layouts if you choose a different shape.

**Ideally, you say _"I want a circle of `r` radius at `x,y` position"_, and it just works...**

## Features

### Quickly position elements using built-in shapes

Vue Ricochet comes with a handful of _"shape functions"_ to get you started:

- [Line](../config/#line)
- [Circle](#)
- [Arc](#)

While deceptively simple, you can build a lot just by using these shapes and modifying the parameters. You can also stack layouts within other layouts for nested effects, and modify shapes on-the-fly to transition smoothly between them.

Shape parameters, such as position, radius, angles, etc. can be passed using either fixed values (`px`) or using relative values such as `50%`. For an example, a circle might be placed with a center position of `{x: "50%", y: "50%"}` and a radius of `40%`. Vue Ricochet will calculate those values based on the dimensions of the container.

### Build your own custom shapes and layouts

Vue Ricochet supports both custom shape functions and custom layouts. A shape function returns a callback to position an element anywhere along the shape, whereas a layout function explicitly places each element _(often based on its own properties: width, height, etc.)_
