import {photos} from './data.js';
import {commentsList} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture'); // В фрагменте находим нужный элемент
const fragment = document.createDocumentFragment(); //создаем свой фрагмент для DOM

for (let i = 0; i < photos.length; i++) {
  const element = template.cloneNode(true);

  const img = element.querySelector('img');
  img.src = photos[i].url;
  img.alt = photos[i].description;
  const pictureLikes = element.querySelector('.picture__likes');
  pictureLikes.textContent = photos[i].likes;
  const pictureComments = element.querySelector('.picture__comments');
  pictureComments.textContent = commentsList().length;

  fragment.appendChild(element);
}

picturesContainer.appendChild(fragment);

// Количество лайков likes выведите в блок .picture__likes.
//   Количество комментариев comments выведите в блок .picture__comments.