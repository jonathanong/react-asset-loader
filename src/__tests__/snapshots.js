
import renderer from 'react-test-renderer'
import assert from 'assert'
import React from 'react'

import AssetLoader from '..'

const src = 'https://js.stripe.com/v2/'

it('should load the assets', async () => {
  let component = renderer.create(
    <AssetLoader urls={[src]}>
      <div />
    </AssetLoader>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  assert(tree.props.assets)
  // assert(tree.props.assets[src])
  // assert(!tree.props.assets[src].fulfilled)
  // assert(!tree.props.assets[src].rejected)
  assert(!tree.props.assetsFulfilled)
  assert(!tree.props.assetsRejected)

  await AssetLoader.AssetMap.get(src)
})
