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
        this.clothes.forEach((g) => {
            this.addCardToRole(garmentRole, g)
        })
    },

    //Givena role and garment object, creates a card
    //to place in the closet section
    addCardToRole: function(garmentRole, garment) {
        const $card = this.getGarmentCard(garment)
        $(`#${garmentRole}`).append($card)
    },

    //Given a garment object, creates and returns a
    //bootstrap card element
    getGarmentCard: function(garment) {
        const $card = $('<div>').addClass('card garment')

        const $imageCap = $('<img>').addClass('card-img-top')
        $imageCap.attr('src', 'https://picsum.photos/id/461/200/200')
        $imageCap.attr('alt', 'Card image cap')
        $card.append($imageCap)

        const $cardBody = $('<div>').addClass('card-body')
        $card.append($cardBody)

        const $title = $('<h5>').text(garment.name)
        $cardBody.append($title)

        const $garmentAttributes = $('<p>').text(`${garment.role} ${garment.layer} ${garment.precip}`)
        $cardBody.append($garmentAttributes)

        return $card
    },
}

$(document).ready(async () => {
    console.log('document ready') 
    try {
        const userClothes = await apiInterface.getCloset()
        closetUiController.clothes = userClothes
        //update UI here
    } catch (err) {
        console.log(err)
    }
})

$(document).on('click', async (e) => {
    console.log(e.target.id)
})
