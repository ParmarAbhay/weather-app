const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public/imgs')))
app.use(express.static(path.join(__dirname, '../public/javascript')))
app.set('views', path.join(__dirname, '../templates/views'))

const partdir = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partdir)

app.set('view engine', 'hbs')
//app.com
//app.com/help
//app.com/contact
//app.com/about 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhay Parmar'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhay Parmar'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhay Parmar'
    })
})

app.get('/contact', (req, res) => {
    if (!req.query.search) {
        return res.send({
            Error: 'please enter a name'
        })
    }
    console.log(req.query.address)
    res.send([{ name: 'abhay', contact: 78 }, { name: 'abhi', contact: 99 }])
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a location'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send('unable to featch ')
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send(error)
            } else {
                res.send({
                    forecast: forecastdata,
                    location: location,
                    address: req.query.address
                })
            }
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhay Parmar',
        errormsg: 'Help artical not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhay Parmar',
        errormsg: 'page not found'
    })

})
app.listen(port, () => {
    console.log('you server start at ' + port + 'port')
})