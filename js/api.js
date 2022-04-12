import {generatePhotos} from './miniatures.js';
import {showAlert} from './util.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((previewPhotos) => {
    generatePhotos(previewPhotos);
  })
  .catch(() => {
    showAlert('Не удалось загрузить фотографии. Попробуйте ещё раз');
  });


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {sendData};
