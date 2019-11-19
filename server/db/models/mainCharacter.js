const Sequelize = require('sequelize');
const db = require('../db');

const mainCharacter = db.define('mainCharacter', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = mainCharacter;
