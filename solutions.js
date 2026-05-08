// Advent of Code 2020 - Days 1 through 7
// Run with Node.js: https://nodejs.org/en/docs
// MDN JavaScript reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

const fs = require('fs');
const path = require('path');

function readInput(fileName) {
  return fs.readFileSync(path.join(__dirname, 'inputs', fileName), 'utf8').trimEnd();
}

function day1(input) {
  const numbers = input.split(/\s+/).map(Number);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 2020) {
        return numbers[i] * numbers[j];
      }
    }
  }

  return 'No matching pair found';
}

function day2(input) {
  const lines = input.split('\n').filter(Boolean);
  let validPasswords = 0;

  for (const line of lines) {
    const parts = line.match(/(\d+)-(\d+) ([a-z]): ([a-z]+)/);
    const min = Number(parts[1]);
    const max = Number(parts[2]);
    const letter = parts[3];
    const password = parts[4];
    let count = 0;

    for (const char of password) {
      if (char === letter) {
        count++;
      }
    }

    if (count >= min && count <= max) {
      validPasswords++;
    }
  }

  return validPasswords;
}

function day3(input) {
  const rows = input.split('\n').filter(Boolean);
  let x = 0;
  let trees = 0;

  for (let y = 0; y < rows.length; y++) {
    if (rows[y][x % rows[y].length] === '#') {
      trees++;
    }

    x += 3;
  }

  return trees;
}

function day4(input) {
  const passports = input.split(/\n\s*\n/);
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let validPassports = 0;

  for (const passport of passports) {
    let hasAllFields = true;

    for (const field of requiredFields) {
      if (!passport.includes(field + ':')) {
        hasAllFields = false;
      }
    }

    if (hasAllFields) {
      validPassports++;
    }
  }

  return validPassports;
}

function getSeatId(boardingPass) {
  let binary = boardingPass.replaceAll('F', '0').replaceAll('B', '1').replaceAll('L', '0').replaceAll('R', '1');
  return parseInt(binary, 2);
}

function day5(input) {
  const boardingPasses = input.split('\n').filter(Boolean);
  let highestSeatId = 0;

  for (const boardingPass of boardingPasses) {
    const seatId = getSeatId(boardingPass);

    if (seatId > highestSeatId) {
      highestSeatId = seatId;
    }
  }

  return highestSeatId;
}

function day6(input) {
  const groups = input.split(/\n\s*\n/);
  let totalYesAnswers = 0;

  for (const group of groups) {
    const answers = group.replace(/\n/g, '');
    const uniqueAnswers = new Set(answers);
    totalYesAnswers += uniqueAnswers.size;
  }

  return totalYesAnswers;
}

function day7(input) {
  const lines = input.split('\n').filter(Boolean);
  const canBeInside = {};

  for (const line of lines) {
    const parts = line.split(' bags contain ');
    const outerBag = parts[0];
    const innerBags = parts[1];

    if (innerBags === 'no other bags.') {
      continue;
    }

    const innerParts = innerBags.split(', ');

    for (const innerPart of innerParts) {
      const innerBag = innerPart.replace(/^\d+ /, '').replace(/ bags?\.?$/, '');

      if (!canBeInside[innerBag]) {
        canBeInside[innerBag] = [];
      }

      canBeInside[innerBag].push(outerBag);
    }
  }

  const seenBags = new Set();
  const bagsToCheck = ['shiny gold'];

  while (bagsToCheck.length > 0) {
    const currentBag = bagsToCheck.pop();
    const outerBags = canBeInside[currentBag] || [];

    for (const outerBag of outerBags) {
      if (!seenBags.has(outerBag)) {
        seenBags.add(outerBag);
        bagsToCheck.push(outerBag);
      }
    }
  }

  return seenBags.size;
}

console.log('Day 1:', day1(readInput('day01.txt')));
console.log('Day 2:', day2(readInput('day02.txt')));
console.log('Day 3:', day3(readInput('day03.txt')));
console.log('Day 4:', day4(readInput('day04.txt')));
console.log('Day 5:', day5(readInput('day05.txt')));
console.log('Day 6:', day6(readInput('day06.txt')));
console.log('Day 7:', day7(readInput('day07.txt')));
