const outfitsUiController = {
  getOutfitCard: function(outfit) {
    const $card = $('<div>').addClass('card').attr('id', outfit._id)

    const $name = $('<h5>').text(outfit.name ? outfit.name : 'Outfit of The Day')
    $card.append($name)

    const $ul = $('<ul>')
    outfit.garments.forEach(g => {
      const $garment = $('<li>').text(g.name)
      $ul.append($garment)
    })
    $card.append($ul)

    const $deleteButton = $('<a>').addClass('btn btn-danger delete').text('Delete')
    $card.append($deleteButton)
    return $card
  },

  getBlankOutfitCard: function() {
    const $card = $('<div>').addClass('card').attr('id', 'newOutfit')

    const $ul = $('<ul>').appendTo($card)
    const $addGarmentLi = $('<li>').appendTo($ul)
    const $garmentSelect = $('<select>').appendTo($addGarmentLi)
    //populate options
    apiInterface.getCloset().then((res) => {
      res.forEach(g => {
        const $option = $('<option>').attr('value', g._id).text(g.name).appendTo($garmentSelect)
      })
    })
    const $garmentConfirm = $('<a>').addClass('btn btn-warning').text('+').attr('id', 'addGarment').appendTo($addGarmentLi)
    const $garmentCreate = $('<a>').addClass('btn btn-success').text('Finish Outfit').attr('id', 'finishOutfit').appendTo($card)

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
  const handler = () => {
    const $selected = $($('select option:selected')[0])
    const garment = {
      name: $selected.text(),
      _id: $selected.val()
    }
    //make a list item based on selected garment and prepend
    const $li = $('<li>').text(garment.name).attr('id', garment._id).prependTo($('#newOutfit ul'))
  }

  const finishHandler = () => {
    //grab garment IDs from html (don't select the last element b/c its the selector)
    const garmentIds = $blankOutfit.find('ul li').slice(0,-1).toArray().map(i => i.id)

    //post request using apicontroller
    const newOutfit = {
      //TODO: make it take name from input
      name: 'new outfit' + new Date().toLocaleString(),
      garments: garmentIds,
    }

    apiInterface.createOutfit(newOutfit).then((outfit) => {
      console.dir(outfit)
      const $newOutfit = outfitsUiController.getOutfitCard(outfit)
      $newOutfit.appendTo('#outfits')
      $('#newOutfit').remove()
    }).catch(
      //panic
    )
  }

  $blankOutfit.find('#addGarment').on('click', handler)
  $blankOutfit.find('#finishOutfit').on('click', finishHandler)

  $('#new').css('display', 'none')
})

$('#outfits').on('click', async (e) => {
  if(e.target.classList.contains('delete')) {
    try {
      const outfitId = e.target.parentNode.id
      const deleted = await apiInterface.deleteOutfit({_id: outfitId})
      $(`#${outfitId}`).remove()
    } catch (err) {
      console.log(err)
    }
  }
})
