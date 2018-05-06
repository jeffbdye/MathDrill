function generateProblem(upper, lower, parameters, type) {
  switch (type) {
    case 'addition':
      return generateAddition(upper, lower, parameters);
      break;
    // case 'subtraction':
    //   break;
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
  let spaces = nearestBaseTen(upper); 
  let max = Math.floor(upper);
  let min = Math.ceil(lower);

  for(var i = 0; i < parameters; i++) {
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

function nearestBaseTen(number) {
  if (number === 0) {
    return 0;
  }
  return Math.floor(Math.log10(number));
}

function inclusiveRandom(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function minInclusiveRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

if (typeof module !== 'undefined' && this.module !== module) { // export for testing
  module.exports = generateProblem;
} else {
  window.generateProblem = generateProblem;
}
