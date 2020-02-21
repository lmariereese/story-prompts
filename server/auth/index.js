const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

router.put('/update/email', async (req, res, next) => {
  try {
    // check if the new email address is already associated with another account
    const emailInUse = await User.findOne({
      where: {
        email: req.body.newEmail
      }
    });
    if (emailInUse) {
      res.status(401).send(`${req.body.newEmail} is unavailable.`);
    } else {
      // update user's email address in db
      const [numRows, affectedRows] = await User.update(
        {
          email: req.body.newEmail
        },
        {
          where: {
            email: req.user.email
          },
          returning: true,
          plain: true
        }
      );
      if (affectedRows) {
        res.json(affectedRows);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.use('/google', require('./google'));
