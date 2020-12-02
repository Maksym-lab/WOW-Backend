'use strict';
const request = require('request')
const config = require('../config/config');
module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
    steamId: { type: DataTypes.INTEGER, field: 'steam_id' },
    teamId: { type: DataTypes.INTEGER, field: 'team_id' },
    firstName: { type: DataTypes.STRING, field: 'first_name' },
    lastName: { type: DataTypes.STRING, field: 'last_name' },
    nickName: { type: DataTypes.STRING, field: 'nick_name' },
    playtimeMod: { type: DataTypes.INTEGER, field: 'playtime_mod' },
    playtimeSource: { type: DataTypes.INTEGER, field: 'playtime_source' },
    playtimeSandstorm: { type: DataTypes.INTEGER, field: 'playtime_sandstorm' },
  }, { tableName: 'player', timestamps: false });
  Player.associate = function(models) {
    models.Player.belongsTo(models.Team, { foreignKey: 'team_id' });
  };
  Player.updatePlaytime = () => {
    console.warn('updating insurgency playtime')
    try {
      Player.findAll().then((players) => {
        if (players) {
          console.log(`fetching data for ${players.length} players.`)
          players.forEach(async player => {
            if (player.steamId) {
              console.log(`updating ${player.nickName}`)
              await new Promise((resolve) => {
                request.get(`${config.steam.url}?key=${config.steam.apiKey}&format=json&input_json={"appids_filter":[${config.steam.appIdMod},${config.steam.appIdSource},${config.steam.appIdSandstorm}],"steamid":${player.steamId}}`,
                  { json: true },
                  function (error, response, body) {
                    if(!error)
                        resolve(body);
                  }
                )
              }).then(({ response }) => {
                player.update({
                  playtimeMod: response.games.find(a => {return a.appid === 222880}).playtime_forever,
                  playtimeSource: response.games.find(a => {return a.appid === 222880}).playtime_forever,
                  playtimeSandstorm: response.games.find(a => {return a.appid === 222880}).playtime_forever,
                }).then(function(rowsUpdated) {
                })
              })
            } else {
                console.log(`skipping ${player.nickName}`)
            }
          })
        } else {
          console.warn('error no players found')
        }
      })
    } catch (e) {
    }
  }
  return Player;
};
