export default function layoutArc(elements = [], options = {
    center: {
        x: 0,
        y: 0
    },
    startAngle: 0,
    endAngle: 180,
}) {
    let output = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const indexAsPercentage = (1 / (elements.length - 1)) * i;
        const arcDegrees = options.endAngle - options.startAngle;
        output.push({
            x: options.center.x + (Math.cos(((arcDegrees * indexAsPercentage) + options.startAngle) * (Math.PI / 180)) * 300) - element.offsetWidth / 2,
            y: options.center.y + (Math.sin(((arcDegrees * indexAsPercentage) + options.startAngle) * (Math.PI / 180)) * 300) - element.offsetHeight / 2
        });
    }
    return output;
}
