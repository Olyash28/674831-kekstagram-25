import './avatar.js';
import {getData} from './api.js';
import {generatePhotos} from './miniatures.js';
import {setUserFormSubmit} from './form.js';

let previewSavedPhotos = [];

getData((previewPhotos) => {
  generatePhotos(previewPhotos);

  previewSavedPhotos = previewPhotos;
});

setUserFormSubmit();

export {previewSavedPhotos};
