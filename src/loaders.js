
export const wrapPromise = og => {
  const promise = og.then(val => {
    promise.fulfilled = true
    return val
  }, err => {
    promise.rejected = true
    throw err
  })
  return promise
}

export const loadScript = src => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.onload = () => resolve(script)
  script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
  document.head.appendChild(script)
  return script
})

// <link>s do not support onload apparently
export const loadStylesheet = href => {
  const link = document.createElement('link')
  link.href = href
  link.type = 'stylesheet'
  document.head.appendChild(link)
  return Promise.resolve(link)
}

export const loadAsset = url => {
  if (/\.m?js$/.test(url) || /\bjs\b/.test(url)) return wrapPromise(loadScript(url))
  if (/\.css$/.test(url)) return wrapPromise(loadStylesheet(url))
  throw new Error(`Unknown loader for url: ${url}`)
}
