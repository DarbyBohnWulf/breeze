const apiInterface = {
  URL: "/api/garments",
  outfitsURL: "/api/outfits",

  //Gets all garments from user's closet and populates
  //closetGarments
  //User should be logged in, or else this may break
  getCloset: async function() {
    try {
      const res = await $.getJSON(`${this.URL}`)
      return res
    } catch (err) {
      console.log(err)
    }
  },

  createGarment: async function(garment) {
    try {
      const res = await $.post(`${this.URL}`, garment)
      return res
    } catch (err) {
      console.log(err)
    }
  },

  //expects a garment with _id field so that server can update
  updateGarment: async function(garment){
    try {
      //Make a post request to domain/api/closet/garmentId?_method=PUT
      const res = await $.post(`${this.URL}/${garment._id}?_method=PUT`, garment)
      return res
    } catch (err) {
      console.log(err)
    }
  },

  deleteGarment: async function(garment){
    try {
      const res = await $.post(`${this.URL}/${garment._id}?_method=DELETE`)
      return res
    } catch (err) {
      console.log(err)
    }
  },

  getOutfits: async function() {
    try {
      const res = await $.getJSON(this.outfitsURL)
      return res
    } catch (err) {
      console.log(err)
    }
  },

  createOutfit: async function(outfit) {
    try {
      const res = await $.post(this.outfitsURL, outfit)
      return res
    } catch (err) {
      console.log(err)
    }
  },

  deleteOutfit: async function(outfit) {
    try {
      const res = await $.post(`${this.outfitsURL}/${outfit._id}?_method=DELETE`)
      return res
    } catch (err) {
      console.log(err)
    }
  },

  getGarment: async function(garmentId) {
    try {
      const garment = await $.get(`${this.URL}/${garmentId}`)
      return garment
    } catch (err) {
      console.error(err)
    }
  }
}
