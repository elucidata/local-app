export function createSignal() {
  let subscribers = [];
  return {
    subscribe(callback) {
      subscribers.push(callback);
      return () => {
        const index = subscribers.indexOf(callback);
        subscribers.splice(index, 1);
      };
    },
    dispatch(...params) {
      subscribers.forEach(run => run(...params));
    },
    clearListeners() {
      subscribers.length = 0;
    }
  };
}

export default createSignal;

export function createSignalWithMemory() {
  const signal = createSignal();
  let memo = null;
  return {
    subscribe(callback) {
      if (memo != null)
        callback(...memo);
      return signal.subscribe(callback);
    },
    dispatch(...params) {
      memo = params;
      signal.dispatch(...params);
    },
    forget() {
      memo = null;
    },
    clearListeners: signal.clearListeners
  };
}
