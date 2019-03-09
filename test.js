let generateProblem = require('./public/generator');
let readlineSync = require('readline-sync');

function settingsLoop() {
  var numProbs = 3;
  var upper = 10;
  var lower = 0;
  var type = 'subtraction';
  var params = 2;
  for (var i = 0; i < numProbs; i++) {
    console.log('problem ' + (i + 1));
    let current = generateProblem(upper, lower, params, type);

    while (true) {
      var response = readlineSync.question(current.format+'\n');
      if (response.trim() === '' + current.solution) {
        console.log('Correct!');
        break;
      } else {
        console.log(`Incorrect, try again.`);
      }
    }
  }
}

settingsLoop();
