const request = require('request')

var stdin = process.openStdin();
console.log("Enter your location")

stdin.addListener("data", function(d) {

        d.toString().trim()



const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + d + '.json?access_token=pk.eyJ1IjoiaGFuc29uYzQiLCJhIjoiY2s5cGxtanNuMGJ0ajNucDluNHJhdGZjZSJ9.wsOy6Iw_i_Znpzwhy9Fxzw&limit=1'


	request({ url: url2, json: true }, (error, response) => {
	
		console.log(response.body.features[0].center)
		console.log(response.statusCode)
	const xy = response.body.features[0].center


 const url = 'http://api.weatherstack.com/current?access_key=41a49f9a390d45ba483ee368864d7e98&query=' + xy[1] + ',' + xy[0]

request({ url : url, json : true }, (error, response) =>{
	console.log(response.body.location.name + ": " + response.body.current.weather_descriptions)
	console.log("It is currently "  + response.body.current.temperature + " degrees out, there is a " + response.body.current.precip * 100 + "% chance of rain" )
})
	})

  });






