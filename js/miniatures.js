import {createBigPicture} from './big-photo.js';

const picturesContainer = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();


const generatePhotos = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const element = template.cloneNode(true);

    const img = element.querySelector('img');
    img.src = photos[i].url;
    img.alt = photos[i].description;
    const pictureLikes = element.querySelector('.picture__likes');
    pictureLikes.textContent = photos[i].likes;
    const pictureComments = element.querySelector('.picture__comments');
    pictureComments.textContent = photos[i].comments.length;

    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      createBigPicture(photos[i]);
    });

    fragment.appendChild(element);
  }

  picturesContainer.appendChild(fragment);
};

export {generatePhotos, picturesContainer};

