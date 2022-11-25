export default function layoutCircle(elements = [], options = {
    center: {
        x: 0,
        y: 0
    }
}) {
    let output = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const indexAsPercentage = (1 / elements.length) * i;
        output.push({
            x: options.center.x + (Math.cos((360 * indexAsPercentage) * (Math.PI / 180)) * 300) - element.offsetWidth / 2,
            y: options.center.y + (Math.sin((360 * indexAsPercentage) * (Math.PI / 180)) * 300) - element.offsetHeight / 2
        });
    }
    return output;
}
