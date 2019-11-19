const Sequelize = require('sequelize');
const db = require('../db');

const Setting = db.define('setting', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Setting;
