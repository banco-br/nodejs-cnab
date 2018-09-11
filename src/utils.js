const yaml = require('js-yaml');
const fs = require('fs');

const makeLine = function (layout, data) {
  let line = '';
  const object = {};
  if (layout) {
    Object.keys(layout).forEach(key => {
      const item = layout[key];
      let value;
      if (key in data && data[key]) {
        value = data[key];
      } else {
        value = item.default;
      }
      const baseValue = value ? value + '' : '';
      const pictures = usePicture(item, baseValue);
      object[key] = pictures;
      line += pictures;
    });
  }
  return { line, object };
}


/**
 * 

 * 
 */
const usePicture = function (item, value = '') {
  const { picture } = item
  if (picture.indexOf('V9') > 0) {
    const out = regexPicture(/9\((\w+?)\)/g, picture)
    return formatCurrency(value, out[0], out[1]);
  }
  else if (picture.startsWith('9')) {
    const out = regexPicture(/9\((\w+?)\)/g, picture);
    if (item.date_format) {
      return formatDate(value, out[0], item.date_format);
    } else {
      return formatNumber(value, out[0]);
    }


  }
  else if (picture.startsWith('X')) {
    const out = regexPicture(/X\((\w+?)\)/g, picture);
    return formatText(value, out[0]);
  } else {
    throw new Error(`Cant recognize picture for ${picture}`);
  }
}
const regexPicture = (exp, picture) => {
  var regex = new RegExp(exp),
    text = picture, // "9(10)V9(10)",
    result,
    out = [];
  while (result = regex.exec(text)) {
    out.push(result[1]);
  }
  return out;
}



/*
 * Alfanumérico (picture X): alinhados à esquerda com brancos à direita. Preferencialmente, 
 * todos os caracteres devem ser maiúsculos. Aconselhase a não utilização de 
 * caracteres especiais (ex.: “Ç”, “?”,, etc) e 
 * acentuação gráfica (ex.: “Á”, “É”, “Ê”, etc) e os campos não utiliza dos deverão ser preenchidos com brancos.
 * */
const formatText = function (value, size) {
  value = value.replace(/[^a-zA-Z ]/g, "")
  while (value.length < size) {
    value = value + ' ';
  }
  return value;
}

/*  Numérico (picture 9): alinhado à direita com zeros à esquerda e os campos não utilizados deverão ser preenchidos 
* com zeros. - Vírgula assumida (picture V): indica a posição da vírgula dentro de um campo numérico. 
* Exemplo: num campo com picture “9(5)V9(2)”, o número “876,54” será representado por “0087654”
* @param {*} picture 
* @param {*} value 
*/
const formatNumber = function (value, size) {
  // value = value.replace(/[^0-9]/g, "")
  while (value.length < size) {
    value = '0' + value;
  }
  return value;
}


const formatDate = function (value, size) {
  // if(!value){
  //   return new Date()
  // }
  // value = value.replace(/[^0-9]/g, "")
  while (value.length < size) {
    value = '0' + value;
  }
  // date_format: '%d%m%y'
  return value;
}



const formatCurrency = function (value, number, decimal) {
  if (!value) {
    value = '';
  }
  value += '';
  value = value.replace(/[.R$]/g, '');
  const vals = value.split(',');
  if (vals.length === 1) {
    vals[1] = '';
  }
  while (vals[0].length < number) {
    vals[0] = '0' + vals[0];
  }
  while (vals[1].length < decimal) {
    vals[1] = '0' + vals[1];
  }
  return vals[0] + vals[1];
}

const readYaml = function (filename) {
  try {
    return yaml.safeLoad(fs.readFileSync(filename, `utf8`));
  } catch (e) {
    console.log(e)
    return null;
  }
}

module.exports = { makeLine, readYaml }