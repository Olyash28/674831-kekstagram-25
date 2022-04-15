import {isEscapeKey, makeElement} from './util.js';

const PICTURE_WIDTH = 35;
const PICTURE_HEIGHT = 35;
const BLOCK_COMMENTS_STEP = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const bigPhotoCloseButton = document.querySelector('.big-picture__cancel');
const bigPhoto = bigPictureContainer.querySelector('.big-picture__img img');
const captionPhoto = bigPictureContainer.querySelector('.social__caption');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsCountTotal = bigPictureContainer.querySelector('.comments-count-total');
const socialCommentsBlock = document.querySelector('.social__comments');
const buttonCommentsLoader = document.querySelector('.social__comments-loader');

let comments;

const openBigPicture = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);

  bigPhotoCloseButton.addEventListener('click', onButtonClose);
  buttonCommentsLoader.addEventListener('click', onButtonShowCommentsClick);
};

const createBlockComments = (totalElements) => {
  const firstIndex = socialCommentsBlock.children.length;
  const lastIndex = socialCommentsBlock.children.length + BLOCK_COMMENTS_STEP;

  const blockComments = totalElements.slice(firstIndex, lastIndex);

  blockComments.forEach(({avatar, message, name}) => {

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
    socialCommentsBlock.appendChild(fragment);
  });
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPhotoCloseButton.removeEventListener('click', onButtonClose);
  buttonCommentsLoader.removeEventListener('click', onButtonShowCommentsClick);
};

const createBigPicture = (item) => {
  comments = item.comments;

  openBigPicture();

  captionPhoto.textContent = item.description;
  bigPhoto.src = item.url;
  bigPhoto.alt = item.description;
  likesCount.textContent = item.likes;
  socialCommentsBlock.innerHTML = '';

  createBlockComments(comments);

  commentsCount.textContent = socialCommentsBlock.children.length;
  commentsCountTotal.textContent = comments.length;

  if (commentsCount.textContent < comments.length) {
    buttonCommentsLoader.classList.remove('hidden');
  } else {
    commentsCount.textContent = comments.length;
    buttonCommentsLoader.classList.add('hidden');
  }
};

function onButtonShowCommentsClick() {
  const visibleBlock = socialCommentsBlock.children;
  createBlockComments(comments);
  commentsCount.textContent = visibleBlock.length;

  if (comments.length - visibleBlock.length <= 0) {
    buttonCommentsLoader.classList.add('hidden');
  }
}

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onButtonClose() {
  closeBigPicture();
}

export {createBigPicture};
