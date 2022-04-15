import {isEscapeKey, createModalMessage} from './util.js';
import {createScaleZoom, onButtonPhotoBigger, onButtonPhotoSmaller, resetScale} from './zoom.js';
import {onFilterChange, resetFilters} from './slider.js';
import {sendData} from './api.js';

const MAX_LENGTH = 140;
const TEXT_ERROR = `Не больше ${ MAX_LENGTH } символов`;
const TEXT_BUTTON = 'Опубликовать';
const TEXT_BUTTON_LOAD = 'Публикую...';

const buttonUpload = document.querySelector('#upload-file');
const modalUpload = document.querySelector('.img-upload__overlay');
const buttonCloseUpload = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('#upload-select-image');
const hashtag = uploadForm.querySelector('.text__hashtags');
const uploadDescription = uploadForm.querySelector('.text__description');
const buttonSubmit = uploadForm.querySelector('#upload-submit');
const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');
const effectsDefault = document.querySelector('#effect-none');

let pristine;

uploadDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

hashtag.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const closeForm = () => {
  modalUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm.removeEventListener('change', onFilterChange);
  buttonControlBigger.removeEventListener('click', onButtonPhotoBigger);
  buttonControlSmaller.removeEventListener('click', onButtonPhotoSmaller);
  buttonCloseUpload.removeEventListener('click', onFormClose);
  resetFilters();
  resetScale();
  uploadForm.reset();
  pristine.destroy();
};

const checkValue = (value) => {
  let textError = '';
  let isValid = true;
  const usersTags = value.trim().split(' ').map((tag) => tag.toLowerCase());
  const uniqueTags = Array.from(new Set(usersTags));
  const isUniqArrValid = uniqueTags.every((item) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item));

  if (!isUniqArrValid) {
    isValid = false;
    textError = 'В хэш-теге от 2 до 20 символов с #';
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }

  if (usersTags.length !== uniqueTags.length) {
    isValid = false;
    textError = 'Хэш-теги не должны повторяться';
    buttonSubmit.disabled = true;
  }
  if (uniqueTags.length > 5) {
    isValid = false;
    textError = 'Нельзя указать больше пяти хэш-тегов';
    buttonSubmit.disabled = true;
  }
  if (value.length === 0) {
    isValid = true;
    buttonSubmit.disabled = false;
  }

  return {
    isValid,
    textError
  };
};

const validateHashtag = (value) => {
  const {isValid} = checkValue(value);

  return isValid;
};

const getTextError = (value) => {
  const {textError} = checkValue(value);

  return textError;
};

const validateDescription = (value) => (value.length <= MAX_LENGTH);

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = TEXT_BUTTON_LOAD;
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = TEXT_BUTTON;
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          closeForm();
          createModalMessage('success');
          unblockSubmitButton();
        },
        () => {
          closeForm();
          createModalMessage('error');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const onFormOpen = () => {
  pristine = new Pristine(uploadForm);
  pristine.addValidator(hashtag, validateHashtag, getTextError);
  pristine.addValidator(uploadDescription, validateDescription, TEXT_ERROR);
  effectsDefault.checked = true;
  modalUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createScaleZoom();
  uploadForm.addEventListener('change', onFilterChange);
  buttonControlBigger.addEventListener('click', onButtonPhotoBigger);
  buttonControlSmaller.addEventListener('click', onButtonPhotoSmaller);
  document.addEventListener('keydown', onPopupEscKeydown);
  buttonCloseUpload.addEventListener('click', onFormClose);
};

buttonUpload.addEventListener('change', onFormOpen);

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function onFormClose() {
  closeForm();
}

export {setUserFormSubmit};
