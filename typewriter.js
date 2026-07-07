window.typeText = function typeText(element, text, speed = 28) {
  return new Promise(resolve => {
    element.textContent = '';
    let i = 0;
    const tick = () => {
      element.textContent += text.charAt(i);
      i += 1;
      if (i < text.length) setTimeout(tick, speed + Math.random() * 24);
      else resolve();
    };
    tick();
  });
};
