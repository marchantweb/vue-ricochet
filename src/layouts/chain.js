export default function layoutChain(elements = [], options = null){
    let output = [];
    let sumWidth = 0;
    let sumHeight = 0;
    for (const element of elements) {
        output.push({
            x: sumWidth,
            y: sumHeight
        });
        sumWidth += element.offsetWidth;
        sumHeight += element.offsetHeight;
    }
    return output;
}
