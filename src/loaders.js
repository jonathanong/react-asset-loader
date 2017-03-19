
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
export const loadStylesheet = href => new Promise((resolve, reject) => {
  const link = document.createElement('link')
  link.href = href
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.onload = () => resolve(link)
  link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`))
  document.head.appendChild(link)
})

export const isJS = (url, type) => {
  return type === 'js' || /\.m?js$/.test(url) || /\bjs\b/.test(url)
}

export const isCSS = (url, type) => {
  return type === 'css' || /\.css$/.test(url) || /\bcss\b/.test(url)
}

export const loadAsset = (url, type) => {
  if (isJS(url, type)) return loadScript(url)
  if (isCSS(url, type)) return loadStylesheet(url)
  throw new Error(`Unknown loader for url: ${url}`)
}
