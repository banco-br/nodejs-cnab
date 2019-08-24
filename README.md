# nodejs-cnab

[![Build Status](https://travis-ci.com/mariohmol/nodejs-cnab.svg?branch=master)](https://travis-ci.com/mariohmol/nodejs-cnab)

Finally a nodejs lib for CNAB and bank communication in brazil.

`npm i --save @banco-br/nodejs-cnab`

Working test example for Bradesco, needs work on other banks (see issues)

## Como Usar





## Remessa

```js
const fileLayout = {
  header_arquivo: {
    tipo_registro: '0',
    tipo_operacao: '1',
    literal_remessa: 'REMESSA',
    codigo_servico: '1',
    literal_servico: 'COBRANCA',
    codigo_cedente: '12562475000132',
    razao_social: 'FOO BAR LTDA',
    codigo_banco: '237',
    nome_banco: 'Bradesco',
    data_geracao: '',
    brancos01: '',
    numero_aviso_bancario: 'MX',
    sequencial_remessa: '1',
    brancos02: '',
    numero_sequencial: '1'
  },
  detalhe: {
    tipo_registro: '1',
    dados_conta_pagador: '0000000000000000000',
    zeros01: '0',
    numero_carteira: '000',
    agencia: '05633',
    conta: '45889785',
    conta_dv: '0',
    uso_empresa: 'EMPRESA LTDA             ',
    zeros02: '000',
    multa: '0',
    valor_multa: '0000',
    nosso_numero: '00000000000',
    digito_nosso_numero: '0',
    desconto_por_dia: '0000000000',
    condicao_emissao: '2',
    emissao_para_debito: 'N',
    brancos01: '           ',
    zeros03: '0',
    brancos02: '  ',
    codigo_ocorrencia: '01',
    numero_documento: '          ',
    vencimento: '000000',
    valor_titulo: '0000000000000',
    codigo_banco: '237',
    agencia_cobradora: '00000',
    especie: '01',
    aceite: 'N',
    data_emissao: '000000',
    instrucao1: '  ',
    instrucao2: '  ',
    juros_um_dia: '0000000000000',
    desconto_ate: '000000',
    valor_desconto: '0000000000000',
    valor_iof: '0000000000000',
    abatimento: '0000000000000',
    sacado_codigo_inscricao: '00',
    sacado_numero_inscricao: '00000000000000',
    nome: '                                        ',
    logradouro: '                                        ',
    brancos03: '            ',
    cep: '00000000',
    sacador: '                                                            ',
    numero_sequencial: '000001'
  },
  trailer_arquivo: { tipo_registro: '9', brancos01: '', numero_sequencial: '1' }
};
const bankCode = '001';
const cnabCode = 400;
const finalresult = generateRemessaCnab(filesLayout, cnabCode, bankCode);
// finalResult tem uma string com o conteúdo do arquivo remessa, que pode ser salvo num arquivo.rem por exemplo
```






## Retorno


  
```js

export const exampleRetorno = `02RETORNO01COBRANCA       00000000000004628596PAGAR.ME PAGAMENTOS S.A.      237BRADESCO       2005160160000000001                                                                                                                                                                                                                                                                          220514         000001
1021872705300017400000250122900004693                         000000000000000000600000000000000000000000000506200516          00000000000000000000000000000000000150034103830  000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000   210516             00000000000000                                                                  000002
9201237          000000010000000000150000000001          00000000000000000000000000500000010000000005000000000000000000000000000000000000000000000000000000000000000000000000000000000000000                                                                                                                                                                              00000000000000000000000         000003`;

const filesLayout = {
  
};
const bankCode = '001';
const cnabCode = 400;
const retornoObjeto = parseRemessaCnab(BANK.bb.retorno[cnabCode], cnabCode, bankCode, exampleRetorno);
// retornoObjeto será um objeto com os campos populados de acordo com os dados recebidos no arquivo retorno, neste exemplo o exampleRetorno
```

## Desenvolvimento

Constribua, fork e execute:

```sh
npm i -g ts-node
npm i
npm test
```

### Tests

```
npm install mocha chai ts-node typings -g 
typings install dt~mocha --global --save
npm run typings
```


## Referências

* https://github.com/s2way/cnab240-nodejs
* https://github.com/kivanio/brcobranca
* https://github.com/programadormarin/remessa-bradesco
* 
* https://github.com/andersondanilo/CnabPHP
* https://github.com/developers-vitta/nodenab
* https://github.com/andersondanilo/CnabPHP/wiki/Criando-um-arquivo-de-remessa
* https://github.com/developers-vitta/nodenab
* https://github.com/andersondanilo/cnab_yaml
