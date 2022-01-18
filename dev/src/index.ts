/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

/**
* svgWrapText takes an SVGTextElement and number as its arguments. It wraps the SVGTextElement into the number of SVG pixels by adding multiple `<tspan>` elements if required and aligning them correctly.
*
* The return value is void.
*
* @param {SVGTextElement} item - The text item to wrap.
*
* @param {number} width - The wrapping width in SVG pixels.
*
* @param {number} [lineHeight = 1.1] - The line height to use while wrapping the text. Default value is `1.1`.
*
* @returns void
*
*/
function svgWrapText(
  item: SVGTextElement,
  width: number,
  lineHeight: number = 1.1
): void {
  if (item.getComputedTextLength() < width) {
    return;
  }
  const words: string[] = item.textContent?.split(/\s+/).reverse() as string[];
  let word: string;
  let line: string[] = [];
  let lineNumber = 0;
  const x = item.getAttribute('x') ? item.getAttribute('x') as string : item.getBBox().x.toString();
  const y = item.getAttribute('y') ? item.getAttribute('y') as string : item.getBBox().y.toString();
  const dyval: string = item.getAttribute('dy')
    ? (item.getAttribute('dy') as string)
    : '0';
  const value: number = parseFloat(
    (dyval.match(/[0-9.]/) as RegExpMatchArray)[0]
  );
  const units: string = (dyval.match(/[A-Za-z%]+/) as RegExpMatchArray)[0];
  const dy = {
    value: value,
    units: units
  };
  item.textContent = null;
  let tspan: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg','tspan');
  tspan.setAttributeNS('http://www.w3.org/2000/svg','x', x);
  tspan.setAttributeNS('http://www.w3.org/2000/svg','y', y);
  tspan.setAttributeNS('http://www.w3.org/2000/svg','dy', `${dy.value}${dy.units}`);
  item.appendChild(tspan);
  while ((word = words.pop() as string)) {
    line.push(word);
    tspan.textContent = line.join(' ');
    if (tspan.getComputedTextLength() > width) {
      line.pop();
      tspan.textContent = line.join(' ');
      line = [word];
      tspan = document.createElementNS('http://www.w3.org/2000/svg','tspan');
      tspan.setAttributeNS('http://www.w3.org/2000/svg','x',x);
      tspan.setAttributeNS('http://www.w3.org/2000/svg','y',y);
      tspan.setAttributeNS('http://www.w3.org/2000/svg','dx','0');
      tspan.setAttributeNS('http://www.w3.org/2000/svg','dy',`${++lineNumber * lineHeight + dy.value}${dy.units}`);
      tspan.textContent = word;
      item.appendChild(tspan);
    }
  }
}

export default svgWrapText; 