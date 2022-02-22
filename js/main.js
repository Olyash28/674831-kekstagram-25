function getRandomNumber (firstNumber, lastNumber) {
  if(firstNumber >= 0 && lastNumber > firstNumber) {
    return Math.round(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
  } else {
    alert('Напишите что-нибудь другое');
  }
}
getRandomNumber(5,8);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://learn.javascript.ru/alert-prompt-confirm


let message;
const maxLength = 140;
let findLength = 0;
function checkComment (message, findLength) {
  findLength = message.length;
  if (findLength <= maxLength) {
    return true;
  }
    return false;
}
checkComment('приветик');
