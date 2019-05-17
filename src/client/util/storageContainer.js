import { createSignal } from "./signals";
import { typedLocalStorage } from "./typedLocalStorage";

export function storageContainer(prefix = 'nta') {
  let knownKeys = typedLocalStorage.getItem(`${prefix}:known-keys`) || [];
  const saveKnownKeys = () => typedLocalStorage.setItem(`${prefix}:known-keys`, knownKeys);
  const changeEvent = createSignal();

  return {
    /** @type {string[]} */
    get keys() { return knownKeys; },
    /**
     * @param {string} key
     * @param {*} defaultValue
     */
    get(key, defaultValue) {
      let value = typedLocalStorage.getItem(`${prefix}-${key}`);
      return value || defaultValue;
    },
    /**
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
      const prevCount = knownKeys.length;
      knownKeys = Array.from(new Set(knownKeys).add(key));
      typedLocalStorage.setItem(`${prefix}-${key}`, value);
      saveKnownKeys();
      if (knownKeys.length != prevCount)
        changeEvent.dispatch(knownKeys);
    },
    /**
     * @param {string} key
     */
    remove(key) {
      const prevCount = knownKeys.length;
      const keySet = new Set(knownKeys);
      keySet.delete(key);
      knownKeys = Array.from(keySet);
      typedLocalStorage.removeItem(`${prefix}-${key}`);
      saveKnownKeys();
      if (knownKeys.length != prevCount)
        changeEvent.dispatch(knownKeys);
    },
    clear() {
      const prevCount = knownKeys.length([...knownKeys]).forEach(key => this.remove(key));
      saveKnownKeys();
      if (knownKeys.length != prevCount)
        changeEvent.dispatch(knownKeys);
    },
    onKeyChange: changeEvent.subscribe
  };
}

export default storageContainer