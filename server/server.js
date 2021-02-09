/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {getRentalReviews, getUserReviews, postNewReview} = require('./db/index.js');

const app = express();

// compress all responses to optimize page load speed
// app.use(compression());

app.use(cors({
  origin: 'http://54.157.193.11:8000/',
}));
app.use(bodyParser.json());
app.use('/bundle', cors(), express.static(path.join(__dirname, '/../client/public/bundle.js')));
app.use('/', cors(), express.static(path.join(__dirname, '/../client/public')));

app.get('/rentalReviews/:rentalID', (req, res) => {
  getRentalReviews(req.params.rentalID)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {throw err})
});

app.get('/userReviews/:userID', (req, res) => {
  getUserReviews(req.params.userID)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {throw err})
});

app.post('/newReview', (req, res) => {
  let revObj = req.body;
  postNewReview(revObj)
    .then(() => {res.sendStatus(200)})
    .catch(err => {
      console.log(err);
      res.sendStatus(500)})
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
