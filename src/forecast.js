const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f41b620d2be2bd5be05af7246c65c08c&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Weather ' + body.current.weather_descriptions[0] + ' it is currently ' + body.current.temperature + ' degree out. if feel like ' + body.current.feelslike + ' degree out')
        }
    })
}

module.exports = forecast