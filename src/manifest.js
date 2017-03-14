
import { loadAsset, wrapPromise } from './loaders'

const identity = x => x

export const map = new Map()

export function set (name, options) {
  if (map.has(name)) throw new Error(`asset by the name of ${name} already exists`)

  if (typeof options === 'string') {
    options = {
      url: options
    }
  }

  if (typeof name !== 'string') throw new TypeError(`name required.`)
  if (typeof options.url !== 'string') throw new TypeError(`options.url required.`)
  if (typeof options.resolve !== 'function') options.resolve = identity

  map.set(name, options)
}

export function get (name) {
  const result = map.get(name)
  if (!result) throw new Error(`no asset by the name of ${name}`)

  if (!result.promise) {
    result.promise = wrapPromise(result.resolve(loadAsset(result.url, result.type)))
  }

  return result.promise
}
