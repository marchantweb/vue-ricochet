import parseResponsivePosition, {parseResponsiveValue} from "../utils/parseResponsive";

/**
 * layoutPolyhedron
 *
 * A function that returns x/y positions along a edge of a polyhedron, where the number of sides is passed within the config object.
 *
 * @param {Object} config - configuration object
 * @param {Object} containerSize - object containing width and height of the container
 * @returns {Function} - a function that returns the x/y position of a point at any given percentage along the edge of the polyhedron
 */
export default function layoutPolyhedron(config = null, containerSize = {width: 0, height: 0}) {

    // Merge in default configuration
    config = Object.assign({
        center: {
            x: "50%",
            y: "50%"
        },
        radius: "40%",
        sides: 5
    }, config);

    // Parse responsive configuration values
    config.center = parseResponsivePosition(config.center, containerSize);
    config.radius = parseResponsiveValue(config.radius, Math.min(containerSize.width, containerSize.height));

    /**
     * Return a function that can position a point of any given percentage (0-1) along all edges of the polyhedron
     */
    return (percentage) => {
        return {
            x: config.center.x + (config.radius * Math.cos(Math.PI / 5 + 2 * Math.PI / 5 + 2 * Math.PI * percentage)),
            y: config.center.y + (config.radius * Math.sin(Math.PI / 5 + 2 * Math.PI / 5 + 2 * Math.PI * percentage))
        };
    }

}
