export const typedLocalStorage = {
  /**
   * @param {string} key
   */
  getItem(key) {
    try {
      let value = localStorage.getItem(key);
      if (typeof value == "string") {
        value = JSON.parse(value);
      }
      return value;
    }
    catch (err) {
      console.warn('Local Storage Error:', err)
      return undefined
    }
  },
  /**
   * @param {string} key
   * @param {any} value
   */
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch (err) {
      console.warn('Local Storage Error:', err)
    }
  },
  /**
   * @param {string} key
   */
  removeItem(key) {
    localStorage.removeItem(key);
  },
  /**
   * @param {number} index
   */
  key(index) {
    return localStorage.key(index);
  },
  clear() {
    localStorage.clear();
  },
  get length() {
    return localStorage.length;
  }
};


export default typedLocalStorage;