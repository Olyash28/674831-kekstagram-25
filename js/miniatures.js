import {photos} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture'); // В фрагменте находим нужный элемент
const fragment = document.createDocumentFragment(); //создаем свой фрагмент для DOM

for (let i = 0; i < photos.length; i++) {
  const element = template.cloneNode(true);

  const img = element.querySelector('img');
  img.src = photos[i].url;
  const pictureLikes = element.querySelector('.picture__likes');
  pictureLikes.textContent = photos[i].likes;
  const pictureComments = element.querySelector('.picture__likes');
  pictureComments.textContent = photos[i].comments;

  fragment.appendChild(element);
}

picturesContainer.appendChild(fragment);

