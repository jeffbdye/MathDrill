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

function generateAddition(upper, lower, numOperands) {
  let operands = [];
  let solution = 0;
  let format = '';
  const spaces = numberOfDigits(upper);
  const max = Math.floor(upper);
  const min = Math.ceil(lower);

  // add up n params within upper, lower to get solution
  for (let i = 0; i < numOperands; i++) {
    const current = inclusiveRandom(max, min);
    operands.push(current);
    solution += current;
    format += ' '.repeat(getLeadingSpacesForNumber(spaces, current)) + current + '\n';
  }

  format += '+' + '_'.repeat(spaces);
  return {
    parameters: operands,
    solution: solution,
    format: format
  };
}

function generateSubtraction(upper, lower, numOperands) {
  let operands = [];
  let format = '';
  const spaces = numberOfDigits(upper);
  const min = Math.ceil(lower);

  // start at a random number, subtract off n params to get solution
  let solution = inclusiveRandom(upper, min);
  format += ' '.repeat(spaces - numberOfDigits(solution) + 1) + solution + '\n';
  for (let i = 0; i < numOperands - 1; i++) {
    let current = inclusiveRandom(solution, min);
    operands.push(current);
    solution -= current;
    format += ' '.repeat(getLeadingSpacesForNumber(spaces, current)) + current + '\n';
  }

  format += '-' + '_'.repeat(spaces);
  return {
    parameters: operands,
    solution: solution,
    format: format
  };
}

function generateMultiplication(upper, lower, numOperands) {
  let operands = [];
  let format = '';
  const max = Math.ceil(upper);
  const min = Math.floor(lower);
  const spaces = numberOfDigits(upper);

  // start with a random base number and multiply up
  var solution = inclusiveRandom(max, min);
  operands.push(solution);
  let current = inclusiveRandom(max, min);
  format += ' '.repeat(getLeadingSpacesForNumber(spaces, current)) + solution + '\n';

  for (var i = 1; i < numOperands; i++) {
    current = inclusiveRandom(max, min);
    operands.push(current);
    solution *= current;
    format += ' '.repeat(getLeadingSpacesForNumber(spaces, current)) + current + '\n';
  }

  format += 'x' + '_'.repeat(spaces);

  return {
    parameters: operands,
    solution: solution,
    format: format
  };
}

function numberOfDigits(number) {
  // ugh
  return number.toString().length;
}

function getLeadingSpacesForNumber(spaces, current) {
  return spaces - numberOfDigits(current) + 1;
}

// [min, max)
function inclusiveRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// [min, max]
// function minInclusiveRandom(max, min) {
//   return Math.floor(Math.random() * (max - min) + min);
// }

// eslint-disable-next-line no-undef
if (typeof module !== 'undefined' && this.module !== module) { // export for testing
  // eslint-disable-next-line no-undef
  module.exports = generateProblem;
} else {
  window.generateProblem = generateProblem;
}
