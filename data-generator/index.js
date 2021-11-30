const fs = require('fs');
const loremIpsum = require('lorem-ipsum').loremIpsum;

const imageFolder = './src/resources/img/avatars/';
const imagesFilepath = './src/data/Images.js';
const resultFilePath = './src/data/contacts.json';

const contacts = [];
const roles = ['CEO', 'CTO', 'Frontend', 'Mobile', 'Backend', 'QA'];
let images = '';

fs.readdirSync(imageFolder).forEach((file, index) => {
  if (file.indexOf('@') === -1) {
    const name = file.substr(0, file.indexOf('.')).replaceAll('_', ' ');
    const role = roles[Math.floor(Math.random() * roles.length)];
    const about = loremIpsum({
      count: 2,
      units: 'paragraph',
    });
    const picture = `${imageFolder.replace('./src', '..')}${file}`;
    images = images + `${index}: require('${picture}'),`;
    contacts.push({
      name,
      role,
      about,
      picture: index,
    });
  }
});

const resultString = JSON.stringify(contacts);
fs.writeFileSync(resultFilePath, resultString);

const imagesString = `export default {${images}}`;
fs.writeFileSync(imagesFilepath, imagesString);
