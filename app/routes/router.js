const sequelize = require('sequelize');
const players = require('./players');
var appRouter = app => {
  app.use('/players', players);
  app.get('*', function(req, res) {
    res.status(404).send({ message: '404 not fun' });
  });
};
module.exports = appRouter;
