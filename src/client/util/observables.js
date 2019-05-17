import { derived, readable, writable } from 'svelte/store.js'
import { produce } from 'immer'

export const update = produce

/** @type {Computed} */
export function computed(deps, reactor) {
  const source = derived(deps, reactor)
  return {
    subscribe: source.subscribe,
    get snapshot() { return getSnapshot(source) }
  }
}

export function stream(generator, value) {
  const source = readable(generator, value)
  return {
    subscribe: source.subscribe,
    get snapshot() { return getSnapshot(source) }
  }
}

export function getSnapshot(readable) {
  let value
  readable.subscribe((data) => value = data)()
  return value
}

/**
 * Custom 'observable' with snapshot support
 * @param {T} data
 * @param {{ onChange?: any, cached?: boolean }} [options]
 * @template T
 * @returns {Observable<T>}
 */
export function observable(data, options = {}) {
  const store = writable(data);
  let snapshot = data

  function update(fn) { store.update(state => snapshot = produce(state, fn, options.onChange)) }
  function set(data) { store.set(snapshot = data) }

  if (options.cached != false) {
    return {
      update, set,
      subscribe: store.subscribe,
      get snapshot() { return snapshot },
    };
  }
  else {
    return {
      update, set,
      subscribe: store.subscribe,
      get snapshot() { return getSnapshot(store) },
    };
  }
}