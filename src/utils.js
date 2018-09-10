
const makeLine = function (layout, data) {
  let line = '';
  Object.keys(layout).forEach(key => {
    const item = layout[key];
    let value;
    if (key in data && data[key]) {
      value = data[key];
    } else {
      value = item.default;
    }
    const baseValue = value ? value + '' : '';
    const pictures = usePicture(item.picture, baseValue);
    line += pictures;
  });
  return line;
}


/**
 * 
 * Alfanumérico (picture X): alinhados à esquerda com brancos à direita. Preferencialmente, 
 * todos os caracteres devem ser maiúsculos. Aconselhase a não utilização de 
 * caracteres especiais (ex.: “Ç”, “?”,, etc) e 
 * acentuação gráfica (ex.: “Á”, “É”, “Ê”, etc) e os campos não utiliza dos deverão ser preenchidos com brancos.
 * 
 *  Numérico (picture 9): alinhado à direita com zeros à esquerda e os campos não utilizados deverão ser preenchidos 
 * com zeros. - Vírgula assumida (picture V): indica a posição da vírgula dentro de um campo numérico. 
 * Exemplo: num campo com picture “9(5)V9(2)”, o número “876,54” será representado por “0087654”
 * @param {*} picture 
 * @param {*} value 
 */
const usePicture = function (picture, value = '') {
  if (picture.indexOf('V9') > 0 || picture.startsWith('9')) {
    const out = regexPicture(/9\((\w+?)\)/g, picture)
    while (value.length < out[0]) {
      value = '0' + value;
    }
    return value;
  } else if (picture.startsWith('X')) {
    const out = regexPicture(/X\((\w+?)\)/g, picture)
    while (value.length < out[0]) {
      value = value + ' ';
    }
    return value;
  } else {
    console.error('ERROR');
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

module.exports = { makeLine }