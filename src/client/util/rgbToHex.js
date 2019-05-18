/**
 * Convert to HEX color string from RGB values.
 * @param {{ r: number, g: number, b: number }} color
 * @returns {string} hex
 */
function rgbToHex(color) {
  const { r, g, b } = color;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default rgbToHex