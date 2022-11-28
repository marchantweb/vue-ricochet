/**
 * Draw a line with the elements, from start to end position
 * @param elements - The DOM elements to position
 * @param options - The options for the shape
 * @param ricochetContainer - A reference to the specific container
 * @returns {*[]}
 */
export default function layoutLine(elements = [], options = null, ricochetContainer = null) {

    // Merge in default options
    options = Object.assign({
        start: {
            x: 50,
            y: 50
        },
        end: {
            x: (ricochetContainer.containerSize.width) - 50,
            y: (ricochetContainer.containerSize.height) - 50
        },
    }, options);

    let output = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const indexAsPercentage = (1 / (elements.length - 1)) * i;
        output.push({
            x: (options.start.x + (indexAsPercentage * (options.end.x - options.start.x))) - element.offsetWidth / 2,
            y: (options.start.y + (indexAsPercentage * (options.end.y - options.start.y))) - element.offsetHeight / 2
        });
    }
    return output;
}
