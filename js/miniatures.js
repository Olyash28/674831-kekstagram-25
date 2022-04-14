import {createBigPicture} from './big-photo.js';
import {createRandomIdFromRangeGenerator, debounce} from './util.js';
import {previewSavedPhotos} from './main.js';

const RERENDER_DELAY = 500;

const picturesContainer = document.querySelector('.pictures');

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();
const buttonSort = document.querySelector('.img-filters__form');

const cleanPhotos = () => {
  while (picturesContainer.firstChild && !picturesContainer.lastElementChild.classList.contains('img-upload')) {
    picturesContainer.removeChild(picturesContainer.lastChild);
  }
};

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

    element.addEventListener('click', () => {
      createBigPicture(photos[i]);
    });

    fragment.appendChild(element);
  }

  picturesContainer.appendChild(fragment);
};

const createRandomPhotos = debounce(() => {
  const generatePhotoId = createRandomIdFromRangeGenerator(0, 9);

  const getRandomArray = (array, limit) => {
    const randomArray = [];

    for (let i = 0; i < limit; i++) {
      const randomId = generatePhotoId();

      randomArray.push(array[randomId]);
    }

    return randomArray;
  };

  const randomPhotos = getRandomArray(previewSavedPhotos, 10);

  cleanPhotos();
  generatePhotos(randomPhotos);
}, RERENDER_DELAY);

const createPopularPhotos = debounce(() => {
  const comparePhotos = (a, b) => {
    if (b.comments.length > a.comments.length) {
      return 1;
    } else if (a.comments.length > b.comments.length) {
      return -1;
    } else {
      return 0;
    }
  };

  const popularPhotos = previewSavedPhotos.slice().sort(comparePhotos);

  cleanPhotos();
  generatePhotos(popularPhotos);
}, RERENDER_DELAY);

const defaultSorting = debounce(() => {
  cleanPhotos();
  generatePhotos(previewSavedPhotos);
}, RERENDER_DELAY);

buttonSort.addEventListener('click', (evt) => {
  Array.from(buttonSort.children).forEach((item) => {
    item.classList.remove('img-filters__button--active');
    if (evt.target.id === item.id) {
      item.classList.add('img-filters__button--active');
    }
  });

  switch (evt.target.id) {
    case 'filter-random': {
      createRandomPhotos();
      break;
    }

    case 'filter-discussed': {
      createPopularPhotos();
      break;
    }

    default: {
      defaultSorting();
    }
  }
});

export {generatePhotos};

