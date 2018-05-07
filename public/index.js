
var gameState = 'new'; // new, ongoing, ended
// new => ongoing => ended
// ongoing => ongoing

var upper = 10, lower = 0, params = 2, problems = 10;
var problemType = 'addition'; // subtraction, multiplication, division
var currentProblem = null; // active problem

var startElement = document.getElementById('start');
var restartElement = document.getElementById('restart');
var problemElement = document.getElementById('problem');
var responseArea = document.getElementById('response-area');
var responseElement = document.getElementById('response-input')
var upperElement = document.getElementById('upper');
var lowerElement = document.getElementById('lower');
// params, problems element

function initialize() {
  // ensure generator code loaded
  if (window.generateProblem === null) {
    alert('Required javascript was not properly loaded. Please refresh or try again later.');
  }

  upperElement.value = upper;
  lowerElement.value = lower;

  responseArea.addEventListener('animationend', (e) => {
    responseArea.classList.remove('apply-shake');
  });
}

function setupGame(event) {
  if (gameState === 'new') {
    // start game
    // - unhide input area
    gameState = 'ongoing';
    var quizSection = document.getElementById('quiz');
    quizSection.style.display = 'block';
    startElement.style.display = 'none';
    restartElement.style.display = 'flex';
  }

  // restart game
  // - capture settings
  // - generate first problem
  upper = upperElement.value.trim();
  lower = lowerElement.value.trim();
  // params, problem type
  updateProblem();
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

initialize();