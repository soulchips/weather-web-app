const request = require('request')
require('dotenv').config();

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_KEY}&limit=1`

  request({url, json: true}, (error, { body }) => {
    // let errorObj = {
    //   longitude: undefined,
    //   latitude: undefined,
    //   location: undefined
    // }

    if(error) {
      callback('Cannot connect to mapbox services')

    } else if(body.features.length < 1) {
      callback(`Could not find a geolocation for ${body.query}`)

    } else {

      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })

    }
  })
}

module.exports = geocode