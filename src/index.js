
import React from 'react'

import { loadScript, loadStylesheet, loadAsset } from './loaders'
import { get, set } from './manifest'

export { get, set, loadScript, loadStylesheet, loadAsset }

export default (Component, assetNames) => (
  class AssetLoader extends Component {
    constructor (props) {
      super(props)

      this.state = {
        assets: {},
        assetsFulfilled: false,
        assetsRejected: false
      }
    }

    // NOTE: does not support changing assets
    componentDidMount () {
      const assets = {}

      const promises = assetNames.map(name => {
        const promise = get(name)
        assets[name] = promise
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
      return (
        <Component {...Object.assign({}, this.props, this.state)} />
      )
    }
  }
)
