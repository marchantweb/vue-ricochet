import parseResponsivePosition, {parseResponsiveValue} from "../utils/parseResponsive";

/**
 * Draw a circle with the elements
 * @param config - The config for the shape
 * @param containerSize - The width/height of the container
 * @returns {function(*): {x, y}} - Returns a function that accepts a percentage 0-1 and returns a point on the circle
 * @returns {*[]}
 */
export default function layoutCircle(config = null, containerSize = {width: 0, height: 0}) {

    // Merge in default configuration
    config = Object.assign({
        center: {
            x: "50%",
            y: "50%"
        },
        radius: "40%",
    }, config);

    // Parse responsive configuration values
    config.center = parseResponsivePosition(config.center, containerSize);
    config.radius = parseResponsiveValue(config.radius, Math.min(containerSize.width, containerSize.height));

    /**
     * Return a function that can position a point of any given percentage (0-1) along the circle
     */
    return (percentage) => {
        return {
            x: config.center.x + (Math.cos((360 * percentage) * (Math.PI / 180)) * config.radius),
            y: config.center.y + (Math.sin((360 * percentage) * (Math.PI / 180)) * config.radius)
        };
    }

}
