const Sequelize = require('sequelize');
const db = require('../db');

const RisingAction = db.define('risingAction', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = RisingAction;
