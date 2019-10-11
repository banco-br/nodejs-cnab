const { helperGenerateRemessaCNAB400 } = require('../src/nodejs-cnab')

describe('Remessa CNAB 400', function() {
  it('041 - Banrisul', () => {
    const dadosGeracao = {
      cdBanco: '041',
      codigo_convenio: '0843077896063',
      nome_empresa: 'Cemitério Jardim Celestial Ltda',
      detalhe_segmento: [
        {
          nosso_numero: '           ',
          numero_documento: 'TJCV032406',
          vencimento: '2019-06-06',
          valor_titulo: 150,
          data_emissao: '2019-04-15',
          uso_empresa: 'T JCV  000324 06/06/2019 ',
          sacado_numero_inscricao: '00037956027004',
          nome: 'ADALBERTO GOMES DIAS',
          logradouro: 'AV.DOS ESTADOS N262',
          bairro: ' ',
          cep: '94135000',
          cidade: 'GRAVATAI',
          estado: 'RS',

          mensagem: 'TAXA DE MANUTENCAO SEMESTRE 1/20'
        }
      ],
      data_geracao: '2019-04-15 21:08:40',
      numero_sequencial_arquivo: 3
    }

    expect(helperGenerateRemessaCNAB400(dadosGeracao, '041').split('\n')).toEqual(
      require('./remessa.041.400.json')
    )
  })
})
