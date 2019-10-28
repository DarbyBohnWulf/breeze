const dummyGarments = [
  {
    name: 'greyish button-up',
    role: 'top',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'green tank',
    role: 'top',
    layer: 'inner',
    precip: 'both',
  },
  {
    name: 'orange sweater',
    role: 'top',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'grey boxers',
    role: 'bottom',
    layer: 'inner',
    precip: 'both',
  },
  {
    name: 'red shorts',
    role: 'bottom',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'purple jeans',
    role: 'bottom',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'black ballcap',
    role: 'head',
    layer: 'outer',
    precip: 'dry',
  },
  {
    name: 'orange scarf',
    role: 'head',
    layer: 'inner',
    precip: 'both',
  },
  {
    name: 'brown leather brogues',
    role: 'footwear',
    layer: 'outer',
    precip: 'dry'
  }
]

async function buildOutfit(weather, clothes) {
  try {
    const outfit = await getDummyGarments()
    return outfit
  } catch (err) {
    throw(err)
  }
}

async function getDummyGarments() {
  return dummyGarments
}

module.exports = {
  buildOutfit: buildOutfit,
  getDummyGarments: getDummyGarments
 }
