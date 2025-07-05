let lang = 'hi';
let score = 0;
let timeLeft = 30;
let timerInterval;
let sounds = { correct: new Audio('correct.mp3'), wrong: new Audio('wrong.mp3'), bg: new Audio('bgmusic.mp3') };
sounds.bg.loop = true;

const texts = {
  hi: {
    start: "▶️ शुरू करें",
    lang: "🌐 भाषा बदलें",
    sound: "🔊 ध्वनि",
    howTo: "उत्तर चुनें और समय समाप्त होने से पहले अधिकतम अंक प्राप्त करें।",
    final: "आपका स्कोर: ",
    replay: "🔁 फिर से खेलें",
    home: "🏠 होम"
  },
  en: {
    start: "▶️ Start",
    lang: "🌐 Change Language",
    sound: "🔊 Sound",
    howTo: "Choose the correct answer before time runs out.",
    final: "Your Score: ",
    replay: "🔁 Play Again",
    home: "🏠 Home"
  }
};

function toggleLang() {
  lang = lang === 'hi' ? 'en' : 'hi';
  document.querySelector("button").innerText = texts[lang].start;
  document.querySelectorAll("button")[1].innerText = texts[lang].lang;
  document.querySelectorAll("button")[2].innerText = texts[lang].sound;
  document.getElementById("howToPlay").innerText = texts[lang].howTo;
  document.querySelector("#gameOverScreen h2").innerText = texts[lang].final + score;
  document.querySelectorAll("#gameOverScreen button")[0].innerText = texts[lang].replay;
  document.querySelectorAll("#gameOverScreen button")[1].innerText = texts[lang].home;
}

function toggleSound() {
  if (sounds.bg.paused) sounds.bg.play();
  else sounds.bg.pause();
}

function startGame() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("gameOverScreen").style.display = "none";
  score = 0;
  timeLeft = 30;
  updateScore();
  generateQuestion();
  timerInterval = setInterval(updateTimer, 1000);
  sounds.bg.play();
}

function updateTimer() {
  document.getElementById("timer").innerText = `⏱️ ${timeLeft}`;
  if (timeLeft <= 0) endGame();
  timeLeft--;
}

function updateScore() {
  document.getElementById("score").innerText = `🏆 ${score}`;
}

function generateQuestion() {
  const a = Math.floor(Math.random() * 20);
  const b = Math.floor(Math.random() * 20);
  const ops = ['+', '-', '*', '/'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const question = `${a} ${op} ${b}`;
  let answer = eval(op === '/' ? `${a} / ${b || 1}` : question);
  answer = Math.round(answer * 100) / 100;

  document.getElementById("questionArea").innerText = question;
  const optionsArea = document.getElementById("optionsArea");
  optionsArea.innerHTML = '';
  const correctPos = Math.floor(Math.random() * 4);
  for (let i = 0; i < 4; i++) {
    const btn = document.createElement("button");
    if (i === correctPos) btn.innerText = answer;
    else btn.innerText = answer + Math.floor(Math.random() * 10) - 5;
    btn.onclick = () => {
      if (btn.innerText == answer) {
        score++;
        sounds.correct.play();
      } else {
        sounds.wrong.play();
      }
      updateScore();
      generateQuestion();
    };
    optionsArea.appendChild(btn);
  }
}

function endGame() {
  clearInterval(timerInterval);
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "block";
  document.getElementById("finalScore").innerText = texts[lang].final + score;
}

function goHome() {
  document.getElementById("homeScreen").style.display = "block";
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "none";
}