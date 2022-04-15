import './avatar.js';
import {loadData} from './api.js';
import {generatePhotos} from './miniatures.js';
import {setUserFormSubmit} from './form.js';
import {showSortContainer} from './sorting.js';

let previewSavedPhotos = [];

loadData((previewPhotos) => {
  generatePhotos(previewPhotos);
  showSortContainer();
  previewSavedPhotos = previewPhotos;
});

setUserFormSubmit();

export {previewSavedPhotos};
