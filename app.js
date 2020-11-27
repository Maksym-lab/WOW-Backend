var express = require('express');
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
