import { readYaml, readLine } from './utils';

/**
 * ARQUIVO REMESSA
 * @param {*} files 
 * @param {*} cnabtype 
 * @param {*} bankcode 
 */
export const generateRemessaCnab = (files, cnabtype = 400, bankcode = '237') => {
  try {
    const yamls = [];
    for (const key in files) {
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
      console.log(i);
      return readLine(i.layout, i.data);
    });

    const infosLine = infos.map(i => {
      return i.line
    });

    const CNAB_EOL = '\r\n';
    const data = infosLine.join(CNAB_EOL);
    return data;
  } catch (e) {
    console.log(`generateRemessaCnab`, e);
  }
}
