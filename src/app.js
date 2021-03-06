const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname + '/../public')
const viewsDirPath = path.join(__dirname + '/../templates/views')
const partialsDirPath = path.join(__dirname + '/../templates/partials')

// Define handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

// Setup Static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Akil Aikman'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Akil Aikman'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help message',
    title: 'Help Page',
    name: 'Akil Aikman'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if(error) {
      return res.send({ error })
    }

    forecast(longitude, latitude, location, (error, forecastResult) => {
      if(error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastResult,
        location,
        address: req.query.address
      })

    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Help article not found',
    title: '404',
    name: 'Akil Aikman'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not found',
    title: '404',
    name: 'Akil Aikman'
  })
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})