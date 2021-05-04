const update = async function (result) {
    console.log("Result in update:", result)
  // console.log("Current sunset:", result[0][0])
    // console.log("Current sunrise:", result[0][1])
    // console.log("Current description:", result[0][2])
    // console.log("Days till departure:", result[2])
    // console.log("PictureURL:", result[3])
    let sunset = document.getElementById('temp')
    let updatePicture = document.getElementById('pic')
    let departure = document.getElementById('depart')
    updatePicture.src = result[3].toString()
    sunset.innerText = result[0][0].toString()
    departure.innerText = result[2].toString()

    for (let i = 0; i < 15; i += 1) {
        const LiElements = document.querySelectorAll('li')
        // console.log('Alle LiElemente', LiElements)
        LiElements[i].textContent =
          result[1][i].datetime +
          ' ' +
          result[1][i].weather.description
      }
}



exports.update = update