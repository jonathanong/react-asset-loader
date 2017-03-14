# @jongleberry/react-asset-loader

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A wrapper component that loads assets for you.
Useful when you need to load external scripts only on certain components.

- Define asset URLs by name.
- Loads assets only once per URL globally.
- Option to add callbacks to asset loads.
- Supports CSS.
- Simplified control flow using promises.

## Example

Define your asset:

```js
import { set } from '@jongleberry/react-asset-loader'

set('stripe', {
  url: 'https://js.stripe.com/v2/',
  // loads this asset in a global <script>
  type: 'js',
  // this logic will happen before the promise resolves
  resolve: x => x.then(() => Stripe.setPublishableKey('pk_test_somestuff'))
})
```

Return a wrapped component:

```js
import AssetLoader from '@jongleberry/react-asset-loader'

import SomeComponent from '../SomeComponent'

export default AssetLoader(Component, [
  'stripe'
])
```

Only show the original component if the Stripe SDK is loaded:

```js
import React, { Component, PropTypes } from 'react'

export default class SomeComponent extends Component {
  static propTypes = {
    assetsFulfilled: PropTypes.bool.isRequired,
  }

  render () {
    if (!this.props.assetsFulfilled) return null

    return (
      <div>Hello world</div>
    )
  }
}
```

## API

### set(name<String>, options<String|Object>)

You need to define all your assets before using the asset loader.

Options are:

- `url` - URL of the asset
- `resolve` - a function to wrap the promise in. Signature: `x => x.then(script => console.log(script))`
- `type` - type of asset, either `js` or `css`

### const WrappedComponent = AssetLoader(Component, [...assetNames])

Wrap a component to load assets by names.
The following properties will be injected into the `Component`'s props:

- `assets<Object>` - `[name]: <Promise>` hash look up
- `assetsFulfilled<Boolean>` - whether all the assets were loaded
- `assetsRejected<Boolean>` - whether one of the assets failed to load

### get(name<String>).then(<DOMElement|?> => {})

Loads the asset, then returns the DOM element.
If you have a `resolve()` option, it will return the result of that instead.

You don't really need to use this. Maybe if you want to "preload" assets.

[npm-image]: https://img.shields.io/npm/v/@jongleberry/react-asset-loader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@jongleberry/react-asset-loader
[travis-image]: https://img.shields.io/travis/jonathanong/react-asset-loader/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/jonathanong/react-asset-loader
[codecov-image]: https://img.shields.io/codecov/c/github/jonathanong/react-asset-loader/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/jonathanong/react-asset-loader
[david-image]: https://img.shields.io/david/jonathanong/react-asset-loader.svg?style=flat-square
[david-url]: https://david-dm.org/jonathanong/react-asset-loader
[license-image]: https://img.shields.io/github/license/jonathanong/react-asset-loader.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@jongleberry/react-asset-loader.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@jongleberry/react-asset-loader
