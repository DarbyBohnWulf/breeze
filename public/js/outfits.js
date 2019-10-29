const outfitsUiController = {
  getOutfitCard: function(outfit) {
    const $card = $('<div>').addClass('card').attr('_id', outfit._id)

    const $ul = $('<ul>')
    outfit.garments.forEach(g => {
      const $garment = $('<li>').text(g.name)
      $ul.append($garment)
    })
    $card.append($ul)

    const $deleteButton = $('<a>').addClass('btn btn-danger').text('Delete')
    $card.append($deleteButton)
    return $card
  },

  getBlankOutfitCard: function() {
    const $card = $('<div>').addClass('card')

    const $ul = $('<ul>').appendTo($card)
    const $addGarmentLi = $('<li>').appendTo($ul)
    const $garmentSelect = $('<select>').appendTo($addGarmentLi)
    //populate options
    apiInterface.getCloset().then((res) => {
      res.forEach(g => {
        const $option = $('<option>').attr('value', g._id).text(g.name).appendTo($garmentSelect)
      })
    })
    const $garmentConfirm = $('<a>').addClass('btn btn-success').text('+').appendTo($addGarmentLi)
    return $card
  }
}

$(document).ready(async () => {
  try {
    const res = await apiInterface.getOutfits()

    res.forEach(o => $('#outfits').append(outfitsUiController.getOutfitCard(o)))
  } catch (err) {
    console.log(err)
  }
})

$('#new').on('click', () => {
  const $blankOutfit = outfitsUiController.getBlankOutfitCard().appendTo('#outfits')
})
