const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')




const app = express()

const port = process.env.PORT || 3000

// Defining paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) =>{
    res.render('index', {
        title: 'Weather App!',
        name: 'Farrukh Ayaz'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me!',
        name: 'Farrukh Ayaz'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'this is some useful text.',
        title: 'Help',
        name: 'Farrukh Ayaz'
    })
})

app.get('/weather',(req, res) =>{

    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    } //

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

}) //


app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Farrukh Ayaz'
    
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found :/',
        name: 'Farrukh Ayaz'        
    })    
})

app.listen(port, () =>{
    console.log('Server is up and running on port ' + port)
})

