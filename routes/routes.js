var players = require('./players');
var appRouter = app => {
  app.use('/players', players);
  app.get("*", function (req, res) {
    res.status(404).send({ message: '404 not found' });
  });
}
module.exports = appRouter;
