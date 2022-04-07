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
const socialComments = document.querySelector('.social__comments');
const buttonLoaderComments = document.querySelector('.social__comments-loader');

let comments;

const openBigPicture = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const createBlockComments = (totalElements) => {
  const firstIndex = socialComments.children.length;
  const lastIndex = socialComments.children.length + BLOCK_COMMENTS_STEP;

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
    socialComments.appendChild(fragment);
  });
};

const onShowComments = () => {
  const visibleBlock = socialComments.children;
  createBlockComments(comments);
  commentsCount.textContent = visibleBlock.length;

  commentsCount.textContent = visibleBlock.length;
  if (comments.length - visibleBlock.length <= 0) {
    buttonLoaderComments.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPhotoCloseButton.removeEventListener('click', onButtonClose);
  buttonLoaderComments.removeEventListener('click', onShowComments);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onButtonClose() {
  closeBigPicture();
}

const createBigPicture = (item) => {
  comments = item.comments;

  openBigPicture();

  captionPhoto.textContent = item.description;
  bigPhoto.src = item.url;
  bigPhoto.alt = item.description;
  likesCount.textContent = item.likes;
  socialComments.innerHTML = '';

  createBlockComments(comments);

  commentsCount.textContent = socialComments.children.length;
  commentsCountTotal.textContent = comments.length;

  if(commentsCount.textContent < comments.length) {
    buttonLoaderComments.classList.remove('hidden');
  } else {
    commentsCount.textContent = comments.length;
    buttonLoaderComments.classList.add('hidden');
  }

  buttonLoaderComments.addEventListener('click', onShowComments);

  bigPhotoCloseButton.addEventListener('click', onButtonClose);
};

export {createBigPicture};
