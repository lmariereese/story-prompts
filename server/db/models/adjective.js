const Sequelize = require('sequelize');
const db = require('../db');

const Adjective = db.define('adjective', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Adjective;
