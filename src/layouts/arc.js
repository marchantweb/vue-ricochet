import parseResponsivePosition, {parseResponsiveValue} from "../utils/parseResponsive";

/**
 * Draw a circle with the elements
 * @param config - The config for the shape
 * @param containerSize - The width/height of the container
 * @returns {function(*): {x, y}} - Returns a function that accepts a percentage 0-1 and returns a point on the arc
 * @returns {*[]}
 */
export default function layoutArc(config = null, containerSize = {width: 0, height: 0}) {

    // Merge in default configuration
    config = Object.assign({
        center: {
            x: "50%",
            y: "50%"
        },
        radius: "30%",
        startAngle: "30%",
        endAngle: "90%",
    }, config);

    // Parse responsive configuration values
    config.center = parseResponsivePosition(config.center, containerSize);
    config.radius = parseResponsiveValue(config.radius, Math.min(containerSize.width, containerSize.height));
    config.startAngle = parseResponsiveValue(config.startAngle, 360);
    config.endAngle = parseResponsiveValue(config.endAngle, 360);

    /**
     * Return a function that can position a point of any given percentage (0-1) along the arc
     */
    return (percentage) => {
        const arcDegrees = config.endAngle - config.startAngle;
        return {
            x: config.center.x + (Math.cos(((arcDegrees * percentage) + config.startAngle) * (Math.PI / 180)) * config.radius),
            y: config.center.y + (Math.sin(((arcDegrees * percentage) + config.startAngle) * (Math.PI / 180)) * config.radius)
        };
    }

}
