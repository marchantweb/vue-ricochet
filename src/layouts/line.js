/**
 * Draw a line with the elements, from start to end position
 * @param options - The options for the shape
 * @returns {function(*): {x, y}} - Returns a function that accepts a percentage 0-1 and returns a point on the line
 */
export default function layoutLine(options = null) {

    // Merge in default options
    options = Object.assign({
        start: {
            x: 100,
            y: 100
        },
        end: {
            x: 900,
            y: 700
        },
    }, options);

    /**
     * Return a function that can position a point of any given percentage (0-1) along the line
     */
    return (percentage) => {
        return {
            x: (options.start.x + (percentage * (options.end.x - options.start.x))),
            y: (options.start.y + (percentage * (options.end.y - options.start.y)))
        };
    }

}
