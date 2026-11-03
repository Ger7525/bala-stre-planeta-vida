/* Estrutura do documento, na ordem em que aparece na página e no PDF.
   Tipos de bloco:
     { k: "p",     s: "texto" | [partes] }  parágrafo fixo; partes podem conter campos { id, d (padrão), w (largura) }
     { k: "h",     s: "TÍTULO" }            título de seção
     { k: "f",     id, rows, ph }            área de digitação (campo em vermelho)
     { k: "roles" }                          grade de cargos (ver roles.js)
     { k: "sign" }                           linhas de assinatura                              */
window.Balaustre = window.Balaustre || {};
Balaustre.blocks = [
 {k:"p",s:["Às ",{id:"hora",d:"09:30",w:6}," horas do dia ",{id:"dia",d:"21",w:3}," do Mês de ",{id:"mes",d:"Fevereiro",w:10}," e ano ",{id:"ano",d:"2026",w:5}," da E.V. e ",{id:"vl",d:"6026",w:5}," da V.L. reuniram-se os OObr∴ da A∴R∴L∴S∴ PLANETA VIDA Nº 59, no Oriente de Recife-PE, no Templo sito à rua da Penha nº45, em sessão ",{id:"grau",d:"Magna grau de companheiro Maçom",w:30}," presentes os IIr∴ que assinaram o Livro de Presença. Os cargos foram ocupados pelos titulares."]},
 {k:"roles"},
 {k:"f",id:"visit",rows:2,ph:"Visitantes e autoridades presentes (ex.: também tivemos o irmão …)"},
 {k:"h",s:"EXPEDIENTE"},{k:"f",id:"exp",rows:3,ph:"Digite o expediente"},
 {k:"h",s:"SACO DE PROPOSTA E INFORMAÇÕES"},
 {k:"p",s:"O V∴ M∴ determinou o giro do saco de propostas e informações, que recolheu além de fluidos benéficos."},
 {k:"f",id:"saco",rows:3,ph:"O que foi recolhido"},
 {k:"h",s:"ORDEM DO DIA"},{k:"f",id:"ordem",rows:3,ph:"Digite a ordem do dia"},
 {k:"h",s:"PERÍODO DE INSTRUÇÃO"},{k:"f",id:"instr",rows:2,ph:"Digite o período de instrução"},
 {k:"h",s:"TRONCO DE BENEFICÊNCIA"},
 {k:"p",s:["O tronco de beneficência fez seu giro com o Ir∴ Hosp∴ e foi entregue ao Ir∴ Or∴ para contagem o qual coletou R$: ",{id:"tronco",d:"36,00",w:8}," em moedas cunhadas."]},
 {k:"h",s:"PALAVRA A BEM DA ORDEM EM GERAL E DO QUADRO EM PARTICULAR."},
 {k:"p",s:"O V∴M∴ Solicitou que os IIr∴ VVig∴ anunciassem a palavra em suas CCol∴, Sobre o ato o que foi feito."},
 {k:"h",s:"NA COL∴ DO SUL."},{k:"f",id:"sul",rows:5,ph:"Palavras na Coluna do Sul"},
 {k:"h",s:"NA COL∴ DO NORTE."},{k:"f",id:"norte",rows:5,ph:"Palavras na Coluna do Norte"},
 {k:"h",s:"NO ORIENTE."},{k:"f",id:"oriente",rows:7,ph:"Palavras no Oriente"},
 {k:"h",s:"O V∴M∴ TECEU CONSIDERAÇÕES SOBRE."},{k:"f",id:"consid",rows:4,ph:"Considerações do Venerável Mestre"},
 {k:"h",s:"A SEGUIR PASSOU A PALAVRA AO IR∴ ORADOR PARA AS CONCLUSÕES FINAIS"},{k:"f",id:"concl",rows:3,ph:"Conclusões do Orador"},
 {k:"h",s:"BALAUSTRE"},{k:"f",id:"bal",rows:2,ph:"Ex.: ficou sob malhete"},
 {k:"h",s:"ENCERRAMENTO"},
 {k:"p",s:["os trabalhos foram encerrados Ritualisticamente, eram ",{id:"hfim",d:"12:13",w:6}," m quando os trabalhos foram encerrados."]},
 {k:"p",s:["eu ",{id:"secnome",d:"Germano Santos",w:16}," Secretário, lavrei esse balaústre longe de vistas profanas e em lugar ermo."]},
 {k:"sign"}
];
