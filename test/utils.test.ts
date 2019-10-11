const { formatCurrency, readYaml } = require('../src/utils')

describe('formatCurrency', function() {
  it('Test 1', () => {
    expect(formatCurrency(12345678.9, 13, '2')).toEqual('000001234567890')
  })
  it('Test 2', () => {
    expect(formatCurrency(12345678.9, 13, '4')).toEqual('00000123456789000')
  })
  it('Test 3', () => {
    expect(formatCurrency(123456.789, 13, '2')).toEqual('000000012345679')
  })
  it('Test 4', () => {
    expect(formatCurrency(123456.789, 13, '4')).toEqual('00000001234567890')
  })
  it('Test 5', () => {
    expect(formatCurrency(null, 13, '4')).toEqual('00000000000000000')
  })
  it('Test 6', () => {
    expect(formatCurrency(1234567890, 13, 2)).toEqual('000123456789000')
  })
})

/**
 * readYaml
 */
describe('readYaml', function() {
  it('YAML return Object', () => {
    expect(
      typeof readYaml(
        './node_modules/@banco-br/cnab_yaml/cnab240/041/remessa/detalhe_segmento_p.yml'
      )
    ).toBe('object')
  })

  it('YAML throw error', () => {
    expect(() => {
      readYaml('./FileNotExists.yml')
    }).toThrow('no such file or directory, open')
  })
})
