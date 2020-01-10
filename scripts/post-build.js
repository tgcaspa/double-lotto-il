'use strict';

const fs = require('fs');
const path = require('path');
const scriptName = path.basename(__filename);
const streamFiles = {
  sf: './dist/index.html',
  df: './dist/200.html',
};

console.log(`\nRunning ${scriptName}`);

copyStreamFiles(streamFiles).on('close', () => console.log(`Done\n`));

function copyStreamFiles({ sf, df }) {
  console.log(`Copying from '${sf}' to '${df}'`);

  return fs.createReadStream(sf).pipe(
    fs.createWriteStream(df)
  );
}
