const yaml = require('js-yaml');
const fs = require('fs');
const { makeLine } = require('./src/utils.js');

const generateCnab = (header, detail, trailer, cnabtype = 400, bankcode = 237) => {
  try {
    const detailSpec = yaml.safeLoad(fs.readFileSync(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/detalhe.yml`, `utf8`));
    const headerSpec = yaml.safeLoad(fs.readFileSync(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/header_arquivo.yml`, `utf8`));
    const trailerSpec = yaml.safeLoad(fs.readFileSync(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/trailer_arquivo.yml`, `utf8`));

    const detailInfo = makeLine(detailSpec, detail);
    const headerInfo = makeLine(headerSpec, header);
    const trailerInfo = makeLine(trailerSpec, trailer);

    const CNAB_EOL = '\r\n';
    console.log(detailInfo.object)
    const data = [headerInfo.line, detailInfo.line, trailerInfo.line].join(CNAB_EOL);
    return data;
  } catch (e) {
    console.log(e);
  }
}
// data_geracao

module.exports = { generateCnab };

//  date_format

