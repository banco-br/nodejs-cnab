const fs = require('fs');
const { generateCnab, BANK } = require('../index');
const { expect } = require('chai');
const cnabCode = 400;

describe('CNAB 400 Tests', function () {
  
  it('Bradesco', () => {
    const filesLayout = makeFilesLayout(BANK.bradesco.layout[cnabCode], BANK.bradesco.code, cnabCode);
    const finalresult = generateCnab(filesLayout, cnabCode, BANK.bb.code);
    // expect(finalresult).to.have.
    fs.writeFileSync(`test/example-${cnabCode}-${BANK.bradesco.code}.rem`, finalresult);
  });
  it('Itau', () => {
    const filesLayout = makeFilesLayout(BANK.bb.layout[cnabCode], BANK.bb.code, cnabCode);
    const finalresult = generateCnab(filesLayout, cnabCode, BANK.bb.code);
    // expect(finalresult).to.have.
    fs.writeFileSync(`test/example-${cnabCode}-${BANK.bb.code}.rem`, finalresult);
  })
});

const makeFilesLayout = (files, bankCode, cnabCode) => {
  const filesLayout = {};
  files.map(f => {
    filesLayout[f] = JSON.parse(fs.readFileSync(`test/data/cnab${cnabCode}/${bankCode}/${f}.json`, 'utf8'));
  });
  return filesLayout;
}