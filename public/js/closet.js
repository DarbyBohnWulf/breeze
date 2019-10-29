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
        //TODO: Change this so id isn't broken
        const $card = $('<div>').addClass('card garment').attr('_id', garment._id)

        const $imageCap = $('<img>').addClass('card-img-top')
        $imageCap.attr('src', 'https://picsum.photos/200/200')
        $imageCap.attr('alt', 'Card image cap')
        $card.append($imageCap)

        const $cardBody = $('<div>').addClass('card-body')
        $card.append($cardBody)

        const $title = $('<h5>').text(garment.name)
        $cardBody.append($title)

        const $garmentAttributes = $('<p>').text(`${garment.role} ${garment.layer} ${garment.precip}`)
        $cardBody.append($garmentAttributes)

        const $editButton = $('<a>').addClass('btn btn-primary').text('Edit')
        $cardBody.append($editButton)
        const $deleteButton = $('<a>').addClass('btn btn-danger').text('Delete')
        $cardBody.append($deleteButton)

        return $card
    },
}

$(document).ready(async () => {
    console.log('document ready') 
    try {
        const userClothes = await apiInterface.getCloset()
        closetUiController.clothes = userClothes
        closetUiController.populateCategory('tops')
    } catch (err) {
        console.log(err)
    }
})

$('.scroller').on('click', (e) => {
    console.log(e.target.id, e.target.classList)
})