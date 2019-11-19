const Sequelize = require('sequelize');
const db = require('../db');

const Climax = db.define('climax', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Climax;
