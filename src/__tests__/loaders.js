
import assert from 'assert'

import {
  loadAsset
} from '../loaders'

describe('loadAsset()', () => {
  it('should load stripe.js', async () => {
    const promise = loadAsset('https://js.stripe.com/v2/')
    await promise
    assert(promise.fulfilled)
  })

  it('should load bootstrap.css', async () => {
    const promise = loadAsset('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.css')
    await promise
    assert(promise.fulfilled)
  })
})
