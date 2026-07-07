(() => {
  const $ = id => document.getElementById(id);
  const questions = window.SYNTHESIS_QUESTIONS;
  let index = 0;
  let score = [];

  const bootScreen = $('bootScreen');
  const questionScreen = $('questionScreen');
  const endingScreen = $('endingScreen');
  const startBtn = $('startBtn');
  const restartBtn = $('restartBtn');

  function clock() {
    $('clock').textContent = new Date().toLocaleTimeString('en-GB');
    requestAnimationFrame(clock);
  }

  function bootOverlay() {
    const bar = $('bootBar');
    const pct = $('bootPercent');
    const txt = $('bootOverlayText');
    const lines = ['INITIALIZING NEURAL INTERFACE...', 'CALIBRATING MATRIX RAIN...', 'OPENING SYNTHESIS CHANNEL...', 'AWAITING HUMAN CONSENT...'];
    let n = 0;
    const timer = setInterval(() => {
      n += Math.floor(Math.random() * 9) + 4;
      if (n > 100) n = 100;
      bar.style.width = n + '%';
      pct.textContent = String(n).padStart(2, '0') + '%';
      txt.textContent = lines[Math.min(lines.length - 1, Math.floor(n / 28))];
      if (n === 100) {
        clearInterval(timer);
        setTimeout(() => $('bootOverlay').classList.add('off'), 500);
      }
    }, 150);
  }

  async function intro() {
    Effects.bootLog([
      'neural socket opened',
      'matrix rain synchronized',
      'synthetic fog injected',
      'human residue detected',
      'crimewave terminal standing by',
      'awaiting consent...'
    ]);
    await typeText($('bootText'), 'تم فتح قناة عصبية غير مصرّح بها. النظام سيطرح سبعة أسئلة لقياس قابلية الوعي للاندماج. لا تجب بسرعة. كل اختيار يترك أثرًا.', 22);
  }

  function swap(from, to) {
    from.classList.add('hidden');
    to.classList.remove('hidden');
    Effects.glitch();
  }

  async function showQuestion() {
    const q = questions[index];
    const progress = index / questions.length;
    $('stepLabel').textContent = `QUESTION ${String(index + 1).padStart(2, '0')} / 07`;
    $('pulseLabel').textContent = `NEURAL LINK: ${Math.round(progress * 100)}%`;
    $('progressFill').style.width = `${progress * 100}%`;
    $('scanStatus').textContent = progress < .5 ? 'organic signal unstable' : 'synthetic pattern rising';
    window.drawMiniBody(progress);

    $('questionTitle').textContent = '';
    $('questionText').textContent = '';
    $('answers').innerHTML = '';
    await typeText($('questionTitle'), q.title, 30);
    await typeText($('questionText'), q.text, 20);

    q.answers.forEach((answer, i) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.type = 'button';
      btn.textContent = answer;
      btn.onclick = () => choose(i);
      $('answers').appendChild(btn);
    });
  }

  function choose(choice) {
    score.push(choice);
    Effects.glitch(360);
    index += 1;
    if (index >= questions.length) return finish();
    setTimeout(showQuestion, 390);
  }

  async function finish() {
    $('progressFill').style.width = '100%';
    $('pulseLabel').textContent = 'NEURAL LINK: 100%';
    swap(questionScreen, endingScreen);
    const dominant = score.reduce((a, b) => a + b, 0);
    const code = dominant < 5 ? 'HUMAN_ECHO' : dominant < 10 ? 'HYBRID_SIGNAL' : 'MACHINE_ASCENT';
    $('finalCode').textContent = `SYNTHESIS://${code}`;
    await typeText($('endingText'), 'انتهت المحاكاة. لم تعد الإجابات مجرد اختيارات؛ أصبحت خريطة داخلية. النظام لا يقول إنك تحولت. النظام يقول إنك كنت في طريقك إلى ذلك منذ البداية.', 28);
  }

  startBtn.onclick = async () => {
    const audio = $('crimewave');
    try { await audio.play(); } catch(e) {}
    $('statusText').textContent = 'SIGNAL: ACTIVE';
    swap(bootScreen, questionScreen);
    showQuestion();
  };

  restartBtn.onclick = () => location.reload();
  clock();
  bootOverlay();
  intro();
})();
