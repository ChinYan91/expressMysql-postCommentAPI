const config = require("./config.json");
const Sequelize = require('sequelize');

const user = config.Database.username;
const pswd = config.Database.password;
const host = config.Database.hostname;
const port = config.Database.port;
const dbname = config.Database.database;

const sequelize = new Sequelize(dbname, user, pswd, {
  host: host,
  port: port,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

module.exports = sequelize;

