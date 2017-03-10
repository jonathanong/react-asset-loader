
import { cloneElement, Children, Component, PropTypes } from 'react'

import { loadAsset } from './loaders'

// global cache of assets loaded
const AssetMap = new Map()

export default class AssetLoader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      assets: {}
    }
  }

  componentDidMount () {
    this.loadAssets()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.urls !== this.props.urls) {
      this.loadAssets(nextProps.urls)
    }
  }

  loadAssets (urls) {
    const { assets } = this.state
    const changes = {}

    ;(urls || this.props.urls).forEach(url => {
      // already loaded
      if (assets[url]) return

      let promise = AssetMap.get(url)
      if (!promise) {
        promise = loadAsset(url)
        AssetMap.set(url, promise)
      }

      changes[url] = promise
    })

    if (Object.keys(changes).length) {
      this.setState({
        assets: Object.assign({}, assets, changes)
      })
    }
  }

  render () {
    const { props } = this
    const { assets } = this.state

    if (Children.count(props.children) !== 1) {
      throw new Error('Exactly 1 child is allowed.')
    }

    const child = Children.only(props.children)
    return cloneElement(child, {
      assets
    })
  }
}

AssetLoader.AssetMap = AssetMap
AssetLoader.propTypes = {
  urls: PropTypes.array.isRequired
}
