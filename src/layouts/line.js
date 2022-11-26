export default function layoutLine(elements = [], options = {
    start: {
        x: 0,
        y: 0
    },
    end: {
        x: 0,
        y: 0
    },
}) {
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
