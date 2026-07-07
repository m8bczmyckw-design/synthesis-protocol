(function () {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  const glyphs = '01アカサタナハマヤラワΩΔλβSYNTHESIS';
  let width;
  let height;
  let columns;
  let drops;
  let fontSize;

  function resize() {
    width = canvas.width = window.innerWidth * window.devicePixelRatio;
    height = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    fontSize = Math.max(14, Math.floor(18 * window.devicePixelRatio));
    columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -height);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 5, 3, 0.12)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const bright = Math.random() > 0.975;

      ctx.fillStyle = bright ? 'rgba(255,255,255,.85)' : 'rgba(0,255,138,.74)';
      ctx.shadowColor = '#00ff8a';
      ctx.shadowBlur = bright ? 18 : 7;
      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += Math.random() * 0.55 + 0.35;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
