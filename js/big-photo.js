import {isEscapeKey} from './util.js';

const PICTURE_WIDTH = 35;
const PICTURE_HEIGHT = 35;
const BLOCK_COMMENTS_STEP = 5;
const bigPictureContainer = document.querySelector('.big-picture');
const closeBtnBigPhoto = document.querySelector('.big-picture__cancel');
const bigPhoto = bigPictureContainer.querySelector('.big-picture__img img');
const captionPhoto = bigPictureContainer.querySelector('.social__caption');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const commentsCountTotal = bigPictureContainer.querySelector('.comments-count-total');
const socialComments = document.querySelector('.social__comments');
const btnLoaderComments = document.querySelector('.social__comments-loader');

const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

function createBlockComments(totalElements) {
  const firstIndex = socialComments.children.length;
  const lastIndex = socialComments.children.length + BLOCK_COMMENTS_STEP;
  const part = totalElements.slice(firstIndex, lastIndex);
  part.forEach(({avatar, message, name}) => {
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
}

const createBigPicture = (item) => {
  //функция для открытия окна
  const openBigPicture = () => {
    bigPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscKeydown);
  };
  openBigPicture();
  const totalBlock = item.comments;
  captionPhoto.textContent = item.description;
  bigPhoto.src = item.url;
  bigPhoto.alt = item.description;
  likesCount.textContent = item.likes;
  socialComments.innerHTML = '';
  createBlockComments(item.comments);
  commentsCount.textContent = socialComments.children.length; //сколько видим комментов
  commentsCountTotal.textContent = totalBlock.length;

  if(commentsCount.textContent < totalBlock.length) {
    btnLoaderComments.classList.remove('hidden');
  } else {
    commentsCount.textContent = totalBlock.length;
    btnLoaderComments.classList.add('hidden');
  }

  const showComments = () => {
    createBlockComments(item.comments);
    commentsCount.textContent = socialComments.children.length;
    let visibleBlock = socialComments.children;

    if(socialComments.children.length > totalBlock.length) {
      visibleBlock = totalBlock;
    }

    commentsCount.textContent = visibleBlock.length; //число текущих комментариев
    if (totalBlock.length - socialComments.children.length <= 0) {
      btnLoaderComments.classList.add('hidden');
    }
  };
  //НАЖИМАЕМ НА КНОПКУ
  btnLoaderComments.addEventListener('click', showComments);
  //функция для закрытия окна
  const closeBigPicture = () => {
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    closeBtnBigPhoto.removeEventListener('click', onCloseBtnBigPhoto);
    btnLoaderComments.removeEventListener('click', showComments);
  };

  function onPopupEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  }

  function onCloseBtnBigPhoto() {
    closeBigPicture();
  }
  closeBtnBigPhoto.addEventListener('click', onCloseBtnBigPhoto);
};

export {createBigPicture};

