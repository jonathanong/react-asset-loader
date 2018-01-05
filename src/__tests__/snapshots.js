
import renderer from 'react-test-renderer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import assert from 'assert'

import AssetLoader, { get, set } from '..'

set('stripe', 'https://js.stripe.com/v2/')

it('should load the assets', async () => {
  class Child extends Component {
    render () {
      return (
        <div className={this.props.className}>
          <div>{JSON.stringify(this.props.assets)}</div>
          <div>{String(this.props.assetsFulfilled)}</div>
          <div>{String(this.props.assetsRejected)}</div>
        </div>
      )
    }
  }

  Child.propTypes = {
    className: PropTypes.string.isRequired,
    assets: PropTypes.object.isRequired,
    assetsFulfilled: PropTypes.bool.isRequired,
    assetsRejected: PropTypes.bool.isRequired
  }

  const Thing = AssetLoader(Child, [
    'stripe'
  ])

  let component = renderer.create(<Thing className='className' />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  assert.equal('className', tree.props.className)

  const promise = get('stripe')
  assert(promise)
  assert.equal('function', typeof promise.then)
  await promise
  assert(promise.fulfilled)
})
