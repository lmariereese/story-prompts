const Sequelize = require('sequelize');
const db = require('../db');

const Prompt = db.define('prompt', {
  setting: {
    type: Sequelize.STRING,
    allowNull: false
  },
  adjective: {
    type: Sequelize.STRING,
    allowNull: false
  },
  character: {
    type: Sequelize.STRING,
    allowNull: false
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false
  },
  climax: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Prompt;
