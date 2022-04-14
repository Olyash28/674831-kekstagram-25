import {showAlert} from './util.js';

const getData =(onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((previewPhotos) => {
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      onSuccess(previewPhotos);
    })
    .catch(() => {
      showAlert('Не удалось загрузить фотографии. Попробуйте ещё раз');
    });
};


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

export {sendData, getData};
