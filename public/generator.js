'use strict';
function generateProblem(upper, lower, parameters, type) {
  switch (type) {
    case 'addition':
      return generateAddition(upper, lower, parameters);
    case 'subtraction':
      return generateSubtraction(upper, lower, parameters);
    // case 'multipication':
    //   break;
    // case 'division':
    //   break;
    default:
      console.error(`unsupported problem type: ${type}.`);
      break;
  }
}

function generateAddition(upper, lower, parameters) {
  var params = [];
  var solution = 0;
  var format = '';
  var spaces = nearestBaseTen(upper);
  const max = Math.floor(upper);
  var min = Math.ceil(lower);

  // add up n params within upper, lower to get solution
  for (var i = 0; i < parameters; i++) {
    let current = inclusiveRandom(max, min);
    params.push(current);
    solution += current;
    format += ' '.repeat(spaces - nearestBaseTen(current)) + current + '\n';
  }

  format += '+' + '_'.repeat(spaces);
  return {
    parameters: params,
    solution: solution,
    format: format
  };
}

function generateSubtraction(upper, lower, parameters) {
  var params = [];
  var format = '';
  var spaces = nearestBaseTen(upper);
  var min = Math.ceil(lower);

  // start at a random number, subtract off n params to get solution
  var solution = inclusiveRandom(upper, lower);
  format += ' '.repeat(spaces - nearestBaseTen(solution)) + solution + '\n';
  for (var i = 0; i < parameters - 1; i++) {
    let current = inclusiveRandom(solution, min);
    params.push(current);
    solution -= current;
    format += ' '.repeat(spaces - nearestBaseTen(current)) + current + '\n';
  }

  format += '-' + '_'.repeat(spaces);
  return {
    parameters: params,
    solution: solution,
    format: format
  };
}

function nearestBaseTen(number) {
  if (number === 0) {
    return 0;
  }
  return Math.floor(Math.log10(number));
}

// [min, max)
function inclusiveRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// [min, max]
function minInclusiveRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

if (typeof module !== 'undefined' && this.module !== module) { // export for testing
  module.exports = generateProblem;
} else {
  window.generateProblem = generateProblem;
}
