(() => {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  const glyphs = '01アイウエオカキクケコサシスセソ人機械夢記憶神経回路';
  let w, h, columns, drops;

  function resize() {
    w = canvas.width = innerWidth * devicePixelRatio;
    h = canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    const font = 16 * devicePixelRatio;
    columns = Math.floor(w / font);
    drops = Array.from({ length: columns }, () => Math.random() * h / font);
  }

  function draw() {
    const font = 16 * devicePixelRatio;
    ctx.fillStyle = 'rgba(0, 8, 5, 0.12)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${font}px monospace`;
    ctx.textAlign = 'center';

    for (let i = 0; i < drops.length; i++) {
      const x = i * font;
      const y = drops[i] * font;
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillStyle = Math.random() > 0.985 ? '#d8ffe6' : '#00ff7b';
      ctx.globalAlpha = Math.random() * 0.55 + 0.16;
      ctx.fillText(char, x, y);
      if (y > h && Math.random() > 0.97) drops[i] = 0;
      drops[i] += 0.55 + Math.random() * 0.6;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  window.drawMiniBody = function(progress = 0) {
    const c = document.getElementById('miniBodyCanvas');
    if (!c) return;
    const cx = c.getContext('2d');
    const rect = c.getBoundingClientRect();
    c.width = rect.width * devicePixelRatio;
    c.height = rect.height * devicePixelRatio;
    const W = c.width, H = c.height, mid = W / 2;
    cx.clearRect(0, 0, W, H);
    cx.strokeStyle = '#00ff8a';
    cx.lineWidth = 2 * devicePixelRatio;
    cx.shadowBlur = 12 * devicePixelRatio;
    cx.shadowColor = '#00ff8a';
    const bob = Math.sin(Date.now() / 700) * 5 * devicePixelRatio;
    cx.beginPath();
    cx.arc(mid, H * .18 + bob, W * .09, 0, Math.PI * 2);
    cx.moveTo(mid, H * .27 + bob); cx.lineTo(mid, H * .56 + bob);
    cx.moveTo(mid, H * .34 + bob); cx.lineTo(W * .27, H * .46 + bob);
    cx.moveTo(mid, H * .34 + bob); cx.lineTo(W * .73, H * .46 + bob);
    cx.moveTo(mid, H * .56 + bob); cx.lineTo(W * .36, H * .83 + bob);
    cx.moveTo(mid, H * .56 + bob); cx.lineTo(W * .64, H * .83 + bob);
    cx.stroke();
    cx.shadowBlur = 0;
    cx.fillStyle = 'rgba(255,48,196,.75)';
    cx.fillRect(W * .18, H * (0.92 - progress * .72), W * .64, 3 * devicePixelRatio);
    requestAnimationFrame(() => window.drawMiniBody(progress));
  };
})();
