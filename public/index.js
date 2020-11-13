
var gameState = 'new'; // new, ongoing, ended
// new => ongoing => ended
// ongoing => ongoing

var upper = 10, lower = 0, params = 2;
var problemType = 'addition'; // subtraction, multiplication, division
var currentProblem = null; // active problem
var score = 0;
var timerReference = undefined;

var startElement = document.getElementById('start');
var restartElement = document.getElementById('restart');
var problemElement = document.getElementById('problem');
var responseArea = document.getElementById('response-area');
var responseElement = document.getElementById('response-input');
var typeElement = document.getElementById('type');
var upperElement = document.getElementById('upper');
var lowerElement = document.getElementById('lower');
var scoreElement = document.getElementById('score');
var timerElement = document.getElementById('timer');

var helpElement = document.getElementById('help-text');

function initialize() {
  // ensure generator code loaded
  if (window.generateProblem === null) {
    alert('Required javascript was not properly loaded. Please refresh or try again later.');
  }

  upperElement.value = upper;
  lowerElement.value = lower;
  typeElement.value = problemType;

  responseArea.addEventListener('animationend', (e) => {
    if (responseArea.classList.contains('apply-shake')) {
      responseArea.classList.remove('apply-shake');
    }

    if (responseArea.classList.contains('correct-answer')) {
      responseArea.classList.remove('correct-answer');
    }
  });
}

function setupGame(event) {
  if (gameState === 'new') {
    // start game
    // - unhide quiz area
    // - show restart button
    gameState = 'ongoing';
    var quizSection = document.getElementById('quiz');
    quizSection.style.display = 'inherit';
    startElement.style.display = 'none';
    restartElement.attributes.removeNamedItem('disabled');
  }

  // restart game
  // - capture settings
  upper = upperElement.value.trim();
  lower = lowerElement.value.trim();
  problemType = typeElement.value;
  // TODO: number of operands

  // - generate first problem, update scoring and timer
  updateProblem();
  setScore(0);
  restartTimer();
  // - autofocus so user can start typing
  responseElement.focus();
  return false;
}

function submitClicked(event) {
  validateResponse(responseElement.value);
}

function handleResponse(element, event) {
  if (event.keyCode === 13) { // enter pressed
    validateResponse(element.value);
  }
}

function validateResponse(response) {
  response = response.trim();
  if (response === '' || response === null) { // no input
    return;
  }

  if (response === '' + currentProblem.solution) { // compare against solution
    // correct - new problem if still under numProblems, else ended/stop time
    updateProblem();
    responseArea.classList.add('correct-answer');
    setScore(++score);
  } else {
    // wrong - inform the user
    responseArea.classList.add('apply-shake');
  }

  responseElement.value = null;
}

function updateProblem() {
  currentProblem = generateProblem(upper, lower, params, problemType);
  problemElement.innerHTML = currentProblem.format;
}

function setScore(value) {
  score = value;
  scoreElement.innerHTML = score; 
}

function restartTimer() {
  timerReference = Date.now();
  updateTimer();
}

function updateTimer() {
  // formatting timespan values thanks to https://stackoverflow.com/a/53000727/1590867
  const value = Date.now() - timerReference;
  timerElement.innerHTML = `${format(value, 60000, 60, 2)}:${format(value, 1000, 60, 2)}:${format(value, 1, 1000, 3)}`;
  if (gameState === 'ongoing') {
    requestAnimationFrame(updateTimer);
  }
}

function format(value, scale, modulo, padding) {
  value = Math.floor(value / scale) % modulo;
  return value.toString().padStart(padding, 0);
}

function toggleHelp() {
  if (helpElement.style.visibility === 'hidden') {
    helpElement.style.visibility = 'inherit';
  } else {
    helpElement.style.visibility = 'hidden';
  }
}

initialize();
