const router = require('express').Router();
const { Prompt, User } = require('../db/models');
module.exports = router;

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
      setting: req.body.setting,
      adjective: req.body.adjective,
      character: req.body.character,
      detail: req.body.detail,
      action: req.body.action,
      climax: req.body.climax
    });
    const user = await User.findByPk(req.user.id);
    await newPrompt.setUser(user);
    res.json(newPrompt);
  } catch (err) {
    next(err);
  }
});
