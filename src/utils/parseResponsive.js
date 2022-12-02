/**
 * Takes an X/Y relative input, along with the container's width/height, and returns the actual pixel position
 * @param inputPosition {object{x: number | string, y: number | string}}
 * @param containerSize {object{width: number, height: number}}
 * @returns {*}
 */
function parseResponsivePosition(inputPosition = {x: 0, y: 0}, containerSize = {width: 0, height: 0}) {
    return {
        x: parseResponsiveValue(inputPosition.x, containerSize.width),
        y: parseResponsiveValue(inputPosition.y, containerSize.height)
    }
}

/**
 * Takes a relative input, along with the maximum value, and returns the absolute value
 * @param inputValue {number | string}
 * @param maxValue {number}
 * @returns {number}
 */
function parseResponsiveValue(inputValue = 0, maxValue = 0) {
    if (typeof inputValue === 'number') {
        return inputValue;
    }
    if (typeof inputValue === 'string') {
        if (inputValue.indexOf('%') > -1) {
            return (parseFloat(inputValue) / 100) * maxValue;
        }
    }
    return 0;
}

export default parseResponsivePosition;
export {parseResponsiveValue};
