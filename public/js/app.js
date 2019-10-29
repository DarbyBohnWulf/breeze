const apiInterface = {
  URL: "http://localhost:3000/api/garments",
  outfitsURL: "http://localhost:3000/api/outfits",

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
      console.log('in api controller', res)
      return res
    } catch (err) {
      console.log(err)
    }
  }
}
