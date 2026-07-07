window.Effects = (() => {
  const alarm = () => document.getElementById('alarm');
  function glitch(duration = 420) {
    document.body.classList.add('shake');
    alarm()?.classList.remove('hidden');
    setTimeout(() => {
      document.body.classList.remove('shake');
      alarm()?.classList.add('hidden');
    }, duration);
  }
  function bootLog(lines) {
    const box = document.getElementById('bootLog');
    box.innerHTML = '';
    lines.forEach((line, i) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.textContent = '> ' + line;
        box.appendChild(p);
        box.scrollTop = box.scrollHeight;
      }, i * 260);
    });
  }
  return { glitch, bootLog };
})();
