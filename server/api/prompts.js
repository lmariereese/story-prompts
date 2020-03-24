const router = require('express').Router();
const {Prompt, User, Content} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allPrompts = await Prompt.findAll({
      include: [{model: Content}],
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

// router.post('/share', async (req, res, next) => {

// });

router.get('/prompt/:id', async (req, res, next) => {
  try {
    const onePrompt = await Prompt.findOne({
      include: [{model: Content}],
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
