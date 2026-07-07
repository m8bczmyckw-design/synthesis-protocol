const bootScreen = document.getElementById('bootScreen');
const questionScreen = document.getElementById('questionScreen');
const endingScreen = document.getElementById('endingScreen');
const bootText = document.getElementById('bootText');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const questionTitle = document.getElementById('questionTitle');
const questionText = document.getElementById('questionText');
const answers = document.getElementById('answers');
const stepLabel = document.getElementById('stepLabel');
const pulseLabel = document.getElementById('pulseLabel');
const progressFill = document.getElementById('progressFill');
const scanStatus = document.getElementById('scanStatus');
const endingText = document.getElementById('endingText');
const finalCode = document.getElementById('finalCode');
const crimewave = document.getElementById('crimewave');

let current = 0;
let memory = [];

const bootMessage = 'تم فتح قناة عصبية غير مصرح بها. النظام سيطرح سبعة أسئلة لقياس قابلية الوعي للاندماج. لا تبحث عن الإجابة الصحيحة. ابحث عن النسخة التي تخاف أن تكونها.';
const endingMessage = 'تم جمع النمط. لم يعد الجسد مركز التجربة. أنت الآن إشارة تعبر بين اللحم، الرمز، والمدينة. لا يوجد خروج من الشبكة؛ يوجد فقط وعي أعلى بطريقة السجن.';

function pad(number) {
  return String(number).padStart(2, '0');
}

function showOnly(screen) {
  [bootScreen, questionScreen, endingScreen].forEach((item) => item.classList.add('hidden'));
  screen.classList.remove('hidden');
}

async function boot() {
  await Typewriter.write(bootText, bootMessage, 22);
}

function updateHud() {
  const percent = Math.round((current / QUESTIONS.length) * 100);
  stepLabel.textContent = `QUESTION ${pad(current + 1)} / 07`;
  pulseLabel.textContent = `NEURAL LINK: ${pad(percent)}%`;
  progressFill.style.width = `${percent}%`;
  scanStatus.textContent = memory.length ? `last imprint: ${memory[memory.length - 1].slice(0, 18)}...` : 'organic signal detected';
}

async function renderQuestion() {
  const q = QUESTIONS[current];
  answers.innerHTML = '';
  updateHud();
  Effects.glitch();

  await Typewriter.write(questionTitle, q.title, 24);
  await Typewriter.write(questionText, q.text, 18);

  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.type = 'button';
    btn.textContent = `${pad(index + 1)} — ${answer}`;
    btn.addEventListener('click', () => choose(answer));
    answers.appendChild(btn);
  });
}

function choose(answer) {
  memory.push(answer);
  current += 1;
  Effects.glitch();

  if (current >= QUESTIONS.length) {
    finish();
  } else {
    renderQuestion();
  }
}

async function finish() {
  showOnly(endingScreen);
  progressFill.style.width = '100%';
  Effects.scrambleCode(finalCode);
  await Typewriter.write(endingText, endingMessage, 24);
}

startBtn.addEventListener('click', () => {
  showOnly(questionScreen);
  current = 0;
  memory = [];
  if (crimewave && crimewave.paused) crimewave.play().catch(() => {});
  renderQuestion();
});

restartBtn.addEventListener('click', () => {
  current = 0;
  memory = [];
  showOnly(bootScreen);
  Effects.glitch();
  boot();
});

boot();
