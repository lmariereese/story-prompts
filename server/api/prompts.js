const router = require('express').Router();
const Prompt = require('../db/models');

router.get('/prompts/:id', async (req, res, next) => {
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
