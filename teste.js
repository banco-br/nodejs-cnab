const { helperGenerateRemessaCNAB400 } = require('./src/nodejs-cnab')
const fs = require('fs')

const dadosGeracao = {
  cdBanco: "041",
  // "codigo_inscricao": 2,
  // "numero_inscricao": "18701835000134",
  codigo_convenio: "0843077896063",
  // "agencia": "10483",
  // "conta_corrente": "060778960",
  // "conta_corrente_dv": "1",
  nome_empresa: "Cemitério Jardim Celestial Ltda",
  detalhe_segmento: [
    {
      nosso_numero: "           ",
      numero_documento: "TJCV032406",
      vencimento: "2019-06-06",
      valor_titulo: 150,
      data_emissao: "2019-04-15",
      uso_empresa: 1,
      sacado_numero_inscricao: "00037956027004",
      nome: "ADALBERTO GOMES DIAS",
      logradouro: "AV.DOS ESTADOS N262",
      bairro: " ",
      cep: "94135000",
      cidade: "GRAVATAI",
      estado: "RS"
    }
  ],
  data_geracao: "2019-04-15 21:08:40"
  // "numero_sequencial_arquivo": 3
}

let fileContent = helperGenerateRemessaCNAB400(dadosGeracao, '041').split('\n')

fileContent += '\n' + '01REMESSA                 0843077896063       Cemitério Jardim Celestial Ltd041BANRISUL       150419                                                                                                                                                                                                                                                                                                      000001'

fs.writeFileSync('./@Developer/cnab.400', fileContent)