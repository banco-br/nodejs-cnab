import * as fs from 'fs';
import { parseRemessaCnab, BANK } from '../index';
import { expect } from 'chai';
const cnabCode = 400;

export const exampleRemessa = `02RETORNO01COBRANCA       00000000000004628596PAGAR.ME PAGAMENTOS S.A.      237BRADESCO       2005160160000000001                                                                                                                                                                                                                                                                          220514         000001
1021872705300017400000250122900004693                         000000000000000000600000000000000000000000000506200516          00000000000000000000000000000000000150034103830  000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000   210516             00000000000000                                                                  000002
9201237          000000010000000000150000000001          00000000000000000000000000500000010000000005000000000000000000000000000000000000000000000000000000000000000000000000000000000000000                                                                                                                                                                              00000000000000000000000         000003`;


describe('Retorno CNAB 400', function () {
  
  
  it('BB 001', () => {
    const finalresult = parseRemessaCnab(BANK.bb.retorno[cnabCode], cnabCode, BANK.bb.code, exampleRemessa);
    expect(finalresult.length).to.be.greaterThan(2);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.bb.code}.json`, finalresult);
  });
  
  it('Santander 033', () => {
    const finalresult = parseRemessaCnab(BANK.santander.retorno[cnabCode], cnabCode, BANK.santander.code, exampleRemessa);
    expect(finalresult.length).to.be.greaterThan(1);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.santander.code}.json`, finalresult);
  });

  it('Banrisul 041', () => {
    const finalresult = parseRemessaCnab(BANK.banrisul.retorno[cnabCode], cnabCode, BANK.banrisul.code, exampleRemessa);
    expect(finalresult.length).to.be.greaterThan(2);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.banrisul.code}.json`, finalresult);
  });

  it('Caixa 104', () => {
    const finalresult = parseRemessaCnab(BANK.caixa.retorno[cnabCode], cnabCode, BANK.caixa.code, exampleRemessa);
    expect(finalresult.length).to.be.greaterThan(2);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.caixa.code}.json`, finalresult);
  });

  it('Bradesco 237', () => {
    const finalresult = parseRemessaCnab(BANK.bradesco.retorno[cnabCode], cnabCode, BANK.bradesco.code, exampleRemessa);
    expect(finalresult.length).to.be.greaterThan(2);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.bradesco.code}.json`, finalresult);
  });

  it('Itaú 341', () => {
    const finalresult = parseRemessaCnab(BANK.itau.retorno[cnabCode], cnabCode, BANK.itau.code, exampleRemessa);
    expect(finalresult.length).to.be.greaterThan(2);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.itau.code}.json`, finalresult);
  });

  it('Bancoob 756', () => {
    const finalresult = parseRemessaCnab(BANK.bancoob.retorno[cnabCode], cnabCode, BANK.bancoob.code, exampleRemessa);
    expect(finalresult.length).to.be.greaterThan(2);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.bancoob.code}.json`, finalresult);
  });
 /* TODO:  */
});

const makeFilesLayoutRetorno = (files, bankCode, cnabCode) => {
  const filesLayout = {};
  files.map(f => {
    filesLayout[f] = JSON.parse(fs.readFileSync(`test/data/cnab${cnabCode}/${bankCode}/${f}.rem`, 'utf8'));
  });
  return filesLayout;
};


