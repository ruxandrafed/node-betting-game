var prompt = require('sync-prompt').prompt;
var colors = require('colors');

var playerMoney = 100;

function generateRandomNo() {
  return Math.floor((Math.random() * 10) + 1);
}

function getUserBet(min, max) {
  if (min == max) {
    var userBet = min;
    var message = 'Placed a bet for ' + userBet + ' $!';
    console.log(message.green);
    return userBet;
  } else {
    do {
      var message = 'Place a bet ($' + min + '-$' + max + '):';
      var userBet = prompt(message.green);
    } while (userBet < min || userBet > max);
    return userBet;
  }
}

function getUserGuess() {
  do {
    var message = 'Guess a no. between 1 and 10:';
    var userGuess = prompt(message.green);
} while (userGuess < 1 || userGuess > 10);
  return userGuess
}

function gameRound() {

  userBet = getUserBet(5, Math.min(playerMoney, 10));
  randomNo = generateRandomNo();
  userGuess = getUserGuess();

  if (randomNo === userGuess) {
    playerMoney *= 2;
    var message = 'The number was: ' + randomNo + '. Awesome, you guessed it! You now have ' + playerMoney + '$!';
    console.log(message.rainbow)
  } else if (Math.abs(userGuess - randomNo) > 1) {
    playerMoney -= userBet;
    if (playerMoney >= 5) {
      var message = 'The number was: ' + randomNo + '. Bummer, you lost your bet! You now have ' + playerMoney + '$!';
      console.log(message.red);
    } else {
      var message = 'You only have ' + playerMoney + '$ left, so you can\'t start another round! You lost!';
      console.log(message.grey);
    }
  } else {
    var message = 'The number was: ' + randomNo + '. You were close! No loss, no gain; you stil have ' + playerMoney + '$!';
    console.log(message.yellow)
  }
};

do {
  gameRound();
} while (playerMoney >= 5);

