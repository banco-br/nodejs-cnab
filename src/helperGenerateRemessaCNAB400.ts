// tslint:disable:variable-name

import { generateRemessaCnab } from './remessa'
const { isCNPJ, isCPF } = require('brazilian-values')
const dayjs = require('dayjs')
const { sumBy } = require('lodash')

export function helperGenerateRemessaCNAB400(dadosGeracao: any, bankCode: any) {
  const Return: any = []
  let numero_sequencial = 0

  /**
   * Header - Arquivo
   */
  numero_sequencial++
  const header_arquivo: any = {
    codigo_convenio: dadosGeracao.codigo_convenio,
    nome_empresa: dadosGeracao.nome_empresa,
    data_geracao: dayjs(dadosGeracao.data_geracao).format('DDMMYYYY'),
    numero_sequencial: Number(numero_sequencial)
  }

  Return.push({ header_arquivo })

  /**
   * Detalhe Segmento
   */
  dadosGeracao.detalhe_segmento.forEach((detalhe_segmento: any) => {
    numero_sequencial++
    let sacado_codigo_inscricao = 99

    if (isCPF(detalhe_segmento.sacado_numero_inscricao)) sacado_codigo_inscricao = 1
    if (isCNPJ(detalhe_segmento.sacado_numero_inscricao)) sacado_codigo_inscricao = 2

    const detalhe = {
      codigo_inscricao: isCNPJ(dadosGeracao.numero_inscricao) ? 2 : 1,
      numero_inscricao: dadosGeracao.numero_inscricao,
      codigo_convenio: dadosGeracao.codigo_convenio,
      uso_empresa: detalhe_segmento.uso_empresa,
      mensagem: detalhe_segmento.mensagem,
      numero_documento: detalhe_segmento.numero_documento,
      vencimento: dayjs(detalhe_segmento.vencimento).format('DDMMYYYY'),
      valor_titulo: detalhe_segmento.valor_titulo,
      data_emissao: dayjs(detalhe_segmento.data_emissao).format('DDMMYYYY'),
      sacado_codigo_inscricao,
      sacado_numero_inscricao: detalhe_segmento.sacado_numero_inscricao,
      nome: detalhe_segmento.nome,
      logradouro: detalhe_segmento.logradouro,
      bairro: detalhe_segmento.bairro,
      cep: detalhe_segmento.cep,
      cidade: detalhe_segmento.cidade,
      estado: detalhe_segmento.estado,
      numero_sequencial: Number(numero_sequencial)
    }

    Return.push({ detalhe })
  })

  /**
   * Trailler Arquivo
   */
  numero_sequencial++
  const trailer_arquivo = {
    valor_total: sumBy(dadosGeracao.detalhe_segmento, (Row: any) => Number(Row.valor_titulo)),
    numero_sequencial: Number(numero_sequencial)
  }

  Return.push({ trailer_arquivo })

  return Return.map((Row: any) => generateRemessaCnab(Row, 400, bankCode)).join('\n')
}
