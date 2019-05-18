/**
 * Set a CSS variable on the documentElement.
 * @param {string} name
 * @param {string} value
 */
export function setCSSVar(name, value) {
  document.documentElement.style.setProperty(name, value);
}

export default setCSSVar