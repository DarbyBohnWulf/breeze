const closetUiController = {
    clothes: [],

    populateCategory: function(garmentRole) {
        this.clothes.forEach((g) => {
            this.addGarmentToRole(garmentRole, g)
        })
    },

    //Givena role and garment object, creates a card
    //to place in the closet section
    addGarmentToRole: function(garmentRole, garment) {
        const $card = this.getGarmentCard(garment)
        //$(`#${garmentRole}`).append($card)
        $card.insertBefore(`div#${garmentRole} div.new`)
    },

    //Given a garment object, creates and returns a
    //bootstrap card element
    getGarmentCard: function(garment) {
        const $card = $('<div>').addClass('card garment').attr('id', garment._id)

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
        const $deleteButton = $('<a>').addClass('btn btn-danger delete').text('Delete')
        $cardBody.append($deleteButton)

        return $card
    },

    getBlankGarmentCard: function() {
        const $card = $('<div>').addClass('card garment')

        const $cardBody = $('<div>').addClass('card-body')
        $card.append($cardBody)

        const $title = $('<input>').attr('placeholder', 'Name')
        $cardBody.append($title)

        const $garmentAttributes = $('<p>').text(`layer precipitation`)
        $cardBody.append($garmentAttributes)

        const $layerSelect = $('<select>').attr('id','layer')
        $cardBody.append($layerSelect)
        const layerOptions = ['inner', 'mid', 'outer']
        layerOptions.forEach((o) => {
            const $opt = $('<option>').attr('value', o).text(o)
            $layerSelect.append($opt)
        })

        const $weatherSelect = $('<select>').attr('id', 'precip')
        $cardBody.append($weatherSelect)
        const weatherOptions = ['wet', 'dry', 'both']
        weatherOptions.forEach((o) => {
            const $opt = $('<option>').attr('value', o).text(o)
            $weatherSelect.append($opt)
        })

        const $saveButton = $('<a>').addClass('btn btn-success').text('Save').attr('id', 'save')
        $cardBody.append($saveButton)
        const $cancelButton = $('<a>').addClass('btn btn-danger').text('Cancel')
        $cardBody.append($cancelButton)

        return $card
    },

    getGarmentFromCreateCard: function($garmentCard) {
        const name = $garmentCard.find('input').val()
        const layer = $garmentCard.find('select#layer option:selected').val()
        const precip = $garmentCard.find('select#precip option:selected').val()
        const role = $garmentCard.parent().attr('id')
        return {name, layer, precip, role}
    },
}

$(document).ready(async () => {
    try {
        const userClothes = await apiInterface.getCloset()
        closetUiController.clothes = userClothes
        closetUiController.populateCategory('top')
    } catch (err) {
        console.log(err)
    }
})

$('.scroller').on('click', (e) => {
    //console.log(e.target.id, e.target.classList)
})

//click on new garment for a category
$('.new-garment').on('click', (e) => {

})

//click on save new garment
$('.card-deck').on('click', (e) => {
    //check if clicking on save
    const role = e.currentTarget.id
    if (role !== 'top') {
        console.log(e.currentTarget.id, 'clicked')
        return
    }
    if (e.target.id === 'save') {
        //gather the name, role, layer and precip
        //it will always be the second to last card
        const $newGarmentCard = $(`#${role} div:nth-last-child(2)`)
        const garmentToPost = closetUiController.getGarmentFromCreateCard($newGarmentCard)
        //make the post request, get the card, and delete the card
        apiInterface.createGarment(garmentToPost).then((garment) => {
            closetUiController.addGarmentToRole(role, garment)
            $newGarmentCard.remove()
        }).catch((e) => {
            console.log(e)
        })
    }

    if (e.target.classList.contains('delete')) {
        //get the id of this garment (the card div has id)
        const $clickedCard = $(e.target).parent().parent()
        const garmentId = $clickedCard.attr('id')
        //make an api call to delete
        //delete the card
        apiInterface.deleteGarment({_id: garmentId}).then((deletedGarment) => {
            $clickedCard.remove()
        }).catch((e) => {
            console.log(e)
        })
    }

    if(e.target.classList.contains('new-garment')){
        const $clickedButton = $(e.target)
        const $garmentTemplate = closetUiController.getBlankGarmentCard()
        $garmentTemplate.insertBefore(`div#${role} div.new`)
        //TODO: Hide the new button
        $clickedButton.css('display', 'none')
    }
})
