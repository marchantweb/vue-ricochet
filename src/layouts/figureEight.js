import parseResponsivePosition, {parseResponsiveValue} from "../utils/parseResponsive";

export default function layoutFigureEight(config = null, containerSize = {width: 0, height: 0}) {

    // Merge in default configuration
    config = Object.assign({
        center: {
            x: "50%",
            y: "50%"
        },
        radius: "25%",
        scale: 2,
    }, config);

    // Parse responsive configuration values
    config.center = parseResponsivePosition(config.center, containerSize);
    config.radius = parseResponsiveValue(config.radius, Math.max(containerSize.width, containerSize.height));

    /**
     * Return a function that can position a point of any given percentage (0-1) around the figure eight
     */
    return (percentage) => {
        const angle = (percentage * (2 * Math.PI));
        return {
            x: (config.center.x + (Math.cos(angle * config.scale) * config.radius)),
            y: (config.center.y + (Math.sin(angle) * config.radius))
        };
    }

}
