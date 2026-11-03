/* Blocos visuais reutilizados na página e no PDF */
(function (B) {
  "use strict";
  const { el } = B.utils;

  function header() {
    const wrap = el("div", "head");
    const left = el("img");
    left.src = B.logos.left;
    left.alt = "GOIPE";
    const right = el("img");
    right.src = B.logos.right;
    right.alt = "A∴R∴L∴S∴ Planeta Vida Nº 59";

    const titles = el("div");
    B.config.headerTitles.forEach((t) => titles.append(el("h1", null, t)));

    wrap.append(left, titles, right);
    return wrap;
  }

  function signatures() {
    const wrap = el("div", "sign");
    wrap.append(el("div", "center", "V∴M∴"), el("div", null, "Orador"), el("div", null, "Secretário"));
    return wrap;
  }

  B.components = { header, signatures };
})(window.Balaustre);
