const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/router');
const config = require('../config/config');
const { port, limit } = config.app;
var app = express();
app.use(bodyParser.json({ limit }));
router(app);
const server = app.listen(port, function() {
  console.log('Sanity API listening on port:' + port);
});
function stop() {
  server.close();
}
module.exports = app;
module.exports.stop = stop;
