// start click - validate upper, lower, num parameters, problem type, number problems
// - first game => show problem space, answer space, start game
// - during/after game => restart game

// submit click - eat answer input, reset value
// capture enter
// - correct => advance to next problem
// - incorrect => no change

// manage game state
// not started => ongoing => ended

var gameState = 'new'; // new, ongoing, ended

var upper = 10, lower = 0, params = 2, problems = 10;
var problemType = 'addition'; // subtraction, multiplication, division
var currentProblem = null; // active problem

var problemElement = document.getElementById('problem');
var upperElement = document.getElementById('upper');
upperElement.value = upper;
var lowerElement = document.getElementById('lower');
lowerElement.value = lower;
// params, problems element
function initialize() {
  // ensure generator code loaded
  if (window.generateProblem === null) {
    alert('Required javascript was not properly loaded. Please refresh or try again later.');
  }

  document.getElementById('start')
    .addEventListener('click', (element, event) => {
      if (gameState === 'new') {
        // start game
        // - unhide input area
        gameState = 'ongoing';
        var responseElement = document.getElementById('response-area');
        responseElement.style.display = 'block';
      }

      // restart game
      // - capture settings
      // - first problem
      // todo - validate input
      upper = upperElement.value.trim();
      lower = lowerElement.value.trim();
      // params, problem type
      currentProblem = generateProblem(upper, lower, params, problemType);
      problemElement.innerHTML = currentProblem.format;
    });
  document.getElementById('submit')
    .addEventListener('click', submitProblem);
}

function submitProblem(element, event) {
  // if event.keyCode === 13
  // if input === solution
  // - generate new problem
  // clear element
  if (event.keyCode === 13) { // enter pressed
    var response = element.value.trim();
    if (response === '' || response === null) { // no input
      return;
    } else if (response === '' + currentProblem.solution) { // compare against solution
      // correct - new problem if still under numProblems, else ended/stop time
      currentProblem = generateProblem(upper, lower, params, problemType);
      problemElement.innerHTML = currentProblem.format;
    } else {
      // wrong - inform the user
      alert('WRONG');
    }

    element.value = null;
  }
}

initialize();