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

//GET ALL REVIEWS FOR A SPECIFIC USER
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

//POST NEW REVIEW FOR A SPECIFIC USER AND RENTAL ID
//(assumes user and rental already exist in db as would be the case in production)
//review Obj contains all info for review including userID and rentalID
/*    revObjschema {
        rentalID: int,
        userID: int,
        timeStamp: string,
        review: string,
        cleanliness: int,
        accuracy: int,
        comm: int,
        location: int,
        check_in: int,
        value: int
      }
*/
let postNewReview = (revObj) => {
  console.log('query: ', revObj.check_in);
  return (
    pool
    .query(
      `INSERT INTO reviews (rental_id, user_id, timestamp, review, cleanliness, accuracy, comm, location, check_in, value) VALUES (${revObj.rentalID},${revObj.userID},'${revObj.timeStamp}','${revObj.review}',${revObj.cleanliness},${revObj.accuracy},${revObj.comm},${revObj.location},${revObj.check_in},${revObj.value})`)
    .then((res) => {
      console.log('here');
      return
    })
    .catch((err) => {
      console.log('there');
      throw err;
    }));
}

module.exports = {
  getRentalReviews: getRentalReviews,
  getUserReviews: getUserReviews,
  postNewReview: postNewReview
}





