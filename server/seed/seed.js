const faker = require('faker');
const fs = require('fs');

const writeUserCols = fs.createWriteStream('server/db/csvData/users.csv');
//writeUserCols.write('name,avatar\n', 'utf8');
const writeRentalCols = fs.createWriteStream('server/db/csvData/rentals.csv');


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

let continents = ['noam','noam','noam','eu','eu','soam','asia','asia','asia','aus','aus']
const writeRentalRows = (writer, encoding, callback) => {
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

writeUserRows(writeUserCols, 'utf-8', ()=> {writeUserCols.end();});
writeRentalRows(writeRentalCols, 'utf-8', ()=> {writeRentalCols.end();});

/*                          SEED USERS COMMAND */
///Users/williameliason/sdc/sdc-review-component/server/db/csvData/users.csv
// COPY users (name, avatar) FROM '/Users/williameliason/sdc/sdc-review-component/server/db/csvData/users.csv' WITH delimiter ',';

/*                          SEED RENTALS COMMAND */
///Users/williameliason/sdc/sdc-review-component/server/db/csvData/rentals.csv
// COPY rentals (name, continent) from '/Users/williameliason/sdc/sdc-review-component/server/db/csvData/rentals.csv' WITH delimiter ',';