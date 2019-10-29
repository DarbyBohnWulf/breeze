console.log('outfits frontend code')

$(document).on('ready', async () => {
  try {
    const res = await apiInterface.getOutfits()
    console.log(res)
  } catch (err) {
    console.log(err)
  }
})
