const breeze = require('./breeze')
// const Outfit = require('../models/outfit')
// const describe = require('jest').describe
// const test = require('jest').test

describe('getDummyGarments()', () => {
  test('should return an outfit', async () => {
    const outfit = await breeze.getDummyGarments()
    expect(outfit).toContainEqual(
      expect.objectContaining({
        name: expect.any(String),
        role: expect.any(String),
        layer: expect.any(String),
        precip: expect.any(String)
      })
    )
  })
})

// describe('buildOutfits()', () => {
//   test('should return an outfit', () => {

//   })
// })
