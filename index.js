const yaml = require('js-yaml');
const fs = require('fs');
const { makeLine } = require('./src/utils.js');

const generateCnab = (header, detail, trailer, cnabtype = 400, bankcode = 237) => {
  try {
    const detailSpec = yaml.safeLoad(fs.readFileSync(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/detalhe.yml`, `utf8`));
    const headerSpec = yaml.safeLoad(fs.readFileSync(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/header_arquivo.yml`, `utf8`));
    const trailerSpec = yaml.safeLoad(fs.readFileSync(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/trailer_arquivo.yml`, `utf8`));

    const detailLine = makeLine(detailSpec, detail);
    const headerLine = makeLine(headerSpec, header);
    const trailerLine = makeLine(trailerSpec, trailer);

    const CNAB_EOL = '\r\n';
    const data = [headerLine, detailLine, trailerLine].join(CNAB_EOL);
    return data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { generateCnab };



