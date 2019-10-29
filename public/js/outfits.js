const outfitsUiController = {
  getOutfitCard: function(outfit) {
    const $card = $('<div>').addClass('card garment').attr('_id', outfit._id).text('hello world')

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
