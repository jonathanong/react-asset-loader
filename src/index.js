
import React from 'react'

import { loadAsset } from './loaders'

// global cache of assets loaded
export const AssetMap = new Map()

export default (Component, urls) => (
  class AssetLoader extends Component {
    constructor (props) {
      super(props)

      this.state = {
        assets: {},
        assetsFulfilled: false,
        assetsRejected: false
      }
    }

    componentDidMount () {
      this.loadAssets()
    }

    loadAssets () {
      const { assets } = this.state

      const promises = urls.map(url => {
        // already loaded
        let promise = AssetMap.get(url)
        if (!promise) {
          promise = loadAsset(url)
          AssetMap.set(url, promise)
        }
        return promise
      })

      this.setState({
        assets
      })

      return Promise.all(promises).then(() => {
        this.setState({
          assetsFulfilled: true
        })
      }, () => {
        this.setState({
          assetsRejected: true
        })
      })
    }

    render () {
      const props = Object.assign({}, this.props, this.state)
      return (
        <Component {...props} />
      )
    }
  }
)
