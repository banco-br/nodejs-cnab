import * as pad from 'pad'
import * as fs from 'fs'
import * as yaml from 'js-yaml'
// const yaml = require('js-yaml')

export function makeLine(layout: any, data: any) {
  const object: any = {}
  if (layout) {
    let index = 0
    Object.keys(layout).forEach(key => {
      const item = layout[key]
      if (item.pos) {
        const start = item.pos[0] - 1 // yml começa no 1 e array em 0
        const length = item.pos[1] - item.pos[0] + 1
        if (data) {
          object[key] = data.substr(start, length) || item.default
        } else {
          console.warn('Nao tem data', data)
        }
      } else {
        console.warn('Nao tem posicao pra key', key)
      }
    })
  }
  return object
}

export function readLine(layout: any, data: any) {
  let line = ''
  const object: any = {}
  if (layout) {
    Object.keys(layout).forEach(key => {
      const item = layout[key]
      let value
      if (key in data && data[key]) {
        value = data[key]
      } else {
        value = item.default
      }
      const baseValue = value ? value + '' : ''
      const pictures = usePicture(item, baseValue)
      object[key] = pictures
      line += pictures
    })
  }
  return { line, object }
}

/**
 *
 *
 */
const usePicture = function(item: any, value = '') {
  const { picture } = item
  if (picture.indexOf('V9') > 0) {
    const out = regexPicture(/9\((\w+?)\)/g, picture)
    return formatCurrency(value, Number(out[0]), Number(out[1]))
  } else if (picture.startsWith('9')) {
    const out = regexPicture(/9\((\w+?)\)/g, picture)
    if (item.date_format) {
      return formatDate(value, out[0]) // , item.date_format
    } else {
      return formatNumber(value, out[0])
    }
  } else if (picture.startsWith('X')) {
    const out = regexPicture(/X\((\w+?)\)/g, picture)
    return formatText(value, out[0])
  } else {
    throw new Error(`Cant recognize picture for ${picture}`)
  }
}
const regexPicture = (exp: any, picture: any) => {
  let regex = new RegExp(exp)
  let text = picture // "9(10)V9(10)",
  let result
  let out = []

  // tslint:disable-next-line:no-conditional-assignment
  while ((result = regex.exec(text))) {
    out.push(result[1])
  }

  return out
}

/*
 * Alfanumérico (picture X): alinhados à esquerda com brancos à direita. Preferencialmente,
 * todos os caracteres devem ser maiúsculos. Aconselhase a não utilização de
 * caracteres especiais (ex.: “Ç”, “?”,, etc) e
 * acentuação gráfica (ex.: “Á”, “É”, “Ê”, etc) e os campos não utiliza dos deverão ser preenchidos com brancos.
 * */
const formatText = function(value: any, size: any) {
  while (value.length < size) {
    value = value + ' '
  }
  return value
}

/*  Numérico (picture 9): alinhado à direita com zeros à esquerda e os campos não utilizados deverão ser preenchidos
 * com zeros. - Vírgula assumida (picture V): indica a posição da vírgula dentro de um campo numérico.
 * Exemplo: num campo com picture “9(5)V9(2)”, o número “876,54” será representado por “0087654”
 * @param {*} picture
 * @param {*} value
 */
const formatNumber = function(value: any, size: any) {
  // value = value.replace(/[^0-9]/g, "")
  while (value.length < size) {
    value = '0' + value
  }
  return value
}

const formatDate = function(value: any, size: any) {
  // if(!value){
  //   return new Date()
  // }
  // value = value.replace(/[^0-9]/g, "")
  while (value.length < size) {
    value = '0' + value
  }
  // date_format: '%d%m%y'
  return value
}

export function formatCurrency(value: string = '', integer: number = 0, decimal: number = 0) {
  value = value ? value.toString().replace(/[.R$]/g, '') : ''

  const vals = value.split(',')
  vals[1] = vals[1] || ''

  vals[0] = pad(Number(integer), vals[0].toString(), '0')
  vals[1] = pad(vals[1].toString(), Number(decimal), '0')

  return vals.join('')
}

export function readYaml(filename: string) {
  return yaml.safeLoad(fs.readFileSync(filename, 'utf8'))
}
