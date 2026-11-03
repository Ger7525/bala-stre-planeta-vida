/* Funções utilitárias */
(function (B) {
  "use strict";

  /** Cria um elemento (texto sempre via textContent, nunca innerHTML). */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /** Valor (sem espaços nas pontas) do campo com data-id informado. */
  function fieldValue(id) {
    const node = document.querySelector('[data-id="' + id + '"]');
    return node ? node.value.trim() : "";
  }

  /** Ajusta a altura de um textarea ao conteúdo. */
  function autoGrow(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 4 + "px";
  }

  /** Remove caracteres inválidos em nomes de arquivo e espaços repetidos. */
  function safeFileName(name) {
    return name.replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim();
  }

  B.utils = { el, fieldValue, autoGrow, safeFileName };
})(window.Balaustre);
