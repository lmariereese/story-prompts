const Sequelize = require('sequelize');
const db = require('../db');

const Detail = db.define('detail', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Detail;
