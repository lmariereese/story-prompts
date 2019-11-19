const User = require('./user');
const Setting = require('./setting');
const Adjective = require('./adjective');
const MainCharacter = require('./mainCharacter');
const Detail = require('./detail');
const RisingAction = require('./risingAction');
const Climax = require('./climax');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Setting,
  Adjective,
  MainCharacter,
  Detail,
  RisingAction,
  Climax
};
