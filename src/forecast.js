const request = require('request')
require('dotenv').config();


const forecast = (longitude, latitude, location, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`

  request({url: url, json: true}, (error, { body }) => {
    if(error) {
      callback('Could not connect to darksky services', undefined)

    } else if (body.error) {
      callback(`Unable to find weather for ${location}`)

    } else {
      const temp = body.currently.temperature
      const rainChance = body.currently.precipProbability
      const summary = body.currently.summary
      console.log(body.currently)

      callback(undefined, `It is currently ${summary} and ${temp} \xB0F in ${location}. There is a ${rainChance}% chance of rain`)

    }
  })
}


module.exports = forecast