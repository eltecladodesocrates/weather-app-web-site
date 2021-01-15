const request = require('request')

const weather = (latitude, longitude, location, callback) => {
    const urlWeather = 'http://api.weatherstack.com/current?access_key=535021dc43c422170ad948488d8a3202&query=' + latitude + ',' + longitude +'&units=f'
    request({ url:urlWeather, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the server', undefined)
        }
        else {
            const temperature = response.body.current.temperature
            callback(undefined, `It is ${temperature} degrees`)
        }
    })
}

module.exports = weather