const csv = require('csv-parser')
const fs = require('fs')
const results = [];

function run() {
  console.log(fs.createReadStream('data.csv'));
// fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//   });
}

run();