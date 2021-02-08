const {Pool} = require('pg');


const pool = new Pool({
  host: 'localhost',
  database: 'reviews-service',
  port: 5432
});

//GET ALL REVIEWS FOR A SPECIFIC RENTAL
let getRentalReviews = (rentalID) => {
  return (
    pool
    .query(`SELECT rev.*, ren.name, u.name FROM reviews rev, rentals ren, users u WHERE rev.rental_id = ${rentalID} AND ren.rental_id = ${rentalID} AND u.user_id = rev.user_id`)
    .then((res) => {
      return res.rows;
    })
    .catch(err => {
      setImmediate(()=>{throw err})
    }));
}

// //GET ALL REVIEWS FOR A SPECIFIC USER
let getUserReviews = (userID) => {
  return (
    pool
    .query(`SELECT r.*,u.name,u.avatar FROM reviews r, users u WHERE r.user_id = ${userID} AND u.user_id = ${userID}`)
    .then((res) => {
      return res.rows;
    })
    .catch(err => {
      setImmediate(()=>{throw err})
    }));
}





