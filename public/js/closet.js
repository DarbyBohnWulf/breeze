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
        const $deleteButton = $('<a>').addClass('btn btn-danger').text('Delete')
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

        const $layerSelect = $('<select>')
        $cardBody.append($layerSelect)
        const layerOptions = ['inner', 'mid', 'outer']
        layerOptions.forEach((o) => {
            const $opt = $('<option>').attr('value', o).text(o)
            $layerSelect.append($opt)
        })

        const $weatherSelect = $('<select>')
        $cardBody.append($weatherSelect)
        const weatherOptions = ['wet', 'dry', 'both']
        weatherOptions.forEach((o) => {
            const $opt = $('<option>').attr('value', o).text(o)
            $weatherSelect.append($opt)
        })

        const $saveButton = $('<a>').addClass('btn btn-success').text('Save')
        $cardBody.append($saveButton)
        const $cancelButton = $('<a>').addClass('btn btn-danger').text('Cancel')
        $cardBody.append($cancelButton)

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
    //console.log(e.target.id, e.target.classList)
})

//click on new garment for a category
$('.new-garment').on('click', (e) => {
    const garmentRole = "tops" //TODO: Make this dynamic
    const $garmentTemplate = closetUiController.getBlankGarmentCard()
    $garmentTemplate.insertBefore(`div#${garmentRole} div.new`)
    //:G`
    //TODO: Hide the template
})
