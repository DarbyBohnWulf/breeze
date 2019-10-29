const outfitsUiController = {
  getOutfitCard: function(outfit) {
    const $card = $('<div>').addClass('card garment').attr('_id', outfit._id)

    const $ul = $('<ul>')
    outfit.garments.forEach(g => {
      const $garment = $('<li>').text(g.name)
      $ul.append($garment)
    })
    $card.append($ul)

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
