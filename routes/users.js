var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/', (req, res, next) => {
  const user = req.body;

  User.create(user)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });

});

router.get('/profile', (req, res, next) => {

  User.findOne({userName: 'Paco'})
  .populate('favorites')
  .then(user => {
    console.log(user);
    res.render('users/profile', {user: user});
  });
});

module.exports = router;
