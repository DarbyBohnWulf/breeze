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

async function buildOutfit(sortedGarments,options={ weather: 2, precip: 'both'}) {
  try {
    const outfit = []
    // depending on weather
    let count = options.weather
    let i = 0
    let usedRoles = []
    // add layers
    while (i < count) {
      if (Math.floor(Math.random() * 2)) {
        usedRoles = roles.filter(r => {
          return r !== 'dual'
        })
      } else {
        usedRoles = roles.filter(r => {
          return r !== 'top' && r !== 'bottom'
        })
      }
      usedRoles.forEach(r => {
        // from inside
        const randNum = sortedGarments[r][layers[i]].length > 1
          ? Math.floor(Math.random() * (sortedGarments[r][layers[i]].length + 1))
          : 0
        outfit.push(sortedGarments[r][layers[i]][randNum])
      })
      // to out
      i++
    }
    return outfit.filter(o => {
      return o != undefined
    })
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

async function getSortedGarments(garments) {
  try {
    const roleGroupedGarments = await sortByRole(garments)
    const fullyGroupedGarments = {}
    for (const role in roleGroupedGarments) {
      if (roleGroupedGarments.hasOwnProperty(role)) {
        fullyGroupedGarments[role] = await sortByLayer(roleGroupedGarments[role])
      }
    }
    return fullyGroupedGarments
  } catch (err) {
    throw err
  }
}

function parseWeatherData(rawWeatherData) {
  const parsedData = {}
  if (rawWeatherData.main.temp >= 69) {
    parsedData.weather = 1
  } else if(rawWeatherData.main.temp >= 45) {
    parsedData.weather = 2
  } else {
    parsedData.weather = 3
  }

  if (rawWeatherData.weather[0].id <= 804 && rawWeatherData.weather.id >= 800) {
    parsedData.precip = 'dry'
  } else if (rawWeatherData.weather[0].id <= 622 && rawWeatherData.weather[0].id >= 200) {
    parsedData.precip = 'wet'
  } else {
    parsedData.precip = 'both'
  }
  return parsedData
}

module.exports = {
  buildOutfit: buildOutfit,
  getDummyGarments: getDummyGarments,
  getSortedGarments: getSortedGarments,
  sortByRole: sortByRole,
  sortByLayer: sortByLayer,
  getRandomColor: getRandomColor,
  getOneGarment: getOneGarment,
  parseWeatherData: parseWeatherData,
  roles: roles,
  layers: layers,
 }
