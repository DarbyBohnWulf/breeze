const breeze = require('./breeze')
const mongoose = require('mongoose')

let garmentMatcher

beforeAll(async () => {
  garmentMatcher = {
    _id: expect.anything(), // TODO: figure out how to test for ObjectId
    name: expect.any(String),
    role: expect.any(String),
    layer: expect.any(String),
    precip: expect.any(String),
  }
})

describe('getRandomColor()', () => {
  test('should return a color from breeze.colors', () => {
    const colorRegEx = /red|orange|yellow|green|blue|indigo|violet|black|brown|white|grey/
    const color = breeze.getRandomColor()
    expect(color).toEqual(expect.stringMatching(colorRegEx))
  })
})

describe('getDummyGarments()', () => {
  test('should return an array of garments', async () => {
    const garments = await breeze.getDummyGarments()
    garments.forEach(g => {
      expect(g).toEqual(expect.objectContaining(garmentMatcher))
    })
  })
})

describe('sortByRole()', () => {
  test('should return an object with keys of arrays for each role received', async () => {
    const garments = await breeze.getDummyGarments()
    const roleSortedGarments = await breeze.sortByRole(garments)
    breeze.roles.forEach(r => {
      expect(roleSortedGarments[r]).toContainEqual(expect.objectContaining({
        _id: expect.anything(),
        name: expect.any(String),
        role: expect.stringMatching(`${r}`),
        layer: expect.any(String),
        precip: expect.any(String),
      }))
    })
  })
})

describe('sortByLayer()', () => {
  test('should return an object with keys of arrays for each layer received', async () => {
    const garments = await breeze.getDummyGarments()
    const layerSortedGarments = await breeze.sortByLayer(garments)
    breeze.layers.forEach(l => {
      expect(layerSortedGarments[l]).toContainEqual(expect.objectContaining({
        _id: expect.anything(),
        name: expect.any(String),
        role: expect.any(String),
        layer: expect.stringMatching(`${l}`),
        precip: expect.any(String),
      }))
    })
  })
})

describe('getSortedGarments()', () => {
  test('should return an object with keys of roles and values of layer-grouped arrays', async () => {
    const garments = await breeze.getDummyGarments()
    const sortedGarments = await breeze.getSortedGarments(garments)
    breeze.roles.forEach(r => {
      expect(sortedGarments).toHaveProperty(r, expect.objectContaining({
        inner: expect.any(Array),
        mid: expect.any(Array),
        outer: expect.any(Array),
      }))
    })
  })
})

describe('buildOutfit()', () => {
  test('should return an outfit', async () => {
    const garments = await breeze.getDummyGarments()
    const sortedGarments = await breeze.getSortedGarments(garments)
    const builtOutfit = await breeze.buildOutfit(sortedGarments)
    expect(builtOutfit).toContainEqual(expect.objectContaining(garmentMatcher))
  })
})
