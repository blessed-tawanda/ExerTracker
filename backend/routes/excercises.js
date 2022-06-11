const router = require('express').Router();
const Excercise = require('../models/excercise.model');

router.route('/').get((req, res) => {
  Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const {
    username,
    description,
    duration,
    date
  } = req.body;

  const newExcercise = new Excercise({
    username,
    description,
    duration: Number(duration),
    date: Date.parse(date)
  });

  newExcercise.save()
  .then(() => res.json('Excercise added!'))
  .catch(err => res.status(500).json(`Error ${err}`))

});

router.route('/:id').get((req, res) => {
  Excercise.findById(req.params.id)
  .then(excercise => res.json(excercise))
  .catch(err => res.status(500).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Excercise.findByIdAndDelete(req.params.id)
  .then(excercise => res.json(`Excercise Deleted!`))
  .catch(err => res.status(500).json(`Error: ${err}`));
});

router.route('/update/:id').patch((req, res) => {
  Excercise.findById(req.params.id)
  .then(excercise => {
    const {
      username,
      description,
      duration,
      date
    } = req.body;

    excercise.username = username;
    excercise.description = description;
    excercise.duration = duration;
    excercise.date = date;

    return excercise.save()
  })
  .then(() => res.json(`Excercise Updated!`))
  .catch(err => res.status(500).json(`Error: ${err}`));
});

module.exports = router