import parseResponsivePosition, {parseResponsiveValue} from "../utils/parseResponsive";

export default function layoutSquare(config = null, containerSize = {width: 0, height: 0}) {

    // Merge in default configuration
    config = Object.assign({
        center: {
            x: "50%",
            y: "50%"
        },
        sideLength: "50%",
    }, config);

    // Parse responsive configuration values
    config.center = parseResponsivePosition(config.center, containerSize);
    config.sideLength = parseResponsiveValue(config.sideLength, Math.min(containerSize.width, containerSize.height));

    /**
     * Return a function that can position a point of any given percentage (0-1) around the square
     */
    return (percentage) => {
        const step = Math.floor(percentage / (1 / 4));
        const remainder = percentage % (1 / 4);
        let x, y;

        switch (step) {
            case 0:
                x = config.center.x + (config.sideLength / 2);
                y = config.center.y + (config.sideLength / 2) * remainder;
                break;
            case 1:
                x = config.center.x + (config.sideLength / 2) * (1 - remainder);
                y = config.center.y + (config.sideLength / 2);
                break;
            case 2:
                x = config.center.x - (config.sideLength / 2) * remainder;
                y = config.center.y - (config.sideLength / 2);
                break;
            case 3:
                x = config.center.x - (config.sideLength / 2);
                y = config.center.y - (config.sideLength / 2) * (1 - remainder);
                break;
            default:
                x = config.center.x;
                y = config.center.y;
                break;
        }

        return {
            x,
            y
        };
    }

}
