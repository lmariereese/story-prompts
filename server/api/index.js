const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/story-elements', require('./story-elements'));
router.use('/prompts', require('./prompts'));
router.use('/content', require('./content'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
