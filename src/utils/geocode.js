const request = require('request')

const geocode = (address, callback) => {
    const urlLocation = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHJwMjk5MSIsImEiOiJjazZxdnZ0b2swMHcxM25ucDdkNTUyZHF5In0.WADybd4pxojlz3CLHcNMqA&limit=1'
    request({ url: urlLocation, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the server', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location, try again', undefined)
        } else {
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }

            callback(undefined, data)
        }
    })
}

module.exports = geocode