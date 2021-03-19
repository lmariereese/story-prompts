const User = require('./user');
const StoryElement = require('./storyElement');
const Prompt = require('./Prompt');
const Content = require('./Content');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Prompt);
Prompt.belongsTo(User);

Prompt.hasOne(Content);
Content.belongsTo(Prompt);
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  StoryElement,
  Prompt,
  Content
};
