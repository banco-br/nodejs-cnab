const { makeLine, readYaml } = require('./src/utils.js');

/**
 * ARQUIVO REMESSA
 * @param {*} files 
 * @param {*} cnabtype 
 * @param {*} bankcode 
 */
const generateRemessaCnab = (files, cnabtype = 400, bankcode = '237') => {
  try {
    const yamls = [];
    for (key in files) {
      const value = files[key];
      if (value.forEach) {
        value.forEach(v => {
          const layout = readYaml(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/${key}.yml`);
          yamls.push({
            layout,
            data: v
          });
        });

      } else {
        const layout = readYaml(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/${key}.yml`);
        yamls.push({
          layout,
          data: value
        });
      }
    }

    const infos = yamls.map((i, index) => {
      return readLine(i.layout, i.data);
    });

    const infosLine = infos.map(i => {
      return i.line
    });

    const CNAB_EOL = '\r\n';
    const data = infosLine.join(CNAB_EOL);
    return data;
  } catch (e) {
    console.log(e);
  }
}


/**
 * ARQUIVO RETORNO
 * @param {*} files 
 * @param {*} cnabtype 
 * @param {*} bankcode 
 */
const parseRemessaCnab = (files, cnabtype = 400, bankcode = '237') => {
  try {
    const yamls = [];
    for (key in files) {
      const value = files[key];
      if (value.forEach) {
        value.forEach(v => {
          const layout = readYaml(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/${key}.yml`);
          yamls.push({
            layout,
            data: v
          });
        });

      } else {
        const layout = readYaml(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/remessa/${key}.yml`);
        yamls.push({
          layout,
          data: value
        });
      }
    }

    const infos = yamls.map((i, index) => {
      return makeLine(i.layout, i.data);
    });

    const infosLine = infos.map(i => {
      return i.line
    });

    const CNAB_EOL = '\r\n';
    const data = infosLine.join(CNAB_EOL);
    return data;
  } catch (e) {
    console.log(e);
  }
}

const BANK = require('./src/const.js');

module.exports = { generateRemessaCnab, parseRemessaCnab, BANK };
