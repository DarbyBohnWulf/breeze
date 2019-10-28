const apiInterface = {
    URL: "http://localhost:3000/api/",

    //Gets all garments from user's closet and populates
    //closetGarments
    //User should be logged in, or else this may break
    getCloset: async function() {
        try {
            const res = await $.getJSON(`${this.URL + 'clothes'}`)
            return res
        } catch (err) {
            return([])
        }
    },
}

const closetUiController = {
    clothes: [],

    populateCategory: function(garmentRole) {

    },

    //Givena role and garment object, creates a card
    //to place in the closet section
    addCard: function(garmentRole, garment) {

    },
}

$(document).ready(async () => {
    console.log('document ready') 
    try {
        const userClothes = await apiInterface.getCloset()
        closetUiController.clothes = userClothes
    } catch (err) {
        console.log(err)
    }
})
