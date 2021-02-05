const faker = require('faker');
const fs = require('fs');

const writeUserCols = fs.createWriteStream('server/db/csvData/users.csv');
const writeRentalCols = fs.createWriteStream('server/db/csvData/rentals.csv');
const writeReviewCols = fs.createWriteStream('server/db/csvData/reviews.csv');

const writeUserRows = (writer, encoding, callback) => {
  let i = 1000
  const write = () => {
    let ok = true;
    do {
      i-=1;
      const name = faker.internet.userName();
      const avatar = faker.image.avatar();
      const data = `${name},${avatar}\n`;
      if (i===0) { //base case
        writer.write(data, encoding, callback)
      } else {
        ok = writer.write(data,encoding);
      }
    } while (i > 0 && ok);
    if (i>0) {
      writer.once('drain', write);
    }
  }
  write();
}

const writeRentalRows = (writer, encoding, callback) => {
  let continents = ['noam','noam','noam','eu','eu','soam','asia','asia','asia','aus','aus', 'ind', 'ind'];
  let i = 1000;
  let ok = true;
  const write = () => {
    do {
        i-=1;
        const name = faker.fake("{{vehicle.color}} {{commerce.productName}} {{address.city}}")
        const continent = continents[Math.floor(Math.random()*11)];
        const data = `${name},${continent}\n`;
        if (i===0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
    } while (i>0 && ok);
    if (i>0) {
      writer.once('drain', write);
    }
  }
  write();
}

const writeReviewRows = (writer, encoding, callback) => {
  let i = 1000
  const write = () => {
    let ok = true;
    do {
      i-=1;
      const rental_id = faker.random.number({'min': 1, 'max': 1000}); //3000000
      const user_id = faker.random.number({'min': 1, 'max': 1000}); //7000000
      const timestamp = faker.date.past();
      const review = faker.lorem.sentences();
      const cleanliness = faker.random.number(5);
      const accuracy = faker.random.number(5);
      const comm = faker.random.number(5);
      const location = faker.random.number(5);
      const check_in = faker.random.number(5);
      const value = faker.random.number(5);
      const data = `${rental_id},${user_id},${timestamp},${review},${cleanliness},${accuracy},${comm},${location},${check_in},${value}\n`;
      if (i===0) { //base case
        writer.write(data, encoding, callback)
      } else {
        ok = writer.write(data,encoding);
      }
    } while (i > 0 && ok);
    if (i>0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeUserRows(writeUserCols, 'utf-8', ()=> {writeUserCols.end();});
writeRentalRows(writeRentalCols, 'utf-8', ()=> {writeRentalCols.end();});
writeReviewRows(writeReviewCols, 'utf-8', ()=> {writeReviewCols.end();});

/*                          SEED USERS COMMAND */
///Users/williameliason/sdc/sdc-review-component/server/db/csvData/users.csv
// COPY users (name, avatar) FROM '/Users/williameliason/sdc/sdc-review-component/server/db/csvData/users.csv' WITH delimiter ',';

/*                          SEED RENTALS COMMAND */
///Users/williameliason/sdc/sdc-review-component/server/db/csvData/rentals.csv
// COPY rentals (name, continent) from '/Users/williameliason/sdc/sdc-review-component/server/db/csvData/rentals.csv' WITH delimiter ',';

/*                          SEED REVIEWS COMMAND */
// COPY reviews (rental_id, user_id, timestamp, review, cleanliness, accuracy, comm, location, check_in, value) FROM '/Users/williameliason/sdc/sdc-review-component/server/db/csvData/reviews.csv' WITH delimiter ',';