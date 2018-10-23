var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const User = require('../models/User');
// const ObjectId = mongoose.User.model('');

// const Movie = require('../models/movie');

mongoose.connect('mongodb://localhost/moviesApp')
.then(() => {
  console.log('Connected to Mongo!');
})
.catch(err => {
  console.error('Error connecting to mongo', err);
});

/* GET home page. */
router.get('/', function(req, response, next) {

  Movie.find()
  .then(result => {
    response.render('movies', { result });
  })
  .catch(err => {
    console.error('Se ha producido un error', err);
  });

});

/* create movie */
router.get('/new', (req, res, next) => {
  res.render('movies/add')
});

router.post('/',(req, res, next) => {
  // console.log('post', req.body);
  const movie = req.body;
  Movie.create(movie)
  .then(() => {
    res.redirect('/movies')
  })
  .catch((error) => {
    console.log(error);
  })
  // res.send('hola');
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
  .then(movie => {
    res.render('movies/edit', {movie: movie})
  })
  .catch(error => {
    console.log(error);
  });
  
});

router.post('/:id', (req, res, next) => {
  const movie = req.body;
  const id = req.params.id;
  
  Movie.findByIdAndUpdate(id, movie)
  .then((result) => {
    res.redirect(`/movies/${id}`);
  })
  .catch(error => {
    console.log(error);
  });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
  .then(result => {
    res.redirect('/movies')
    .catch(error => {
      console.log(error);
    })
  })
})

router.get('/:id', function(req, response) {

  const id = req.params.id;

  Movie.findById(id)
  .then(result => {
    response.render('movie-info', { result });
  })
  .catch(err => {
    console.error('Se ha producido un error', err);
  });

});

router.post('/favorite', (req, res, next) => {
  res.redirect('/movies');
});

router.post('/:id/favorites', (req, res, next) => {
  const id = req.params.id;

  User.findOne({userName: id})
  .then(user => {
    console.log(user);
    user.favories.push(ObjectId(id));

    User.save()
      .then((success) => {
        console.log('success', success);
        res.redirect('/movies');
      })
      .catch(next);
    })

  .catch(err => {
    console.log('Se ha producido un error', err);
  });
    
})

module.exports = router;