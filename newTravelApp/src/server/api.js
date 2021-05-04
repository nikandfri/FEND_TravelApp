const axios = require('axios')
const { response } = require('express')
const resendData = []

/**
 * 
 * @param {string}  usually a city name like berlin  
 * @returns {Array} example array ["18:00", "06:00", "cloudy", 50, 40]
 */

const getWeather = async function getWeather (input) {
  console.log("input:", input)
  let response = await axios.get('http://api.geonames.org/postalCodeSearchJSON?placename='+ input + '&maxRows=10&username=nik77')
  let lng = await response.data.postalCodes[0].lng
  let lat = await response.data.postalCodes[0].lat
  console.log("lng", lng)
  console.log("lat", lat)
  let weather = await axios.get('https://api.weatherbit.io/v2.0/current?lat='+lat+'&lon='+lng+'&key=178d2c8264de499db083528e68ec4e2f&include=minutely')
  let sunset = await weather.data.data[0].sunset
  let sunrise = await weather.data.data[0].sunrise
  let current = await weather.data.data[0].weather.description

  let data = [sunset, sunrise, current, lng , lat]
  console.log(data)
  resendData.push(data)
  return data
}



// returns a 16-days forecast 

const getForecast = async function getForecast (data, time) {
  console.log("Data arrived:", data)
  console.log("Reisedatum:", time)
  let date = new Date(Date.parse(time))
  let today = new Date()
  let diffDate = date.getTime() - today.getTime()
  let hours = diffDate * 2.7777777777778e-7
  let days = Math.round(hours/24)
  console.log("Days till departure", days)
  if (days > 16) {
    console.log("Es liegt noch kein Forecast vor")
  } else {
    let response = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily?lat='+data[4] +'&lon='+data[3]+'&key=178d2c8264de499db083528e68ec4e2f&days=16')
    let forecast = await response.data.data
    console.log(forecast)
    resendData.push(forecast)
    resendData.push(days)
    return forecast
  }
}

// important here is that the picture is exported as webFormatURL

const pixabay = async function pixabay (input) {
  let response = await axios.get('https://pixabay.com/api/?key=21036468-74308ccc7b71647d13994d07a&q='+input+'&image_type=photo')
  let picture = await response.data.hits[0].webformatURL
  console.log(picture)
  resendData.push(picture)
  return picture
}

// All async functions are exported here you have to use them in other files with api.function in front

exports.getWeather = getWeather
exports.pixabay = pixabay
exports.getForecast = getForecast
exports.resendData = resendData