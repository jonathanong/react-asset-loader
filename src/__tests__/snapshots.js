
import renderer from 'react-test-renderer'
import React from 'react'

import AssetLoader from '..'

it('should pass props', () => {
  const component = renderer.create(
    <AssetLoader className='el' urls={[
      'https://js.stripe.com/v2/'
    ]}>
      <div />
    </AssetLoader>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
