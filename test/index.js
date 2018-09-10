const fs = require('fs');
const { generateCnab } = require('../index');

const header = JSON.parse(fs.readFileSync('test/data/cnab400/237/header.json', 'utf8'));
const detail = JSON.parse(fs.readFileSync('test/data/cnab400/237/detalhe.json', 'utf8'));
const trailer = JSON.parse(fs.readFileSync('test/data/cnab400/237/trailer.json', 'utf8'));

const finalresult = generateCnab(header, detail, trailer);
// console.log(finalresult);
fs.writeFileSync('test/example.rem', finalresult);


