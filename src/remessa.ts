import { readYaml, readLine } from './utils'
import { CNAB_YAML_DIR } from './const'

/**
 * ARQUIVO REMESSA
 * @param {*} files
 * @param {*} cnabtype
 * @param {*} bankcode
 */
export const generateRemessaCnab = (files: any, cnabtype = 400, bankcode = '237') => {
  try {
    const yamls = []
    for (const key in files) {
      const value = files[key]
      if (value.forEach) {
        value.forEach((v: any) => {
          const layout = readYaml(CNAB_YAML_DIR + `/cnab${cnabtype}/${bankcode}/remessa/${key}.yml`)
          yamls.push({
            layout,
            data: v
          })
        })
      } else {
        const layout = readYaml(CNAB_YAML_DIR + `/cnab${cnabtype}/${bankcode}/remessa/${key}.yml`)
        yamls.push({
          layout,
          data: value
        })
      }
    }

    const infos = yamls.map((i, index) => {
      return readLine(i.layout, i.data)
    })

    const infosLine = infos.map(i => {
      return i.line
    })

    const CNAB_EOL = '\r\n'
    const data = infosLine.join(CNAB_EOL)
    return data
  } catch (e) {
    console.error(`generateRemessaCnab`, e)
  }
}
