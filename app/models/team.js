'use strict';
module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define('Team', {
    name: { type: DataTypes.STRING },
    abbreviation: { type: DataTypes.STRING },
    foundingDate: { type: DataTypes.DATE, field: 'founding_date' },
  }, { tableName: 'team', timestamps: false });
  return Team;
};
