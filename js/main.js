/* Ponto de entrada */
(function (B) {
  "use strict";

  function init() {
    const button = document.getElementById("btn-pdf");
    const status = document.getElementById("status");

    B.form.render(document.getElementById("doc"));
    B.form.bindYearSync();

    button.addEventListener("click", async () => {
      button.disabled = true;
      status.textContent = "Gerando o PDF…";
      try {
        await B.pdf.generate();
        status.textContent = "PDF pronto.";
      } catch (e) {
        status.textContent = e && e.code === "declined" ? "Download cancelado." : "Não foi possível gerar o PDF. Tente novamente.";
      }
      button.disabled = false;
    });
  }

  init();
})(window.Balaustre);
