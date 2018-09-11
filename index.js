const { makeLine, readYaml } = require('./src/utils.js');
const BANK = {
  bradesco: {
    code: '237',
    layout: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  },
  bb: {
    code: '001',
    layout: {
      400: ['header_arquivo', 'detalhe']
    }
  }
};

const generateCnab = (files, cnabtype = 400, bankcode = '237') => {
  try {
    const yamls = [];
    for (key in files) {
      const layout = readYaml(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/${key}.yml`);
      yamls.push({
        layout,
        data: files[key]
      });
    }

    const infos = yamls.map((i, index) => {
      return makeLine(i.layout, i.data);
    });

    const infosLine = infos.map(i => {
      return i.line
    });

    const CNAB_EOL = '\r\n';
    const data = infosLine.join(CNAB_EOL);
    return data;
  } catch (e) {
    console.log(e);
  }
}
// data_geracao

module.exports = { generateCnab, BANK };

//  date_format

