function getRandomNumber(firstNumber, lastNumber) {
  if (firstNumber >= 0 && lastNumber > firstNumber) {
    return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
  }
  return ('Напишите что-нибудь другое');
}

//Ссылки на источники:
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://learn.javascript.ru/number


// function checkCommentLength(message, maxLength) {
//   const messageLength = message.length;
//
//   return (messageLength <= maxLength);
// }
//
// checkCommentLength();
//

const isEscapeKey = (evt) => evt.key === 'Escape';

const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

export {getRandomNumber, isEscapeKey, makeElement};
