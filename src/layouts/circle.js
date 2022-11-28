/**
 * Draw a circle with the elements
 * @param elements - The DOM elements to position
 * @param options - The options for the shape
 * @param ricochetContainer - A reference to the specific container
 * @returns {*[]}
 */
export default function layoutCircle(elements = [], options = null, ricochetContainer = null) {

    // Merge in default options
    options = Object.assign({
        center: {
            x: ricochetContainer.containerSize.width / 2,
            y: ricochetContainer.containerSize.height / 2
        },
        radius: ricochetContainer.containerSize.width / 4
    }, options);

    let output = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const indexAsPercentage = (1 / elements.length) * i;
        output.push({
            x: options.center.x + (Math.cos((360 * indexAsPercentage) * (Math.PI / 180)) * options.radius) - element.offsetWidth / 2,
            y: options.center.y + (Math.sin((360 * indexAsPercentage) * (Math.PI / 180)) * options.radius) - element.offsetHeight / 2
        });
    }
    return output;
}
