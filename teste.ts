const { helperGenerateRemessaCNAB240 } = require('./src/helperGenerateRemessaCNAB');
const dayjs = require('dayjs')
const { isCNPJ, isCPF } = require('brazilian-values')


/**
 * Dados para geração
 */

const dadosGeracao = {
  codigo_inscricao: 2,  //  1 - CPF, 2 = CNPJ
  numero_inscricao: '91338558000137', //  Cemiterio.CNPJ
  codigo_convenio: '1160116446007', // ConvenioCobranca.cdConvenio
  agencia: '1160', // ConvenioCobranca.cdAgencia
  codigo_cedente: '4041164', // ConvenioCobranca.cdCedente
  codigo_cedente_dv: '41', // ConvenioCobranca.cdCedenteDV
  nome_empresa: 'MUNICIPIO DE GLORINHA', //  Cemiterio.nome
  data_geracao: dayjs('2019-08-05').format('DDMMYYYY'), // Remessa.createdAt
  hora_geracao: dayjs('1900-01-01 20:10:55').format('HHmmss'),  //..Remessa.createdAt
  numero_sequencial_arquivo: '010546',  //  Remessa.id
  detalhe_segmento: [
    {
      nosso_numero: '4182099959', // BoletoBancario.nossoNumero
      numero_documento: '41820999', // BoletoBancario.nossoNumeroOriginal
      vencimento: '2019-08-05', // BoletoBancario.dtVencimento
      valor_titulo: 7.77, //  BoletoBancario.vlOriginal
      data_emissao: '2019-08-05', // BoletoBancario.dtEmissao
      uso_empresa: '41820999',  // Boleto.id

      /**
        * Dados do Pagador, (Reponsável no financeiro)
        */
      sacado_numero_inscricao: '26760274091',
      nome: 'LAURI MACIEL',
      logradouro: 'EST AFONSO CORREA, 285',
      bairro: 'RINCAO SAO JOAO',
      cep: '94380000',
      cidade: 'GLORINHA',
      estado: 'RS',
    }
  ]

};
