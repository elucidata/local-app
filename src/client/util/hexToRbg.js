/**
 * Extract RGB values from a HEX color string.
 * @param {string} color - in HEX
 * @returns {{ r: number, g: number, b: number }}
 */
export function hexToRbg(color) {
  if (color.length == 7) {
    color = color.substr(1);
  }
  return {
    r: parseInt(color.substr(0, 2), 16),
    g: parseInt(color.substr(2, 2), 16),
    b: parseInt(color.substr(4, 2), 16),
  };
}


export default hexToRbg