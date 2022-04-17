import {isEscapeKey} from './util.js';

let type;

const closeWindow = (evt, callback) => {
  const windowElement = document.querySelector(`.${type}`);

  if (isEscapeKey(evt) || evt.target.classList.contains(type) || evt.target.classList.contains(`${type}__button`)) {
    if (windowElement) {
      document.body.removeChild(windowElement);
    }

    callback();
  }
};

const onWindowClose = (evt) => {
  evt.preventDefault();
  closeWindow(evt, () => {
    document.removeEventListener('keydown', onWindowClose);
  });
};

const createModalMessage = (messageType) => {
  type = messageType;
  const templateFragment = document.querySelector(`#${ type }`).content;
  const template = templateFragment.querySelector(`.${ type }`);
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);

  fragment.appendChild(element);
  document.body.appendChild(fragment);

  element.addEventListener('click', onWindowClose);
  document.addEventListener('keydown', onWindowClose);
};

export {createModalMessage};
