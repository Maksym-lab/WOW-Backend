var express = require('express');
var models = require('../models');
var router = express.Router();
const config = require('../config/config');
const dayInMilli = 86400000;
if (config.steam.apiKey.length > 0) {
  (function updatePlaytimeTask() {
    models.Player.updatePlaytimes();
    setTimeout(updatePlaytimeTask, dayInMilli);
  })();
}
router.get('/', function(req, res) {
  const params = req.query;
  const id = params.id || req.params.id;
  const { firstName } = params;
  const { lastName } = params;
  const { nickName } = params;
  if (id) {
    try {
      const idInt = Number.parseInt(id);
      return models.Player.findByPk(idInt, { include: [models.Team] }).then(
        players => {
          if (players) {
            return res.status(200).send(players);
          }
          debugger;
          return res.status(404).send('404 not found');
        }
      );
    } catch (err) {
      return res.status(400).send('400 bad requst:' + err);
    }
  }
  router.get('/:id', function(req, res) {
    try {
      const idInt = Number.parseInt(req.params.id);
      return models.Player.findById(idInt, { include: [models.Team] }).then(
        players => {
          if (players) {
            return res.status(200).send(players);
          }
          return res.status(404).send('404 not found');
        }
      );
    } catch (err) {
      return res.status(400).send('400 bad requst:' + err);
    }
  });
  models.Player.findAll().then(players => {
    if (players) {
      return res.status(200).send(players);
    }
    return res.status(404).send('404 not found');
  });
});
module.exports = router;
