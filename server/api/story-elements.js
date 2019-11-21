const router = require('express').Router();
const { StoryElement } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const elements = await StoryElement.findAll();
    if (elements) {
      res.json(elements);
    } else {
      res.status(500).send('Something went wrong');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:elementType/', async (req, res, next) => {
  try {
    const elements = await StoryElement.findAll({
      where: {
        element: req.params.elementType
      }
    });
    if (elements) {
      res.json(elements);
    } else {
      res.status(500).send('Something went wrong');
    }
  } catch (err) {
    next(err);
  }
});
