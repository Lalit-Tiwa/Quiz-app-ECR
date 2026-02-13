/* =========================
   DOM ELEMENTS
========================= */

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

const quizScreen = document.getElementById("quizScreen");
const quizScreen2 = document.querySelector("#quizScreen2");
const quizScreen3 = document.querySelector("#quizScreen3");
const quizScreen4 = document.querySelector("#quizScreen4");
const quizScreen5 = document.querySelector("#quizScreen5");

const resultScreen = document.querySelector("#resultScreen");
const retryBtn = document.querySelector(".retry-btn");

const score = document.querySelectorAll(".score span");
const questions = document.querySelectorAll(".question");


/* =========================
   VARIABLES & STATE
========================= */

let score1 = 0;
const totalquestion = questions.length;

let defaultTime = 30;
let timerInterval = null;


/* =========================
   SOUNDS
========================= */

const correctSound = new Audio("sounds/efek-sound-3-220030.mp3");
const errorSound = new Audio("sounds/error-08-206492.mp3");


/* =========================
   SCREEN LIST
========================= */

const quizScreens = [
  quizScreen,
  quizScreen2,
  quizScreen3,
  quizScreen4,
  quizScreen5
];

const nextButtons = document.querySelectorAll(".next-btn");


/* =========================
   EVENT LISTENERS
========================= */

// Retry Button
retryBtn.addEventListener("click", () => {
  location.reload();
});

// Start Button
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startScreen.classList.add("hide");
  quizScreen.classList.add("show");
  startTime(quizScreen);
});

// Next Buttons
nextButtons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    quizScreens[index].classList.add("hide");

    // Last screen → Result
    if (index === quizScreens.length - 1) {
      resultScreen.classList.add("active");
      startScreen.classList.add("hide");

      document.querySelector(".score-result span").textContent =
        `${score1}/${totalquestion}`;

      updateResultProgress(score1, totalquestion);
      return;
    }

    quizScreens[index + 1].classList.add("show");
    startTime(quizScreens[index + 1]);
  });
});


/* =========================
   TIMER FUNCTIONS
========================= */

function startTime(quizScreen) {
  clearInterval(timerInterval);
  defaultTime = 30;

  const timerSpan = quizScreen.querySelector(".timer span");
  timerSpan.textContent = "00:30";

  timerInterval = setInterval(() => {
    defaultTime--;

    const formattedTime =
      defaultTime < 10 ? `00:0${defaultTime}` : `00:${defaultTime}`;

    timerSpan.textContent = formattedTime;

    if (defaultTime <= 5) {
      timerSpan.style.color = "red";
    }

    if (defaultTime === 0) {
      clearInterval(timerInterval);
      disabledOptions(quizScreen);
    }
  }, 1000);
}


/* =========================
   OPTION HANDLING
========================= */

function disabledOptions(quizScreen) {
  const options1 = quizScreen.querySelectorAll(".option");

  options1.forEach(opt1 => {
    opt1.disabled = true;

    if (opt1.dataset.correct === "true") {
      opt1.classList.add("correct");
    }
  });
}

function handelsOptions(quizScreen) {
  const options = quizScreen.querySelectorAll(".option");

  options.forEach(option => {
    option.addEventListener("click", () => {
      clearInterval(timerInterval);
      options.forEach(opt => opt.disabled = true);

      const isCorrect = option.dataset.correct === "true";

      if (isCorrect) {
        option.classList.add("correct");
        correctSound.currentTime = 0;
        correctSound.play();
        score1++;
        updateScore();
      } else {
        option.classList.add("wrong");
        errorSound.currentTime = 0;
        errorSound.play();

        options.forEach(opt => {
          if (opt.dataset.correct === "true") {
            opt.classList.add("correct");
          }
        });
      }
    });
  });
}


/* =========================
   SCORE & RESULT
========================= */

function updateScore() {
  score.forEach(span => {
    span.textContent = `${score1}/ ${totalquestion}`;
  });
}

function updateResultProgress(correct, total) {
  const greenBar = document.querySelector(".progress-green");
  const redBar = document.querySelector(".progress-red");

  const greenLabel = greenBar.querySelector(".label");
  const redLabel = redBar.querySelector(".label");

  const scoreResult = document.querySelector(".score-result span");

  const greenPercent = Math.round((correct / total) * 100);
  const redPercent = 100 - greenPercent;

  greenBar.style.width = greenPercent + "%";
  redBar.style.width = redPercent + "%";

  greenLabel.innerText = greenPercent + "%";
  redLabel.innerText = redPercent + "%";

  scoreResult.innerText = `${correct}/${total}`;
}


/* =========================
   INIT OPTION HANDLERS
========================= */

handelsOptions(quizScreen);
handelsOptions(quizScreen2);
handelsOptions(quizScreen3);
handelsOptions(quizScreen4);
handelsOptions(quizScreen5);
