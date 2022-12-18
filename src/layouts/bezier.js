import parseResponsivePosition from "../utils/parseResponsive";

/**
 * layoutBezier
 *
 * Returns a function that can position a point of any given percentage (0-1) along a bezier curve
 *
 * @param {Object} config
 * @param {Object} containerSize
 * @return {Function}
 */
export default function layoutBezier(config = null, containerSize = {width: 0, height: 0}) {

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
        c1: {
            x: "80%",
            y: "30%"
        },
        c2: {
            x: "20%",
            y: "70%"
        },
    }, config);

    // Parse responsive configuration values
    config.start = parseResponsivePosition(config.start, containerSize);
    config.end = parseResponsivePosition(config.end, containerSize);
    config.c1 = parseResponsivePosition(config.c1, containerSize);
    config.c2 = parseResponsivePosition(config.c2, containerSize);

    /**
     * Return a function that can position a point of any given percentage (0-1) along the Bézier curve
     */
    return (percentage) => {
        return {
            x: config.start.x * Math.pow(1 - percentage, 3) + 3 * config.c1.x * percentage * Math.pow(1 - percentage, 2) + 3 * config.c2.x * Math.pow(percentage, 2) * (1 - percentage) + config.end.x * Math.pow(percentage, 3),
            y: config.start.y * Math.pow(1 - percentage, 3) + 3 * config.c1.y * percentage * Math.pow(1 - percentage, 2) + 3 * config.c2.y * Math.pow(percentage, 2) * (1 - percentage) + config.end.y * Math.pow(percentage, 3)
        };
    }

}
