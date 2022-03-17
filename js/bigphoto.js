import {photos} from './data.js';
import {isEscapeKey} from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const minPictures = document.querySelectorAll('.picture');
const closeBtnBigPhoto = document.querySelector('.big-picture__cancel');

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

for (let i = 0; i < minPictures.length; i++) {
  minPictures[i].addEventListener('click', () => {
    openBigPicture();
    //Описание большого фото
    const bigPhoto = bigPictureContainer.querySelector('.big-picture__img img');
    const captionPhoto = bigPictureContainer.querySelector('.social__caption');
    const likesCount = bigPictureContainer.querySelector('.likes-count');
    const commentsCount = bigPictureContainer.querySelector('.comments-count');
    const socialComments = bigPictureContainer.querySelector('.social__comments'); //блок с комментариями li
    captionPhoto.textContent = photos[i].description;
    bigPhoto.src = photos[i].url;
    bigPhoto.alt = photos[i].description;
    likesCount.textContent = photos[i].likes;
    commentsCount.textContent = photos[i].comments.length;
    socialComments.textContent = photos[i].comments;
  });
  closeBtnBigPhoto.addEventListener('click', () => {
    closeBigPicture();
  });
}
