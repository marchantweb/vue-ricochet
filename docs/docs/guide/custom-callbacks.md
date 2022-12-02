# Custom Shapes/Layouts

You can also pass custom functions to the `shape` property, instead of using one of the predefined functions. There are two ways to do this, using a **shape function** or using a **layout function**.

::: tip
Not sure which type of function to use? **Most of the time you want to use a shape function, unless you need access to DOM attributes** _(size, classes, etc.)_ to determine the output - then use the
layout function.
:::

### Option A: Using a shape function _(recommended)_

A shape function calculates and returns a callback. That callback function should accept a percentage (between `0` and `1`) that represents where on the shape to place an individual element, and
return a position object in the format: `{x: 0, y: 0}`.

Here's an example that draws a line from top-left to bottom-right. For now, we'll ignore the `config` parameter.

```js
export default function diagonalLine(config = null, containerSize = {width: 0, height: 0}) {
    /**
     * Return a function that can position a point of any given percentage (0-1) along the line
     */
    return (percentage) => {
        return {
            x: percentage * containerSize.width,
            y: percentage * containerSize.height
        };
    }
}
```

### Option B: Using a layout function

This callback function will be passed all the elements as a parameter, and should return an array of objects with `x` and `y` properties, representing the positions to place those elements at within
the container.

Here's an example that takes each element and stacks it horizontally and vertically. This requires access to each element's DOM attributes to get the width/height.

```js
export default function (elements = []) {
    let elementPositions = [];
    let sumWidth = 0;
    let sumHeight = 0;

    /**
     * For each element, we're pushing a position object {x,y} to the array.
     */
    for (const element of elements) {
        elementPositions.push({
            x: sumWidth,
            y: sumHeight
        });
        sumWidth += element.offsetWidth;
        sumHeight += element.offsetHeight;
    }
    
    /**
     * A layout function returns an array, not a function.
     */
    return elementPositions;
}
```

::: warning
**Using a layout function disables other post-processing of element positions.** For example, you can't use auto-wrapping or collision detection. It's intended that you always determine the final output positions, that don't get modified further.
:::
