import logger from './logger'
const log = logger('util/http')

const parseJson = async (/** @type {Response} */ response) => await response.json()

const callFetch = async (/** @type {string} */ url, /** @type {FormData|object} */ data, /** @type {Partial<RequestInfo>} */ options) => {
  if (!!data) {
    if (data instanceof FormData) {
      options.body = data
      options.headers = {
        'Content-Type': 'multipart/form-data', // or maybe: application/x-www-form-urlencoded
        ...(options.headers || {})
      }
    }
    else {
      options.body = JSON.stringify(data)
      options.headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }
  }
  log("Calling fetch with options:", { options })
  return await parseJson(await fetch(url, options))
}

export async function get(/** @type {string} */ url, /** @type {FormData|object} */ data, /** @type {Partial<RequestInfo>} */ options = {}) {
  return await callFetch(url, data, {
    method: 'get',
    ...options
  })
}

export async function put(/** @type {string} */ url, /** @type {FormData|object} */ data, /** @type {Partial<RequestInfo>} */ options = {}) {
  return await callFetch(url, data, {
    method: 'put',
    ...options
  })
}

export async function post(/** @type {string} */ url, /** @type {FormData|object} */ data, /** @type {Partial<RequestInfo>} */ options = {}) {
  return await callFetch(url, data, {
    method: 'post',
    ...options
  })
}

export async function del(/** @type {string} */ url, /** @type {FormData|object} */ data, /** @type {Partial<RequestInfo>} */ options = {}) {
  return await callFetch(url, data, {
    method: 'delete',
    ...options
  })
}

export async function patch(/** @type {string} */ url, /** @type {FormData|object} */ data, /** @type {Partial<RequestInfo>} */ options = {}) {
  return await callFetch(url, data, {
    method: 'patch',
    ...options
  })
}

export default {
  get, post, put, del, patch
}