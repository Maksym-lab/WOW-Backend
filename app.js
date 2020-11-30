var express = require('express')
var bodyParser = require("body-parser")
var routes = require("./routes/routes.js")
const config = require('./config');
const { port, limit } =  config.app
var app = express()
app.use(bodyParser.json({ limit }))
app.use(bodyParser.urlencoded({ extended: true }))
routes(app)
app.listen(3000, function () {
  console.log('Example app listening on port:' + port)
  console.log(port)
});
