// https://developers.amplitude.com/docs/releases-api
const fs = require('fs');

const [_, __, version] = process.argv;
const run = async () => {
  try {
    var regex = /version:\s*'(\d+\.\d+\.\d+)'/g;

    fs.readFile('./app.config.js', 'utf8', (err, data) => {
      if (err) throw new Error(err);
      const result = data.replace(regex, `version: '${version}'`);

      fs.writeFile('./app.config.js', result, 'utf8', (err) => {
        if (err) throw new Error(err);
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

run();
