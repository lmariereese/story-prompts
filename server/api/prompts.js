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
    if (!req.user) res.status(401).send();
    else {
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
    }
  } catch (err) {
    next(err);
  }
});

router.get('/prompt/:id', async (req, res, next) => {
  try {
    const onePrompt = await Prompt.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id
      },
      attributes: [
        'id',
        'setting',
        'adjective',
        'character',
        'detail',
        'action',
        'climax'
      ]
    });
    if (onePrompt) {
      res.json(onePrompt);
    } else {
      res.status(401).send();
    }
  } catch (err) {
    next(err);
  }
});
