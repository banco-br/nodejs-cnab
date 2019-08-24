// tslint:disable:variable-name

const { generateRemessaCnab } = require('./nodejs-cnab')
const { isCNPJ, isCPF } = require('brazilian-values')
const dayjs = require('dayjs')

export function helperGenerateRemessaCNAB240(dadosGeracao: any, bankCode: any) {
  const Return = []

  /**
   * Header - Arquivo
   */

  const header_arquivo: any = {
    codigo_inscricao: dadosGeracao.codigo_inscricao,
    numero_inscricao: dadosGeracao.numero_inscricao,
    codigo_convenio: dadosGeracao.codigo_convenio,
    agencia: dadosGeracao.agencia,
    codigo_cedente: dadosGeracao.codigo_cedente,
    codigo_cedente_dv: dadosGeracao.codigo_cedente_dv,
    nome_empresa: dadosGeracao.nome_empresa,
    data_geracao: dayjs(dadosGeracao.data_geracao).format('DDMMYYYY'),
    hora_geracao: dayjs(dadosGeracao.data_geracao).format('HHmmss'),
    numero_sequencial_arquivo: dadosGeracao.numero_sequencial_arquivo
  }
  Return.push({ header_arquivo })

  /**
   * Header - Lote
   */
  const header_lote = {
    codigo_inscricao: dadosGeracao.codigo_inscricao,
    numero_inscricao: dadosGeracao.numero_inscricao,
    codigo_convenio: dadosGeracao.codigo_convenio,
    agencia: dadosGeracao.agencia,
    codigo_cedente: dadosGeracao.codigo_cedente,
    codigo_cedente_dv: dadosGeracao.codigo_cedente_dv,
    nome_empresa: dadosGeracao.nome_empresa,
    data_geracao: header_arquivo.data_geracao,
    numero_sequencial_arquivo: dadosGeracao.numero_sequencial_arquivo
  }
  Return.push({ header_lote })

  /**
   * Detalhe Segmento
   */
  let numero_sequencial_lote = 0
  dadosGeracao.detalhe_segmento.forEach((detalhe_segmento: any) => {
    /**
     * Detalhe Segmento P
     */
    numero_sequencial_lote++
    const detalhe_segmento_p = {
      numero_sequencial_lote,
      agencia: dadosGeracao.agencia,
      codigo_cedente: dadosGeracao.codigo_cedente,
      codigo_cedente_dv: dadosGeracao.codigo_cedente_dv,
      nosso_numero: detalhe_segmento.nosso_numero,
      numero_documento: detalhe_segmento.numero_documento,
      vencimento: dayjs(detalhe_segmento.vencimento).format('DDMMYYYY'),
      valor_titulo: detalhe_segmento.valor_titulo.toFixed(2).replace('.', ','),
      data_emissao: dayjs(detalhe_segmento.data_emissao).format('DDMMYYYY'),
      uso_empresa: detalhe_segmento.uso_empresa
    }
    Return.push({ detalhe_segmento_p })

    /**
     * Detalhe Segmento Q
     */
    numero_sequencial_lote++
    let sacado_codigo_inscricao = 3
    if (isCPF(detalhe_segmento.sacado_numero_inscricao)) sacado_codigo_inscricao = 1
    if (isCNPJ(detalhe_segmento.sacado_numero_inscricao)) sacado_codigo_inscricao = 2

    const detalhe_segmento_q = {
      numero_sequencial_lote,
      sacado_codigo_inscricao,
      sacado_numero_inscricao: detalhe_segmento.sacado_numero_inscricao,
      nome: detalhe_segmento.nome,
      logradouro: detalhe_segmento.logradouro,
      bairro: detalhe_segmento.bairro,
      cep: detalhe_segmento.cep,
      cidade: detalhe_segmento.cidade,
      estado: detalhe_segmento.estado
    }
    Return.push({ detalhe_segmento_q })
  })

  /**
   * Trailler - Lote
   */
  const valor_total_titulo_simples = dadosGeracao.detalhe_segmento
    .map((El: any) => El.valor_titulo)
    .reduce((curr: number, total: number) => total + curr, 0)
    .toFixed(2)
    .replace('.', ',')

  const trailer_lote = {
    qtde_registro_lote: dadosGeracao.detalhe_segmento.length * 2 + 2, // Soma todas as linhas Detalhe P/Q, Header Lote e Header Trailler
    qtde_titulo_cobranca_simples: dadosGeracao.detalhe_segmento.length, //  Soma todos os P
    valor_total_titulo_simples
  }
  Return.push({ trailer_lote })

  /**
   * Trailler Arquivo
   */
  const trailer_arquivo = {
    qtde_lotes: 1,
    qtde_registros: Return.length + 1
  }

  Return.push({ trailer_arquivo })

  return Return.map(Row => generateRemessaCnab(Row, 240, bankCode)).join('\n')
}
