const bodyParser = require("body-parser")
const express = require('express')
const routes = require("./routes/routes")
const config = require('./config/config');
const { port, limit } =  config.app
var app = express()
app.use(bodyParser.json({ limit }))
routes(app)
app.listen(port, function () {
  console.log('Sanity API listening on port:' + port)
})
