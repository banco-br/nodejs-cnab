import { makeLine, readYaml } from './utils';

/**
 * ARQUIVO RETORNO
 * @param {*} files 
 * @param {*} cnabtype 
 * @param {*} bankcode 
 */
export const parseRemessaCnab = (files, cnabtype = 400, bankcode = '237') => {
  try {
    const yamls = [];
    console.log(files)
    for (const key in files) {
      const value = files[key];
      if (value.forEach) {
        value.forEach(v => {
          const layout = readYaml(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/retorno/${key}.yml`);
          yamls.push({
            layout,
            data: v
          });
        });

      } else {
        const layout = readYaml(`./node_modules/cnab_yaml/cnab${cnabtype}/${bankcode}/retorno/${key}.yml`);
        yamls.push({
          layout,
          data: value
        });
      }
    }

    const infos = yamls.map((i, index) => {
      console.log(`infos`, i.layout, i.data);
      return makeLine(i.layout, i.data);
    });

    const infosLine = infos.map(i => {
      return i.line
    });

    const CNAB_EOL = '\r\n';
    const data = infosLine.join(CNAB_EOL);
    return data;
  } catch (e) {
    console.log(`parseRemessaCnab: `, e);
  }
}
