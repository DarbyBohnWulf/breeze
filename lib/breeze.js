const mongoose = require('mongoose')
const Garment = require('../models/garment')

const layers = [ 'inner', 'mid', 'outer' ]
const roles = [
  'top', 'bottom', 'dual', 'head', 'footwear', 'accessory', 'handwear'
]
const colors = [
  'red', 'orange', 'yellow', 'green', 'blue', 'indigo',
  'violet', 'black', 'brown', 'white', 'grey'
]

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

async function buildOutfit(garments,weather=null) {
  try {
    
  } catch (err) {
    
  }
}

async function sortByRole(garments) {
  try {
    // take all garments
    const receivedGarments = garments
    // create object to sort into
    const sortingObject = {}
    // then loop over the received garments
    roles.forEach(r => {
      // and filter them into place on the sortingObject
      sortingObject[r] = receivedGarments.filter(g => {
        return g.role === r
      })
    })
    return sortingObject
  } catch (err) {
    throw(err)
  }
}

async function sortByLayer(garments) {
  try {
    // take all garments
    const receivedGarments = garments
    // create object to sort into
    const sortingObject = {}
    // then loop over the received garments
    layers.forEach(l => {
      // and filter them into place on the sortingObject
      sortingObject[l] = receivedGarments.filter(g => {
        return g.layer === l
      })
    })
    return sortingObject
  } catch (err) {
    throw(err)
  }
}

// for testing
async function getDummyGarments() {
  try {
    const garments = []
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < layers.length; j++) {
        const newGarment = new Garment({
          name: `${getRandomColor()} ${layers[j]} ${roles[i]}`,
          role: roles[i],
          layer: layers[j],
          precip: 'both'
        })
        garments.push(newGarment)
      }
    }
    return garments
  } catch (err) {
    throw(err)
  }
}

async function getOneGarment(color='orange',role='head',layer='mid',precip='both') {
  try {
    const garm = new Garment({
      name: `${color} ${role} ${layer}`,
      role: role,
      layer: layer,
      precip: precip,
    })
    return garm
  } catch (err) {
    throw(err)
  }
}

module.exports = {
  // buildOutfit: buildOutfit,
  getDummyGarments: getDummyGarments,
  sortByRole: sortByRole,
  sortByLayer: sortByLayer,
  getRandomColor: getRandomColor,
  getOneGarment: getOneGarment,
  roles: roles,
  layers: layers,
 }
