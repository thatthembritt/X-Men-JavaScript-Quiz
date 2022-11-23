var option1Element = document.querySelector("#answer1");
var option2Element = document.querySelector("#answer2");
var option3Element = document.querySelector("#answer3");
var option4Element = document.querySelector("#answer4");

var indexOfCurrentQuestion = 0;
var currentScore = 0;
var highScoresDiv = document.querySelector("highScores");

var questions = [
  {
    question:
      "Which famous X-Men made their first appearance in the comics in the 1970s?",
    answer: "Wolverine",
    options: ["Jean Gray", "Beast", "Wolverine", "Cyclops"],
  },
  {
    question: "Which color was part of the original X-Men uniform?",
    answer: "Yellow",
    options: ["Yellow", "Purple", "Green", "Burgundy"],
  },

  {
    question:
      "Cyclops is romantically interested in which female lead character?",
    answer: "Jean Gray",
    options: ["Kitty Pryde", "Storm", "Jean Gray", "Rogue"],
  },

  {
    question: "When did the X-Men first appear as comic book characters?",
    answer: "1963",
    options: ["1964", "1963", "1960", "1965"],
  },

  {
    question: "Which X-Men character has the ability to shapeshift?",
    answer: "Mystique",
    options: ["Mystique", "Nightcrawler", "Beast", "Iceman"],
  },

  {
    question:
      "All X-Men mutants have this gene that causes their super human abilities-",
    answer: "X Gene",
    options: ["S Gene", "Y Gene", "X Gene", "Z Gene"],
  },

  {
    question: "Which X-Men character has the ability to control the weather?",
    answer: "Storm",
    options: ["Jean Gray", "Storm", "Psylocke", "Nightcrawler"],
  },

  {
    question:
      "Which of these was the highest grossing X-Men movie of all time?",
    answer: "X-Men: Days of Future Past",
    options: [
      "X-Men: Days of Future Past",
      "The Wolverine",
      "Logan",
      "X Men: First Class",
    ],
  },

  {
    question: "Which regular X-Men villain is intent on wiping out mutants?",
    answer: "Colonel William Stryker",
    options: [
      "Cameron Hodge",
      "General Charles Driver",
      "Colonel William Stryker",
      "Major Richard Crasher",
    ],
  },

  {
    question:
      "X-Men: First Class is primarily set during which major international incident?",
    answer: "Cuban Missile Crisis",
    options: ["Cuban Missile Crisis", "WWI", "WWII", "Vietnam War"],
  },
];

//used static html to display questions that are listed here
var startButtonEl = document.querySelector("#startButton");
var quizQuestionDiv = document.querySelector("#quizQuestions");
var countdownDiv = document.querySelector("#countdown");

//starts the quiz, timer, and shows questions
startButtonEl.addEventListener("click", function () {
  // hide the start button (display none)
  startButtonEl.style.display = "none";
  // show the quiz questions
  quizQuestionDiv.style.display = "block";
  countdownDiv.style.display = "block";
  quizActive = true;
  countdown();
  showQuestion();
});

var timerEl = document.getElementById("countdown");
var timeStart = 60;
var penaltyTime = 5;
var timeLeft = 0;

function countdown() {
  timeLeft = timeStart;

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      timerEl.textContent = "Timer Loading...";
      //if time runs out, generate score for user
      generateScore(currentScore);
    }
  }, 1000);
}

//show questions and answer options to user
function showQuestion() {
  var currentQuestion = questions[indexOfCurrentQuestion].question;
  var questionElement = document.querySelector("#questionHeading");
  questionElement.textContent = currentQuestion;
  var currentQuestionsOptions = questions[indexOfCurrentQuestion].options;
  var currentQuestionsOption1 = questions[indexOfCurrentQuestion].options[0];

  var label1Element = document.querySelector("#label1");
  option1Element.value = currentQuestionsOption1;
  label1Element.textContent = currentQuestionsOption1;
  var currentQuestionsOption2 = questions[indexOfCurrentQuestion].options[1];

  var label2Element = document.querySelector("#label2");
  option2Element.value = currentQuestionsOption2;
  label2Element.textContent = currentQuestionsOption2;
  var currentQuestionsOption3 = questions[indexOfCurrentQuestion].options[2];

  var label3Element = document.querySelector("#label3");
  option3Element.value = currentQuestionsOption3;
  label3Element.textContent = currentQuestionsOption3;
  var currentQuestionsOption4 = questions[indexOfCurrentQuestion].options[3];

  var label4Element = document.querySelector("#label4");
  option4Element.value = currentQuestionsOption4;
  label4Element.textContent = currentQuestionsOption4;
}

function checkAnswer(event) {
  event.preventDefault();

  var currentQuestionsAnswer = questions[indexOfCurrentQuestion].answer;
  //checks answer against what user inputs
  //if wrong, time is deducted
  //if time runs out, generate score
  //if time left show next question
  if (currentQuestionsAnswer == event.target.value) {
    currentScore++;
  } else {
    timeLeft -= penaltyTime;
  }
  indexOfCurrentQuestion++;
  if (indexOfCurrentQuestion >= questions.length) {
    generateScore(currentScore);
  } else {
    if (timeLeft <= 0) {
      generateScore(currentScore);
    } else {
      showQuestion();
    }
  }
}

//event listeners for the options so that answer can be checked
option1Element.addEventListener("click", checkAnswer);
option2Element.addEventListener("click", checkAnswer);
option3Element.addEventListener("click", checkAnswer);
option4Element.addEventListener("click", checkAnswer);

//score information

var highScores = [];

var quizActive = false;

function generateScore(finalScore) {
  if (quizActive) {
    quizActive = false;
    quizQuestionDiv.style.display = "none";
    countdownDiv.style.display = "none";
    showHighScoresDiv.style.display = "block";
    retryQuizDiv.style.display = "block";
    retryQuizButtonEl.style.display = "block";
    var userInput = prompt("Please enter your initials.", "BLB");
    highScores.push(userInput + " - " + finalScore + "/" + questions.length);
    document.getElementById("highScores").innerHTML = highScores;
  }
}

var showHighScoresDiv = document.querySelector("#highScores");
var retryQuizDiv = document.querySelector("#retryQuiz");

var retryQuizButtonEl = document.querySelector("#retryQuizButton");

retryQuizButtonEl.addEventListener("click", function () {
  retryQuizButtonEl.style.display = "none";
  quizQuestionDiv.style.display = "block";
  countdownDiv.style.display = "block";
  showHighScoresDiv.style.display = "none";
  indexOfCurrentQuestion = 0;
  currentScore = 0;
  quizActive = true;
  showQuestion();
  timeLeft = timeStart;
  //resets timer for next round
});
