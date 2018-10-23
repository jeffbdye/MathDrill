'use strict';
function generateProblem(upper, lower, parameters, type) {
  switch (type) {
    case 'addition':
      return generateAddition(upper, lower, parameters);
    case 'subtraction':
      return generateSubtraction(upper, lower, parameters);
    case 'multiplication':
      return generateMultiplication(upper, lower, parameters);
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
  const spaces = numberOfDigits(upper);
  const max = Math.floor(upper);
  const min = Math.ceil(lower);

  // add up n params within upper, lower to get solution
  for (var i = 0; i < parameters; i++) {
    let current = inclusiveRandom(max, min);
    params.push(current);
    solution += current;
    format += ' '.repeat(spaces - numberOfDigits(current)) + current + '\n';
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
  const spaces = numberOfDigits(upper);
  const min = Math.ceil(lower);

  // start at a random number, subtract off n params to get solution
  var solution = inclusiveRandom(upper, min);
  format += ' '.repeat(spaces - numberOfDigits(solution)) + solution + '\n';
  for (var i = 0; i < parameters - 1; i++) {
    let current = inclusiveRandom(solution, min);
    params.push(current);
    solution -= current;
    format += ' '.repeat(spaces - numberOfDigits(current)) + current + '\n';
  }

  format += '-' + '_'.repeat(spaces);
  return {
    parameters: params,
    solution: solution,
    format: format
  };
}

function generateMultiplication(upper, lower, parameters) {
  var params = [];
  var format = '';
  const max = Math.ceil(upper);
  const min = Math.floor(lower);
  const spaces = numberOfDigits(upper);

  // start with a random base number and multiply up
  var solution = inclusiveRandom(max, min);
  params.push(solution);
  format += ' '.repeat(spaces - numberOfDigits(solution)) + solution + '\n';

  for (var i = 1; i < parameters; i++) {
    let current = inclusiveRandom(max, min);
    params.push(current);
    solution *= current;
    format += ' '.repeat(spaces - numberOfDigits(current)) + current + '\n';
  }

  format += 'x' + '_'.repeat(spaces);

  return {
    parameters: params,
    solution: solution,
    format: format
  };
}

function numberOfDigits(number) {
  // ugh
  return number.toString().length;
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
