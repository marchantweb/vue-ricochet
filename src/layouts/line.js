import parseResponsivePosition from "../utils/parseResponsive";

/**
 * Draw a line with the elements, from start to end position
 * @param config - The config for the shape
 * @param containerSize - The width/height of the container
 * @returns {function(*): {x, y}} - Returns a function that accepts a percentage 0-1 and returns a point on the line
 */
export default function layoutLine(config = null, containerSize = {width: 0, height: 0}) {

    // Merge in default configuration
    config = Object.assign({
        start: {
            x: "10%",
            y: "10%"
        },
        end: {
            x: "90%",
            y: "90%"
        },
    }, config);

    // Parse responsive configuration values
    config.start = parseResponsivePosition(config.start, containerSize);
    config.end = parseResponsivePosition(config.end, containerSize);

    /**
     * Return a function that can position a point of any given percentage (0-1) along the line
     */
    return (percentage) => {
        return {
            x: (config.start.x + (percentage * (config.end.x - config.start.x))),
            y: (config.start.y + (percentage * (config.end.y - config.start.y)))
        };
    }

}
