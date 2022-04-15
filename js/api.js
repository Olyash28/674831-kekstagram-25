import {showAlert} from './util.js';

const TEXT_ERROR = 'Не удалось загрузить фотографии. Попробуйте ещё раз';

const loadData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((previewPhotos) => {
      onSuccess(previewPhotos);
    })
    .catch(() => {
      showAlert(TEXT_ERROR);
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

export {sendData, loadData};
