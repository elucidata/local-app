import { hexToRbg } from "./hexToRbg";
/**
 * Returns a light or dark color based on the value of hexcolor.
 * @param {string} hexcolor
 * @returns {string}
 */
export function getContrastYIQ(hexcolor) {
  const { r, g, b } = hexToRbg(hexcolor);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000" : "#fff";
}


export default getContrastYIQ