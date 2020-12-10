"use strict";
const request = require("request");
const rp = require("request-promise-native");
const config = require("../config/config");
const appIDMod = 17700;
const appIDSource = 222880;
const appIDSandstorm = 581320;
module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define(
    "Player",
    {
      steamId: { type: DataTypes.INTEGER, field: "steam_id" },
      teamId: { type: DataTypes.INTEGER, field: "team_id" },
      firstName: { type: DataTypes.STRING, field: "first_name" },
      lastName: { type: DataTypes.STRING, field: "last_name" },
      nickName: { type: DataTypes.STRING, field: "nick_name" },
      playtimeMod: { type: DataTypes.INTEGER, field: "playtime_mod" },
      playtimeSource: { type: DataTypes.INTEGER, field: "playtime_source" },
      playtimeSandstorm: {
        type: DataTypes.INTEGER,
        field: "playtime_sandstorm"
      }
    },
    {
      tableName: "player",
      timestamps: false
    }
  );
  Player.associate = function(models) {
    models.Player.belongsTo(models.Team, { foreignKey: "team_id" });
  };
  Player.updatePlaytime = async player => {
    const options = {
      uri:
        'http:
        `key=${config.steam.apiKey}&` +
        'format=json&input_json={' +
          `"appids_filter":[${appIDMod},${appIDSource},${appIDSandstorm}],` +
          `"steamid":${player.steamId}` +
        '}',
      method: "GET",
      json: true
    };
    const response = await rp(options)
      .then(body => body.response)
      .catch(err => {
        console.error(err);
      });
    if (response.games) {
      const columns = {};
      const playtimeMod = response.games.find(game => game.appid === appIDMod);
      const playtimeSource = response.games.find(game => game.appid === appIDSource);
      const playtimeSandstorm = response.games.find(game => game.appid === appIDSandstorm);
      if (playtimeMod) {
        columns.playtimeMod = playtimeMod.playtime_forever;
      }
      if (playtimeSource) {
        columns.playtimeSource = playtimeSource.playtime_forever;
      }
      if (playtimeSandstorm) {
        columns.playtimeSandstorm = playtimeSandstorm.playtime_forever;
      }
      player.update(columns).then(rowsUpdated => {});
      console.log(`updated ${player.nickName}: ${JSON.stringify(columns, null, 4)}`)
    } else {
       console.warn(`private playtime: ${player.nickName}`);
    }
  };
  Player.updatePlaytimes = async () => {
    const players = await Player.findAll().filter(p => p.steamId);
    console.log(`updating playtime for ${players.length} players.`);
    for (const player of players) {
      Player.updatePlaytime(player);
    }
  };
  return Player;
};
