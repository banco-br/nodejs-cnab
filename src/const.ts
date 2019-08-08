export const CNAB_YAML_DIR = './node_modules/@banco-br/cnab_yaml';
export const BANK = {
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
    },
    retorno: {
      400: ['header_arquivo', 'detalhe']
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
    },
    retorno: {
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
