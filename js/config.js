/* Configurações gerais */
window.Balaustre = window.Balaustre || {};

Balaustre.config = {
  /* Títulos do cabeçalho (página e PDF) */
  headerTitles: [
    "A GLÓRIA DO GRANDE ARQUITETO DO UNIVERSO",
    "GRANDE ORIENTE INDEPENDENTE DE PERNAMBUCO",
    "A∴R∴L∴S∴ PLANETA VIDA Nº 59"
  ],

  /* Nome do PDF: "<prefixo> - <dia> de <mês> de <ano>.pdf" (usa a data digitada na página) */
  fileNamePrefix: "Balaústre",
  dateFieldIds: { day: "dia", month: "mes", year: "ano" },

  /* Ano da V.L. = ano da E.V. + este valor (atualizado automaticamente) */
  yearVlOffset: 4000,
  yearFieldId: "ano",
  yearVlFieldId: "vl",

  pdf: {
    margin: [12, 14, 14, 14], // mm: topo, esquerda, base, direita
    format: "a4",
    orientation: "portrait",
    dpi: 200,                 // resolução do texto no PDF
    quality: 0.92,            // qualidade JPEG das páginas
    fontSize: 11              // pt
  }
};
