const path = require('path')
const express = require('express')
const app = express()
const request = require('request')

const port = process.env.PORT || 3000


const publicDir = (path.join(__dirname, '../public'))
app.use(express.static(publicDir))
app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist')))




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })

    }
    else {
    
        const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(req.query.address) + '.json?access_token=pk.eyJ1IjoiaGFuc29uYzQiLCJhIjoiY2s5cGxtanNuMGJ0ajNucDluNHJhdGZjZSJ9.wsOy6Iw_i_Znpzwhy9Fxzw&limit=1'

        
        request({ url: url2, json: true }, (error, response) => {

            if (response.body.features.length !== 0) {


                const xy = response.body.features[0].center


                const url = 'http://api.weatherstack.com/current?access_key=41a49f9a390d45ba483ee368864d7e98&query=' + xy[1] + ',' + xy[0]

                request({ url: url, json: true }, (error, response) => {
                    const addr = response.body.location.name + ", " + req.query.address.charAt(0).toUpperCase() + req.query.address.slice(1) + " : " + response.body.current.weather_descriptions
                    const fc = "It is currently " + response.body.current.temperature + " degrees out, there is currently " + response.body.current.precip + "mm of rain"

                    res.send({
                        forecast: fc,
                        location: addr,
                        address: req.query.address
                    })
                })
            }
            else {
                console.log("Error")
                console.log(response.body.features.length)
                res.send({
                    error: 'You must provide a valid location.'
                })
            }
        })

        

    }


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })

    }
    else {
        console.log(req.query.search)
        res.send({
            products: []
        })

    }

    
})

app.listen(port, () => {
console.log('Server is up on ' + port)
})



