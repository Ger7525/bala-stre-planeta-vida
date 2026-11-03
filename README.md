# Balaústre – Magna Sessão de Companheiro

Página web que reproduz o balaústre da A∴R∴L∴S∴ Planeta Vida Nº 59. Os campos em vermelho são preenchidos na tela e o botão **Gerar PDF** exporta o documento completo em A4.

## Como usar
Abra o `index.html` no navegador (é preciso internet para carregar a biblioteca de PDF).
O PDF é salvo como `Balaústre - <dia> de <mês> de <ano>.pdf`, usando a data digitada na página.

## Estrutura
```
index.html              página
css/
  variables.css         cores e temas (claro/escuro)
  base.css              layout, cabeçalho, títulos, assinaturas
  form.css              campos em vermelho, legenda e botão
js/
  data/
    blocks.js           textos fixos e campos, na ordem do documento
    roles.js            cargos (V∴M∴, Vigilantes, etc.)
    logos.js            logos em base64
  config.js             nome do PDF, margens, formato
  modules/
    utils.js            funções auxiliares
    components.js       cabeçalho e assinaturas (usados na página e no PDF)
    form.js             monta o formulário
    pdf.js              desenha as páginas e gera o PDF
  main.js               ponto de entrada
```

## Como alterar
- **Texto fixo, novo campo ou nova seção:** `js/data/blocks.js`
- **Cargos:** `js/data/roles.js`
- **Nome do arquivo PDF, margens, formato:** `js/config.js`
- **Visual:** arquivos em `css/`
