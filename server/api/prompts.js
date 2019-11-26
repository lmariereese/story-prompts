const router = require('express').Router();
const { Prompt, User } = require('../db/models');
module.exports = router;

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
    console.log('new prompt', newPrompt);
    res.json(newPrompt);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      const allPrompts = await Prompt.findAll({
        where: {
          userId: req.params.id
        }
      });
      if (allPrompts) {
        res.status(200).send(allPrompts);
      }
    }
  } catch (err) {
    next(err);
  }
});
