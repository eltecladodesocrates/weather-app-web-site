const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Athos Conde de la Fére'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Athos Conde de la Fére'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'This is a helpful text',
        name: 'Athos conde de la Fére'
    })
})

app.get('/weather', (req, res) => {
    
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address, (error, data) => {

        if (error) {
            return console.log(error)
        } 
        const location = data.location
        weather(data.latitude, data.longitude, data.location, (error, data) => {
            
            if (error) {
                return console.log(error)
                
            }
            res.send({
                location,
                forecast: data
            })
        })
        
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Athos conde de la Fére'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Athos conde de la Fére'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})

