const fs = require('fs');
const { generateRemessaCnab, BANK } = require('../index');
const { expect } = require('chai');
const cnabCode = 400;

describe('Remessa CNAB 400', function () {
  
  it('Bradesco', () => {
    const filesLayout = makeFilesLayout(BANK.bradesco.remessa[cnabCode], BANK.bradesco.code, cnabCode);
    const finalresult = generateRemessaCnab(filesLayout, cnabCode, BANK.bb.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/example-${cnabCode}-${BANK.bradesco.code}.rem`, finalresult);
  });
  it('BB', () => {
    const filesLayout = makeFilesLayout(BANK.bb.remessa[cnabCode], BANK.bb.code, cnabCode);
    const finalresult = generateRemessaCnab(filesLayout, cnabCode, BANK.bb.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/example-${cnabCode}-${BANK.bb.code}.rem`, finalresult);
  });
  it('Santander', () => {
    const filesLayout = makeFilesLayout(BANK.santander.remessa[cnabCode], BANK.santander.code, cnabCode);
    const finalresult = generateRemessaCnab(filesLayout, cnabCode, BANK.santander.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/example-${cnabCode}-${BANK.santander.code}.rem`, finalresult);
  });
  it('Caixa', () => {
    const filesLayout = makeFilesLayout(BANK.caixa.remessa[cnabCode], BANK.caixa.code, cnabCode);
    const finalresult = generateRemessaCnab(filesLayout, cnabCode, BANK.caixa.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/example-${cnabCode}-${BANK.caixa.code}.rem`, finalresult);
  });
  it('Bancoob', () => {
    const filesLayout = makeFilesLayout(BANK.bancoob.remessa[cnabCode], BANK.bancoob.code, cnabCode);
    const finalresult = generateRemessaCnab(filesLayout, cnabCode, BANK.bancoob.code);
    expect(finalresult.length).to.be.greaterThan(800);
    fs.writeFileSync(`test/example-${cnabCode}-${BANK.bancoob.code}.rem`, finalresult);
  });
});

const makeFilesLayout = (files, bankCode, cnabCode) => {
  const filesLayout = {};
  files.map(f => {
    filesLayout[f] = JSON.parse(fs.readFileSync(`test/data/cnab${cnabCode}/${bankCode}/${f}.json`, 'utf8'));
  });
  return filesLayout;
}