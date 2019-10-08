// tslint:disable:variable-name

import { generateRemessaCnab } from './remessa'
const dayjs = require('dayjs')

export function helperGenerateRemessaCNAB400(dadosGeracao: any, bankCode: any) {
  const Return: any = []

  /**
   * Header - Arquivo
   */
  const header_arquivo: any = {
    codigo_inscricao: dadosGeracao.codigo_inscricao,
    numero_inscricao: dadosGeracao.numero_inscricao,
    codigo_convenio: dadosGeracao.codigo_convenio,
    agencia: dadosGeracao.agencia,
    conta_corrente: dadosGeracao.conta_corrente,
    conta_corrente_dv: dadosGeracao.conta_corrente_dv,
    nome_empresa: dadosGeracao.nome_empresa,
    data_geracao: dayjs(dadosGeracao.data_geracao).format('DDMMYYYY'),
    hora_geracao: dayjs(dadosGeracao.data_geracao).format('HHmmss'),
    numero_sequencial_arquivo: dadosGeracao.numero_sequencial_arquivo
  }
  Return.push({ header_arquivo })

  return Return.map((Row: any) => generateRemessaCnab(Row, 400, bankCode)).join('\n')
}
