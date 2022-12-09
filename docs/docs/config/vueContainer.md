# `VueContainer`

Component that wraps DOM elements and accepts parameters to absolutely position them on-screen. All parameters for the
VueContainer element are passed within a single `config` property.

## `config`

At a glance, the configuration property includes the following parameters:

```js
const config = {
    shape: `string|function`,    
    shapeParameters: `object`,
    layout: `string|function`
}
```

### `shape` : _string | function_

What shape function to use to position the elements on the screen. Can pass one of the pre-built shapes, or a custom
function (see [Custom Shape/Layout Callbacks](/guide/custom-callbacks.html)). Defaults to `line`.

#### Possible values:

| Value      | Description                                                                     |
|:-----------|:--------------------------------------------------------------------------------|
| `"line"`   | Draw the elements using the built-in [Line](/config/shapes/line.html) function. |
| `"circle"` | Draw the elements using the built-in [Circle](#) function.                      |
| `"arc"`    | Draw the elements using the built-in [Arc](#) function.                         |
| `()=>{}`   | Use your own [custom function](/guide/custom-callbacks.html).                   |

___

### `shapeParameters` : _object_

An object representing the parameters to send to the chosen shape function. See the reference for the above shape
functions to determine the structure of each of their payloads.

Note that values passed to position/sizing parameters can use regular pixel values, or percentage values that are
relative to this container. For example, if a parameter `width` is set to `50%`, the shape will have a width of 50% of
this container.

___

### `layout` : _string | function_

Instead of using a shape function, you can use a layout function to determine object positions. `layout` is ignored if `shape` is defined, as `shape` is the preferred positioning method.

The key difference is that `layout` functions have access to the actual DOM elements that will be placed, at the expense of some features that are only available to `shape` functions. See [Custom Shape/Layout Callbacks](/guide/custom-callbacks.html) for more information.

#### Possible values:

| Value     | Description                                                   |
|:----------|:--------------------------------------------------------------|
| `"chain"` | Draw the elements using the built-in [Chain](#) function.     |
| `()=>{}`  | Use your own [custom function](/guide/custom-callbacks.html). |

___
