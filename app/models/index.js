'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../../config/config');
const db = {};
const mysqlPassword = process.env.MYSQL_PASSWORD;
if (mysqlPassword.length > 0) {
  config.sequelize.password = mysqlPassword;
}
const mysqlUser = process.env.MYSQL_USER;
if (mysqlUser.length > 0) {
  config.sequelize.username = mysqlUser;
}
const sequelize = new Sequelize(config.sequelize);
const models = fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  );
});
models.forEach(file => {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
