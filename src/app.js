const path = require('path')
const express = require('express')

const app = express()
const publicDirPath = path.join(__dirname + '/../public')

app.use(express.static(publicDirPath))
// app.use('help', express.static(publicDirPath))


// app.get('/help', (req, res) => {
//   res.send('No help here')
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'its gonna be hot',
    location: 'dat hot'
  })
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})