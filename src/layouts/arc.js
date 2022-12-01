/**
 * Draw a circle with the elements
 * @param options - The options for the shape
 * @returns {function(*): {x, y}} - Returns a function that accepts a percentage 0-1 and returns a point on the arc
 * @returns {*[]}
 */
export default function layoutArc(options = null) {

    // Merge in default options
    options = Object.assign({
        center: {
            x: 500,
            y: 400
        },
        radius: 300,
        startAngle: 90,
        endAngle: 270,
    }, options);

    /**
     * Return a function that can position a point of any given percentage (0-1) along the arc
     */
    return (percentage) => {
        const arcDegrees = options.endAngle - options.startAngle;
        return {
            x: options.center.x + (Math.cos(((arcDegrees * percentage) + options.startAngle) * (Math.PI / 180)) * options.radius),
            y: options.center.y + (Math.sin(((arcDegrees * percentage) + options.startAngle) * (Math.PI / 180)) * options.radius)
        };
    }

}
