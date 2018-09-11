const { makeLine, readYaml } = require('./src/utils.js');
const BANK = {
  bb: {
    code: '001',
    remessa: {
      400: ['header_arquivo', 'detalhe']
    },
    retorno: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  },
  santander: {
    code: '033',
    remessa: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  },
  banrisul: {
    code: '041',
    retorno: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  },
  caixa: {
    code: '104',
    remessa: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    },
    retorno: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  },
  bradesco: {
    code: '237',
    remessa: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  },
  itau: {
    code: '341',
    retorno: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  },
  bancoob: {
    code: '756',
    remessa: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    },
    retorno: {
      400: ['header_arquivo', 'detalhe', 'trailer_arquivo']
    }
  }
};

const generateRemessaCnab = (files, cnabtype = 400, bankcode = '237') => {
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

module.exports = { generateRemessaCnab, BANK };

//  date_format

