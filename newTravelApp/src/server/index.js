var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const { response } = require('express')
const root = path.join(__dirname + '../../../build')
const api = require('./api.js')


app.use(cors())

app.use(bodyParser.json())

app.use(express.static(root))

app.use(express.json())


console.log("Root directory is: ", root)

app.get('/', function (req, res) {
    // res.send("This is the Get Route")
})


// All chained together returning arrays inside of one big array

app.post('/post', (req, res)=> {
    const body = req.body
    const place = body[0]
    const date = body[1]
    console.log("Place:", place)
    console.log("date:", date)
    api.getWeather(place).then(data => api.getForecast(data, date)).then(() => api.pixabay(place)).then(() => res.send(api.resendData)).then(api.resendData.splice(0,api.resendData.length))

}
)

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})



