const Sequelize = require('sequelize');
const db = require('../db');

const StoryElements = db.define('storyElements', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  element: {
    type: Sequelize.ENUM(
      'setting',
      'adjective',
      'character',
      'detail',
      'action',
      'climax'
    ),
    allowNull: false
  }
});

module.exports = StoryElements;
