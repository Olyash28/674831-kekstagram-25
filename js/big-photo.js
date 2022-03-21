import {photos} from './data.js';
import {isEscapeKey} from './util.js';
import {createCommentsList} from './data.js';

const bigPictureContainer = document.querySelector('.big-picture');
const closeBtnBigPhoto = document.querySelector('.big-picture__cancel');
const bigPhoto = bigPictureContainer.querySelector('.big-picture__img img');
const captionPhoto = bigPictureContainer.querySelector('.social__caption');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//функция для открытия окна
function openBigPicture() {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

//функция для закрытия окна
function closeBigPicture() {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

//функция создания элемента
function makeElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

const createBigPicture = (i) => {
  openBigPicture();
  captionPhoto.textContent = photos[i].description;
  bigPhoto.src = photos[i].url;
  bigPhoto.alt = photos[i].description;
  likesCount.textContent = photos[i].likes;
  commentsCount.textContent = photos[i].comments.length;
  socialComments.innerHTML = '';
  const commentsList = createCommentsList();

  commentsList.forEach(({avatar, message, name}) => {
    const fragment = document.createDocumentFragment();
    const socialComment = makeElement('li', 'social__comment');
    const socialPicture = makeElement('img', 'social__picture');
    socialComment.appendChild(socialPicture);
    socialPicture.alt = name;
    socialPicture.src = avatar;
    socialPicture.width = '35';
    socialPicture.height = '35';
    const socialText = makeElement('p', 'social__text');
    socialComment.appendChild(socialText);
    socialText.textContent = message;
    fragment.appendChild(socialComment);
    socialComments.appendChild(fragment);
  });
};

closeBtnBigPhoto.addEventListener('click', () => {
  closeBigPicture();
});

export {createBigPicture};
