const router = require('express').Router();
const {Prompt, User, Content} = require('../db/models');
module.exports = router;

router.get('/:promptId', async (req, res, next) => {
  try {
    const currentContent = await Content.findOne({
      where: {
        promptId: req.params.promptId
      }
    });
    if (currentContent) {
      res.json(currentContent);
    } else {
      res.status(200).send('no content');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/:promptId', async (req, res, next) => {
  console.log(req.body);
  try {
    const newContent = await Content.create({
      data: req.body.content
    });
    const currentPrompt = await Prompt.findByPk(req.params.promptId);
    newContent.setPrompt(currentPrompt);
    if (newContent) {
      res.json(newContent);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:contentId', async (req, res, next) => {
  try {
    const [numOfAffectedRows, affectedRows] = await Content.update(
      {
        data: req.body.content
      },
      {
        where: {
          id: req.params.contentId
        },
        returning: true
      }
    );
    console.log('affected rows! ', affectedRows[0]);
    if (numOfAffectedRows !== 0) {
      res.json(affectedRows[0]);
    }
  } catch (err) {
    next(err);
  }
});
