const { helperGenerateRemessaCNAB240 } = require('../src/nodejs-cnab')

describe('Remessa CNAB 240', function() {
  it('041 - Banrisul', () => {
    const dadosGeracao = {
      cdBanco: '041',
      codigo_inscricao: 2,
      numero_inscricao: '18701835000134',
      codigo_convenio: '0843077896063',
      agencia: '0843',
      conta_corrente: '060778960',
      conta_corrente_dv: '1',
      nome_empresa: 'Jardim Celestial',
      detalhe_segmento: [
        {
          nosso_numero: '183',
          numero_documento: '1',
          vencimento: '2019-09-05',
          valor_titulo: 150,
          data_emissao: '2019-08-31',
          uso_empresa: 1,
          sacado_numero_inscricao: '22257110030',
          nome: 'Ines Doris Machado Fernandes',
          logradouro: 'Rua Doutor Flores, 756',
          bairro: 'Morada do Vale ',
          cep: '94120050',
          cidade: 'Gravataí',
          estado: 'RS'
        },
        {
          nosso_numero: '264',
          numero_documento: '2',
          vencimento: '2019-09-05',
          valor_titulo: 150,
          data_emissao: '2019-08-31',
          uso_empresa: 2,
          sacado_numero_inscricao: '22257110030',
          nome: 'Ines Doris Machado Fernandes',
          logradouro: 'Rua Doutor Flores, 756',
          bairro: 'Morada do Vale ',
          cep: '94120050',
          cidade: 'Gravataí',
          estado: 'RS'
        },
        {
          nosso_numero: '345',
          numero_documento: '3',
          vencimento: '2019-09-05',
          valor_titulo: 150,
          data_emissao: '2019-08-31',
          uso_empresa: 3,
          sacado_numero_inscricao: '22257110030',
          nome: 'Ines Doris Machado Fernandes',
          logradouro: 'Rua Doutor Flores, 756',
          bairro: 'Morada do Vale ',
          cep: '94120050',
          cidade: 'Gravataí',
          estado: 'RS'
        }
      ],
      data_geracao: '2019-08-31 18:43:26',
      updatedAt: '2019-08-31T21:43:26.201Z',
      numero_sequencial_arquivo: 31
    }

    expect(helperGenerateRemessaCNAB240(dadosGeracao, '041').split('\n')).toEqual(
      require('./remessa.041.240.json')
    )
  })
})
