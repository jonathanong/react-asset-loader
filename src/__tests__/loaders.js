
import assert from 'assert'

import {
  loadAsset
} from '../loaders'

describe('loadAsset()', () => {
  it('should load stripe.js', async () => {
    const script = await loadAsset('https://js.stripe.com/v2/')
    assert(script)
  })

  it('should load bootstrap.css', async () => {
    const link = await loadAsset('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.css')
    assert(link)
  })
})
