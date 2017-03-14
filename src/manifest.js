
import { loadAsset, wrapPromise } from './loaders'

const identity = x => x

export const map = new Map()

export function set (name, url, resolve) {
  if (map.has(name)) return

  url = url || name
  if (typeof name !== 'string') throw new TypeError(`name required.`)
  if (typeof url !== 'string') throw new TypeError(`url required.`)
  if (typeof resolve !== 'function') resolve = identity

  map.set(name, {
    url,
    resolve
  })
}

export function get (name) {
  const result = map.get(name)
  if (!result) return null

  if (!result.promise) {
    result.promise = wrapPromise(result.resolve(loadAsset(result.url)))
  }

  return result.promise
}
