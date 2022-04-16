import {isEscapeKey} from './util.js';

const closeWindow = (evt, type, callback) => {
  const windowElement = document.querySelector(`.${type}`);

  if (isEscapeKey(evt) || evt.target.classList.contains(type) || evt.target.classList.contains(`${type}__button`)) {
    if (windowElement) {
      document.body.removeChild(windowElement);
    }

    callback();
  }
};

const onWindowClose = (type) => (evt) => {
  evt.preventDefault();
  closeWindow(evt, type, () => {
    document.removeEventListener('keydown', onWindowClose(type));
  });
};

const createModalMessage = (type) => {
  const templateFragment = document.querySelector(`#${ type }`).content;
  const template = templateFragment.querySelector(`.${ type }`);
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);

  fragment.appendChild(element);
  document.body.appendChild(fragment);

  element.addEventListener('click', onWindowClose(type));
  document.addEventListener('keydown', onWindowClose(type));
};

export {createModalMessage};
