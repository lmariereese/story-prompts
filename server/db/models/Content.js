const Sequelize = require('sequelize');
const db = require('../db');

const Content = db.define('content', {
  data: {
    type: Sequelize.JSON
  }
});

module.exports = Content;
