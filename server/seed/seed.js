const faker = require('faker');
const fs = require('fs');

const writeUserCols = fs.createWriteStream('server/db/csvData/users.csv');
writeUserCols.write('name,avatar\n', 'utf8');

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

writeUserRows(writeUserCols, 'utf-8', ()=> {writeUserCols.end();});