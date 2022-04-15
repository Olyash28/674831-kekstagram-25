const ALERT_SHOW_TIME = 10000;

function getRandomNumber(firstNumber, lastNumber) {
  if (firstNumber >= 0 && lastNumber > firstNumber) {
    return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
  }
  return ('Напишите что-нибудь другое');
}

function createRandomIdFromRangeGenerator(firstNumber, lastNumber) {
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
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const onCloseWindow = (evt, type) => {
  const windowElement = document.querySelector(`.${type}`);

  if (isEscapeKey(evt) || evt.target.classList.contains(type) || evt.target.classList.contains(`${type}__button`)) {
    if (windowElement) {
      document.body.removeChild(windowElement);
    }
    document.removeEventListener('keydown', onCloseWindow);
  }
};

const createModalMessage = (type) => {
  const templateFragment = document.querySelector(`#${ type }`).content;
  const template = templateFragment.querySelector(`.${ type }`);
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);

  fragment.appendChild(element);
  document.body.appendChild(fragment);

  element.addEventListener('click', (evt) => onCloseWindow(evt, type));
  document.addEventListener('keydown', (evt) => onCloseWindow(evt, type));
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
  getRandomNumber,
  isEscapeKey,
  makeElement,
  createModalMessage,
  showAlert,
  createRandomIdFromRangeGenerator,
  debounce
};
