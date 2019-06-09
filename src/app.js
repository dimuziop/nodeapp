const request = require('request')
const yargs = require('yargs')

const tempInCelcius = (tempInFarenheit) => Math.round(((tempInFarenheit - 32) * 5/9) * 100) / 100

const getMyWheather = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/e97bc9a6a0fd1cb83bb2506dc8e8c670/${lat},${long}?lang=es`
  request({url: url, json: true}, (error, response) => {
    if (error) {
      console.log('Unable to connect to the service')
      callback(false)
    }

    if ( response.statusCode !== 200 ) {
      console.log(response.body.message)
      callback(false)
    }

    if (response.body == null) {
      console.log('EPIC FAIL')
      callback(false)
    }
    let currentMeteorologicStatus = response.body.currently
    //console.log(currentMeteorologicStatus);
    let daialyStatus = response.body.daily.data[0].summary
    let celciusTemp = tempInCelcius(currentMeteorologicStatus.temperature)
    let precipProbability = currentMeteorologicStatus.precipProbability
    callback(`${daialyStatus} It is a currently ${celciusTemp}°C out. There is a ${precipProbability}% chance to rain`)
  })

}

const getTheLocation  = (location, callback) => {

  const locate = encodeURI(location)
  const urlLocation = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locate}.json?access_token=pk.eyJ1IjoiZGltdXppb3AiLCJhIjoiY2p3bzBkcWh5MGlhcTQ5bzZ6dHEyZzVpayJ9.sNI5xBvhqKo7gylakOoLKg&limit=1`
  request({url: urlLocation, json: true}, (error, response) => {
    if (error) {
      console.log('Unable to connect to the service')
      return
    }

    if ( response.statusCode !== 200 ) {
      console.log(response.body.message)
      return
    }

    let geoLocation = response.body.features[0].center
    let lat = geoLocation[1]
    let long = geoLocation[0]
    getMyWheather(lat, long, (message) => {
      if (!message) {
        console.log('EPIC FAIL')
        return false
      }
      message = `For the ${lat} of latitude and ${long} of longitude ${message}`
      callback(message)
    })
  })
}


yargs.command({
  command: 'getWeather',
  describe: 'Get the weather for you location',
  builder: {
    location: {
      describe: 'Location',
      demandOption: true,
      type: 'string'
    },
  },
  handler: (argv) => {

    getTheLocation(argv.location, (data) => {
      console.log(data)
    })
  }
});
yargs.parse();



