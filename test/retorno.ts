import * as fs from 'fs';
import { parseRemessaCnab, BANK } from '../index';
import { expect } from 'chai';
const cnabCode = 400;

export const exampleRemessa = `02RETORNO01COBRANCA       00000000000004628596PAGAR.ME PAGAMENTOS S.A.      237BRADESCO       2005160160000000001                                                                                                                                                                                                                                                                          220514         000001
1021872705300017400000250122900004693                         000000000000000000600000000000000000000000000506200516          00000000000000000000000000000000000150034103830  000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000   210516             00000000000000                                                                  000002
9201237          000000010000000000150000000001          00000000000000000000000000500000010000000005000000000000000000000000000000000000000000000000000000000000000000000000000000000000000                                                                                                                                                                              00000000000000000000000         000003`;


describe('Retorno CNAB 400', function () {
  
  it('Bradesco 237', () => {
    const filesLayout = makeFilesLayout(BANK.bradesco.remessa[cnabCode], BANK.bradesco.code, cnabCode);
    const finalresult = parseRemessaCnab(filesLayout, cnabCode, BANK.bradesco.code);
    console.log(finalresult, 'RETORNO')
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.bradesco.code}.json`, finalresult);
  });
  /* TODO: 
  it('BB 0001', () => {
    const filesLayout = makeFilesLayoutRetorno(BANK.bb.retorno[cnabCode], BANK.bb.code, cnabCode);
    const finalresult = parseRemessaCnab(filesLayout, cnabCode, BANK.bb.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.bb.code}.json`, finalresult);
  });
  it('Santander 033', () => {
    const filesLayout = makeFilesLayoutRetorno(BANK.santander.remessa[cnabCode], BANK.santander.code, cnabCode);
    const finalresult = parseRemessaCnab(filesLayout, cnabCode, BANK.santander.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.santander.code}.json`, finalresult);
  });
  it('Caixa 104', () => {
    const filesLayout = makeFilesLayoutRetorno(BANK.caixa.remessa[cnabCode], BANK.caixa.code, cnabCode);
    const finalresult = parseRemessaCnab(filesLayout, cnabCode, BANK.caixa.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.caixa.code}.json`, finalresult);
  });
  it('Bancoob 756', () => {
    const filesLayout = makeFilesLayoutRetorno(BANK.bancoob.remessa[cnabCode], BANK.bancoob.code, cnabCode);
    const finalresult = parseRemessaCnab(filesLayout, cnabCode, BANK.bancoob.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/gen/retorno-${cnabCode}-${BANK.bancoob.code}.json`, finalresult);
  });
  */
});

const makeFilesLayoutRetorno = (files, bankCode, cnabCode) => {
  const filesLayout = {};
  files.map(f => {
    filesLayout[f] = JSON.parse(fs.readFileSync(`test/data/cnab${cnabCode}/${bankCode}/${f}.rem`, 'utf8'));
  });
  return filesLayout;
};

const makeFilesLayout = (files, bankCode, cnabCode) => {
  const filesLayout = {};
  files.map(f => {
    filesLayout[f] = JSON.parse(fs.readFileSync(`test/data/cnab${cnabCode}/${bankCode}/${f}.json`, 'utf8'));
  });
  return filesLayout;
};

