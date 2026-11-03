/* Formulário da página: renderiza os blocos com campos editáveis */
(function (B) {
  "use strict";
  const { el, autoGrow } = B.utils;

  function inlineField(part) {
    const input = el("input", "inline-field");
    input.type = "text";
    input.value = part.d;
    input.size = part.w;
    input.autocomplete = "off";
    input.dataset.id = part.id;
    input.setAttribute("aria-label", part.id);
    return input;
  }

  function paragraph(block) {
    const p = el("p");
    const parts = Array.isArray(block.s) ? block.s : [block.s];
    parts.forEach((part) => p.append(typeof part === "string" ? part : inlineField(part)));
    return p;
  }

  function roles() {
    const grid = el("div", "roles");
    B.roles.forEach(([label, id]) => {
      const wrap = el("div", "role");
      const labelEl = el("label", null, label);
      const input = el("input");
      input.type = "text";
      input.id = "role_" + id;
      input.autocomplete = "off";
      input.dataset.id = id;
      labelEl.htmlFor = input.id;
      wrap.append(labelEl, input);
      grid.append(wrap);
    });
    return grid;
  }

  function textField(block) {
    const area = el("textarea");
    area.dataset.id = block.id;
    area.rows = block.rows;
    area.placeholder = block.ph;
    area.setAttribute("aria-label", block.ph);
    area.addEventListener("input", () => autoGrow(area));
    return area;
  }

  const renderers = {
    p: paragraph,
    h: (block) => el("h2", null, block.s),
    f: textField,
    roles: roles,
    sign: B.components.signatures
  };

  /** Monta o formulário completo dentro de `root`. */
  function render(root) {
    root.append(B.components.header());
    B.blocks.forEach((block) => root.append(renderers[block.k](block)));
  }

  /** Mantém o ano da V.L. sincronizado com o ano da E.V. */
  function bindYearSync() {
    const { yearFieldId, yearVlFieldId, yearVlOffset } = B.config;
    const year = document.querySelector('[data-id="' + yearFieldId + '"]');
    const vl = document.querySelector('[data-id="' + yearVlFieldId + '"]');
    if (!year || !vl) return;
    year.addEventListener("input", () => {
      const n = parseInt(year.value, 10);
      if (n > 0) vl.value = n + yearVlOffset;
    });
  }

  B.form = { render, bindYearSync };
})(window.Balaustre);
