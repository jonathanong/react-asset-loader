
import { cloneElement, Children, Component, PropTypes } from 'react'

import { loadAsset } from './loaders'

// global cache of assets loaded
const AssetMap = new Map()

export default class AssetLoader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      assets: {},
      assetsFulfilled: false,
      assetsRejected: false
    }
  }

  componentDidMount () {
    this.loadAssets(this.props.urls)
  }

  loadAssets (urls) {
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
    const { props, state } = this

    if (Children.count(props.children) !== 1) {
      throw new Error('Exactly 1 child is allowed.')
    }

    const child = Children.only(props.children)

    const passedProps = Object.assign({}, props, state)
    delete passedProps.children

    return cloneElement(child, passedProps)
  }
}

AssetLoader.AssetMap = AssetMap
AssetLoader.propTypes = {
  urls: PropTypes.array.isRequired
}
