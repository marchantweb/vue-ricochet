/**
 * Draw a circle with the elements
 * @param options - The options for the shape
 * @returns {function(*): {x, y}} - Returns a function that accepts a percentage 0-1 and returns a point on the circle
 * @returns {*[]}
 */
export default function layoutCircle(options = null) {

    // Merge in default options
    options = Object.assign({
        center: {
            x: 500,
            y: 400
        },
        radius: 300
    }, options);

    /**
     * Return a function that can position a point of any given percentage (0-1) along the circle
     */
    return (percentage) => {
        return {
            x: options.center.x + (Math.cos((360 * percentage) * (Math.PI / 180)) * options.radius),
            y: options.center.y + (Math.sin((360 * percentage) * (Math.PI / 180)) * options.radius)
        };
    }

}
