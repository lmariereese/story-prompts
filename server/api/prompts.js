const router = require('express').Router();
const { Prompt, User } = require('../db/models');
// const uniqueSlug = require('unique-slug');

module.exports = router;

// console.log('UNIQUE SLUG HERE: ', uniqueSlug('1103147204269344'));

router.get('/', async (req, res, next) => {
  try {
    const allPrompts = await Prompt.findAll({
      where: {
        userId: req.user.id
      }
    });
    if (allPrompts) {
      res.json(allPrompts);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPrompt = await Prompt.create({
      setting: req.body.setting.text,
      adjective: req.body.adjective.text,
      character: req.body.character.text,
      detail: req.body.detail.text,
      action: req.body.action.text,
      climax: req.body.climax.text
    });
    const user = await User.findByPk(req.user.id);
    await newPrompt.setUser(user);
    res.json(newPrompt);
  } catch (err) {
    next(err);
  }
});
