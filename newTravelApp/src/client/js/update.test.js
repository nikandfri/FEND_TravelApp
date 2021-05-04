
test('Check if DOM is updated for sunset and picture', () => {
    document.body.innerHTML =`<div id="temp">1</div>
    <div src="" id="pic">2</div>
    <div id="depart>3</div>`
    const update = require("./api")
    let sunset = document.getElementById('temp')
    let updatePicture = document.getElementById('pic')

    const data = [["18:00", "06:00"], ["test"], [50], ["pixabay"]]
    update.update(data)
    expect(sunset.innerText).toBe("18:00")
    expect(updatePicture.src).toBe("pixabay")
   
});