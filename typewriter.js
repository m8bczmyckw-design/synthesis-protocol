const Typewriter = (() => {
  let activeTimer = null;

  function write(element, text, speed = 28) {
    clearTimeout(activeTimer);
    element.textContent = '';
    let index = 0;

    return new Promise((resolve) => {
      function tick() {
        element.textContent += text.charAt(index);
        index += 1;
        if (index <= text.length) {
          activeTimer = setTimeout(tick, speed + Math.random() * 18);
        } else {
          resolve();
        }
      }
      tick();
    });
  }

  return { write };
})();
