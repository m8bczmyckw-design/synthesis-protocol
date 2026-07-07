const Effects = (() => {
  const scanCanvas = document.getElementById('scanCanvas');
  const ctx = scanCanvas.getContext('2d');
  let w;
  let h;
  let t = 0;

  function resize() {
    w = scanCanvas.width = window.innerWidth * window.devicePixelRatio;
    h = scanCanvas.height = window.innerHeight * window.devicePixelRatio;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    t += 0.012;

    for (let i = 0; i < 7; i++) {
      const y = ((Math.sin(t + i) + 1) / 2) * h;
      ctx.strokeStyle = i % 2 ? 'rgba(255,43,214,.16)' : 'rgba(0,255,138,.18)';
      ctx.lineWidth = 1 * window.devicePixelRatio;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < w; x += 80) {
        ctx.lineTo(x, y + Math.sin(x * 0.01 + t * 8 + i) * 18);
      }
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  function glitch() {
    document.body.classList.add('flash');
    setTimeout(() => document.body.classList.remove('flash'), 280);
  }

  function scrambleCode(element) {
    const chars = '01SYNTHESISPROTOCOLΔΩ//:';
    let count = 0;
    const interval = setInterval(() => {
      element.textContent = Array.from({ length: 22 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      count++;
      if (count > 22) {
        clearInterval(interval);
        element.textContent = 'SYNTHESIS://READY';
      }
    }, 55);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  return { glitch, scrambleCode };
})();
