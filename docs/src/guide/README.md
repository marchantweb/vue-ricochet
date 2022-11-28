# Introduction

**🥏 Vue Ricochet is a lightweight, modern and flexible Vue 3 plugin for creative, responsive object layouts.** It is intended for use in creative programming applications, digital signage
solutions, and other applications where you need to position multiple _(sometimes dynamic)_ elements on the screen in a non-standard way.

![Screen capture of vue-ricochet in action](https://github.com/marchantweb/vue-ricochet/blob/main/cover.gif?raw=true)

## How It Works

At a surface level, Vue Ricochet wraps groups of DOM elements in a parent container, and then applies absolute positioning to those elements. It takes a shape generator function and any passed parameters, and uses the output to determine where to position elements on the X/Y axis.

Under the hood, it's a bit more complex. Multiple mutation and resize observers are established to keep track of each element's size and other attributes, and to reposition elements when anything changes. It parses relative positioning parameters to actual pixel values to allow elements to be responsive to container size changes, and uses `gsap` to animate smoothly between layouts if you choose a different shape.

**Ideally, you say _"I want a circle of `r` radius at `x,y` position"_, and it just works...**

## Features

### Built-in layouts

Vue Ricochet comes with a handful of parameterized layouts (shapes) to get you started:

- [Line](../config/#line)
- [Circle](#)
- [Arc](#)

While deceptively simple, you can build a lot just by using these three shapes and modifying the parameters. You can also stack layouts within other layouts for chained effects.

### Custom shapes

You can also define your own custom shapes by passing a callback function. This allows you to create any shape you can imagine, including complex shapes that are not possible with the basic built-in layouts.
