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
  closeBtnBigPhoto.removeEventListener('click', onCloseBtnBigPhoto);
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

//функция создания элемента
const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const createBlockComments = (firstIndex, totalElements) => {
  const lastIndex = firstIndex + BLOCK_COMMENTS_STEP;
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
  return lastIndex;
};

const createBigPicture = (item) => {
  const totalBlock = item.comments.length;
  openBigPicture();
  captionPhoto.textContent = item.description;
  bigPhoto.src = item.url;
  bigPhoto.alt = item.description;
  likesCount.textContent = item.likes;
  socialComments.innerHTML = '';
  let firstBlock = createBlockComments(0, item.comments);
  commentsCount.textContent = firstBlock;
  commentsCountTotal.textContent = totalBlock;

  if(totalBlock > BLOCK_COMMENTS_STEP) {
    btnLoaderComments.style.display = 'block';
  } else {
    commentsCount.textContent = totalBlock;
    btnLoaderComments.style.display = 'none';
  }
  //НАЖИМАЕМ НА КНОПКУ
  btnLoaderComments.addEventListener('click', () => {
    const currentBlock = createBlockComments(firstBlock, item.comments);
    let visibleBlock = currentBlock;

    if(currentBlock > totalBlock) {
      visibleBlock = totalBlock;
    }

    commentsCount.textContent = visibleBlock; //число текущих комментариев
    if (totalBlock - currentBlock <= 0) {
      btnLoaderComments.style.display = 'none';
    }
    firstBlock = currentBlock;
  });
  //надо удалить обработчик с кнопки при закрытии
  closeBtnBigPhoto.addEventListener('click', onCloseBtnBigPhoto);
};

export {createBigPicture};
