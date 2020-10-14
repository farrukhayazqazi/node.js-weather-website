const request = require('request')


const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.openweathermap.org/data/2.5/find?lat=' + encodeURIComponent(latitude) + '&lon='+ encodeURIComponent(longitude) +'&cnt=50&appid=c530ea95ba130de85feebe34b57c0274&units=metric'



    request({ url, json: true }, (error, response) =>{

        const { list } = response.body

        if(error){
            callback('Unable to connect to the weather services', undefined)
        } else if(list.length === 0){
            callback('Unable to find the forcast! try another search')
        } else{
            callback(undefined, list[0].weather[0].description + '. It is currently '+ list[0].main.temp_max + ' degrees. '+'There is a '+ list[0].clouds.all +'% chance of rain. Humidity: '+list[0].main.humidity)

        }



    })


}

module.exports = forecast