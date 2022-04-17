const ALERT_SHOW_TIME = 10000;
const ESC_KEYCODE = 'Escape';

const getRandomNumber = (firstNumber, lastNumber) => {
  if (firstNumber < 0 && lastNumber < firstNumber) {
    return;
  }
  return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
};

const createRandomIdFromRangeGenerator = (firstNumber, lastNumber) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(firstNumber, lastNumber);
    if (previousValues.length >= (lastNumber - firstNumber + 1)) {
      return;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(firstNumber, lastNumber);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === ESC_KEYCODE;

const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  makeElement,
  showAlert,
  createRandomIdFromRangeGenerator,
  debounce
};
