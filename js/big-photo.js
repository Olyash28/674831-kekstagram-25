import {isEscapeKey} from './util.js';
import {createCommentsList} from './data.js';

const bigPictureContainer = document.querySelector('.big-picture');
const closeBtnBigPhoto = document.querySelector('.big-picture__cancel');
const bigPhoto = bigPictureContainer.querySelector('.big-picture__img img');
const captionPhoto = bigPictureContainer.querySelector('.social__caption');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');

//функция для открытия окна
const openBigPicture = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

//функция для закрытия окна
const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

//функция создания элемента
const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const createBigPicture = (item) => {
  openBigPicture();
  captionPhoto.textContent = item.description;
  bigPhoto.src = item.url;
  bigPhoto.alt = item.description;
  likesCount.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  socialComments.innerHTML = '';
  const commentsList = createCommentsList();

  commentsList.forEach(({avatar, message, name}) => {
    const PICTURE_WIDTH = 35;
    const PICTURE_HEIGHT = 35;
    const fragment = document.createDocumentFragment();
    const socialComment = makeElement('li', 'social__comment');
    const socialPicture = makeElement('img', 'social__picture');
    socialComment.appendChild(socialPicture);
    socialPicture.alt = name;
    socialPicture.src = avatar;
    socialPicture.width = PICTURE_WIDTH;
    socialPicture.height = PICTURE_HEIGHT;
    const socialText = makeElement('p', 'social__text');
    socialComment.appendChild(socialText);
    socialText.textContent = message;
    fragment.appendChild(socialComment);
    socialComments.appendChild(fragment);
  });

  closeBtnBigPhoto.addEventListener('click', () => {
    closeBigPicture();
  });
};

export {createBigPicture};
