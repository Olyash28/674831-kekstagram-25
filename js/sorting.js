import {createRandomIdFromRangeGenerator, debounce} from './util.js';
import {previewSavedPhotos} from './main.js';
import {generatePhotos, picturesContainer} from './miniatures.js';

const RERENDER_DELAY = 500;
const PHOTOS_LIMIT = 10;

const buttonSort = document.querySelector('.img-filters__form');
const buttonSortContainer = document.querySelector('.img-filters');

const cleanPhotos = () => {
  while (picturesContainer.firstChild && !picturesContainer.lastElementChild.classList.contains('img-upload')) {
    picturesContainer.removeChild(picturesContainer.lastChild);
  }
};

const showSortContainer = () => {
  buttonSortContainer.classList.remove('img-filters--inactive');
};

const createRandomPhotos = debounce(() => {
  const generatePhotoId = createRandomIdFromRangeGenerator(0, previewSavedPhotos.length - 1);

  const getRandomArray = (array, limit) => {
    const randomPhotos = [];

    for (let i = 0; i < limit; i++) {
      const randomId = generatePhotoId();

      randomPhotos.push(array[randomId]);
    }

    return randomPhotos;
  };

  cleanPhotos();
  generatePhotos(getRandomArray(previewSavedPhotos, PHOTOS_LIMIT));
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

export {showSortContainer};
