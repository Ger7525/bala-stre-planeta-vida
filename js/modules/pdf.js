/* Geração do PDF: desenha cada página direto em canvas (A4) e monta o arquivo com jsPDF.
   Não depende de cópia da página na tela, então o resultado não sai em branco. */
(function (B) {
  "use strict";
  const { el, fieldValue, safeFileName } = B.utils;
  const FONT = '"Times New Roman", Times, serif';

  /** Texto de um parágrafo com os campos editáveis já substituídos pelos valores digitados. */
  function paragraphText(block) {
    if (!Array.isArray(block.s)) return block.s;
    return block.s.map((part) => (typeof part === "string" ? part : fieldValue(part.id))).join("");
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Falha ao carregar imagem"));
      img.src = src;
    });
  }

  /** Desenha todas as páginas e devolve a lista de canvases. */
  async function renderPages() {
    const cfg = B.config.pdf;
    const PX = cfg.dpi / 25.4;      // pixels por mm
    const PT = cfg.dpi / 72;        // pixels por pt
    const [mt, ml, mb, mr] = cfg.margin;
    const W = Math.round(210 * PX), H = Math.round(297 * PX);
    const left = ml * PX, right = W - mr * PX, width = right - left;
    const top = mt * PX, bottom = H - mb * PX;
    const mm = (v) => v * PX;

    const logos = { left: await loadImage(B.logos.left), right: await loadImage(B.logos.right) };
    const pages = [];
    let ctx, y;

    function newPage() {
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#1E2022";
      ctx.textBaseline = "alphabetic";
      pages.push(canvas);
      y = top;
    }
    const font = (pt, bold) => { ctx.font = (bold ? "bold " : "") + pt * PT + "px " + FONT; };
    const need = (h) => { if (y + h > bottom) newPage(); };
    function line(x1, yy, x2, color) {
      ctx.strokeStyle = color || "#999";
      ctx.lineWidth = Math.max(1, PX * 0.2);
      ctx.beginPath();
      ctx.moveTo(x1, yy);
      ctx.lineTo(x2, yy);
      ctx.stroke();
    }

    /** Quebra o texto em linhas que cabem na largura (respeita \n). */
    function wrap(text, maxW) {
      const out = [];
      String(text).split("\n").forEach((par) => {
        const words = par.split(/\s+/).filter(Boolean);
        if (!words.length) { out.push({ words: [], last: true }); return; }
        let cur = [];
        words.forEach((w) => {
          if (cur.length && ctx.measureText(cur.concat(w).join(" ")).width > maxW) {
            out.push({ words: cur, last: false });
            cur = [w];
          } else {
            cur = cur.concat(w);
          }
        });
        out.push({ words: cur, last: true });
      });
      return out;
    }

    function drawText(text, opts) {
      const o = Object.assign({ pt: cfg.fontSize, bold: false, align: "justify", gap: 1.5 }, opts);
      font(o.pt, o.bold);
      const lh = o.pt * PT * 1.45;
      wrap(text, width).forEach((ln) => {
        need(lh);
        const base = y + lh * 0.75;
        const str = ln.words.join(" ");
        if (o.align === "center") {
          ctx.fillText(str, left + (width - ctx.measureText(str).width) / 2, base);
        } else if (o.align === "justify" && !ln.last && ln.words.length > 1) {
          const total = ln.words.reduce((s, w) => s + ctx.measureText(w).width, 0);
          const space = (width - total) / (ln.words.length - 1);
          let x = left;
          ln.words.forEach((w) => { ctx.fillText(w, x, base); x += ctx.measureText(w).width + space; });
        } else {
          ctx.fillText(str, left, base);
        }
        y += lh;
      });
      y += mm(o.gap);
    }

    function drawHeader() {
      const logoW = mm(26);
      const lh = logoW * logos.left.height / logos.left.width;
      const rh = logoW * logos.right.height / logos.right.width;
      const h = Math.max(lh, rh);
      ctx.drawImage(logos.left, left, y + (h - lh) / 2, logoW, lh);
      ctx.drawImage(logos.right, right - logoW, y + (h - rh) / 2, logoW, rh);

      const titles = B.config.headerTitles;
      const avail = width - 2 * logoW - mm(6);
      let pt = 13;
      font(pt, true);
      const widest = Math.max(...titles.map((t) => ctx.measureText(t).width));
      if (widest > avail) { pt = pt * avail / widest; font(pt, true); }
      const lineH = pt * PT * 1.4;
      const startY = y + (h - lineH * titles.length) / 2;
      titles.forEach((t, i) => {
        ctx.fillText(t, left + (width - ctx.measureText(t).width) / 2, startY + lineH * i + lineH * 0.75);
      });
      y += h + mm(3);
      line(left, y, right, "#E63946");   // filete vermelho sob o cabeçalho
      y += mm(6);
    }

    function drawRoles() {
      const gap = mm(5), cellW = (width - 2 * gap) / 3, rowH = mm(8);
      for (let i = 0; i < B.roles.length; i += 3) {
        need(rowH);
        for (let j = 0; j < 3 && i + j < B.roles.length; j++) {
          const [label, id] = B.roles[i + j];
          const value = fieldValue(id);
          const x = left + j * (cellW + gap), base = y + rowH * 0.7;
          const measure = (pt) => {
            font(pt, true);
            const a = ctx.measureText(label + " ").width;
            font(pt, false);
            return a + ctx.measureText(value).width;
          };
          let pt = cfg.fontSize;
          while (pt > 7 && measure(pt) > cellW) pt -= 0.5;
          font(pt, true);
          ctx.fillText(label, x, base);
          const labelW = ctx.measureText(label + " ").width;
          font(pt, false);
          ctx.fillText(value, x + labelW, base);
          line(x, y + rowH - mm(0.8), x + cellW);
        }
        y += rowH + mm(1);
      }
      y += mm(2);
    }

    function drawField(id) {
      const value = fieldValue(id);
      if (value) { drawText(value); return; }
      need(mm(8));              // campo vazio: linha para escrever à mão
      line(left, y + mm(6), right);
      y += mm(8);
    }

    function drawSignatures() {
      need(mm(62));
      font(cfg.fontSize - 1, false);
      const label = (text, cx, yy) =>
        ctx.fillText(text, cx - ctx.measureText(text).width / 2, yy + mm(5));

      y += mm(24);
      const cw = width * 0.5;
      line(left + (width - cw) / 2, y, left + (width + cw) / 2, "#000");
      label("V∴M∴", left + width / 2, y);

      y += mm(26);
      const sw = width * 0.4;
      line(left, y, left + sw, "#000");
      line(right - sw, y, right, "#000");
      label("Orador", left + sw / 2, y);
      label("Secretário", right - sw / 2, y);
      y += mm(8);
    }

    newPage();
    drawHeader();
    B.blocks.forEach((block) => {
      switch (block.k) {
        case "h":
          need(mm(16));         // título nunca fica sozinho no fim da página
          y += mm(3);
          drawText(block.s, { bold: true, align: "center", gap: 1 });
          break;
        case "p": drawText(paragraphText(block)); break;
        case "f": drawField(block.id); break;
        case "roles": drawRoles(); break;
        case "sign": drawSignatures(); break;
      }
    });
    return pages;
  }

  /** "Balaústre - 21 de Fevereiro de 2026.pdf", a partir da data informada na página. */
  function fileName() {
    const { fileNamePrefix, dateFieldIds } = B.config;
    const date = [dateFieldIds.day, dateFieldIds.month, dateFieldIds.year]
      .map(fieldValue).filter(Boolean).join(" de ");
    return safeFileName(date ? fileNamePrefix + " - " + date : fileNamePrefix) + ".pdf";
  }

  async function render() {
    const cfg = B.config.pdf;
    const pages = await renderPages();
    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: cfg.format, orientation: cfg.orientation, compress: true });
    pages.forEach((canvas, i) => {
      if (i) pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/jpeg", cfg.quality), "JPEG", 0, 0, 210, 297);
    });
    return pdf.output("blob");
  }

  /** Entrega o arquivo: pela capability de downloads do Claude, ou download normal do navegador. */
  async function deliver(blob, name) {
    let downloads = null;
    try {
      downloads = window.claude && window.claude.use ? await window.claude.use("downloads") : null;
    } catch (e) { /* segue com o download do navegador */ }

    if (downloads) {
      await downloads.save({ filename: name, data: blob });
      return;
    }
    const link = el("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 10000);
  }

  async function generate() {
    const blob = await render();
    await deliver(blob, fileName());
  }

  B.pdf = { fileName, generate, renderPages };
})(window.Balaustre);
