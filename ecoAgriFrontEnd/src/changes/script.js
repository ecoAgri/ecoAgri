'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
let score = 20;
console.log(secretNumber);
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //When there is no Input
  if (!guess) {
    displayMessage('⛔ No number !');

    //When player wins
  } else if (guess === secretNumber) {
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    displayMessage('🎉 Correct Number! ');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    //When guess is too high
  } else if (secretNumber < guess && guess < 21) {
    if (score > 1) {
      displayMessage('📈Too high! ');
      score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥You lost the game! ');
      document.querySelector('.score').textContent = 0;
    }

    //When guess is too low
  } else if (secretNumber > guess && guess > -1) {
    if (score > 1) {
      displayMessage('📉 Too low! ');
      score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥You lost the game! ');
      document.querySelector('.score').textContent = 0;
    }

    //When number not in range
  } else if (guess < 0 || guess > 20) {
    displayMessage('Number not in range!');
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');
});
