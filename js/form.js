import {isEscapeKey} from './util.js';
import {createModalMessage} from './modal-window.js';
import {createScaleZoom, onButtonPhotoBigger, onButtonPhotoSmaller, resetScale} from './zoom.js';
import {onFilterChange, resetFilters} from './slider.js';
import {sendData} from './api.js';
import {chooseFile} from './avatar.js';
import {isFormValid} from './validate.js';

const TEXT_BUTTON = 'Опубликовать';
const TEXT_BUTTON_LOAD = 'Публикую...';

const ModalType = {
  SUCCESS: 'success',
  ERROR: 'error'
};

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

const onUploadDescriptionKeydown = (evt) => {
  evt.stopPropagation();
};

const onHashtagKeydown = (evt) => {
  evt.stopPropagation();
};

const closeForm = () => {
  modalUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm.removeEventListener('change', onFilterChange);
  buttonControlBigger.removeEventListener('click', onButtonPhotoBigger);
  buttonControlSmaller.removeEventListener('click', onButtonPhotoSmaller);
  buttonCloseUpload.removeEventListener('click', onFormClose);
  uploadDescription.removeEventListener('keydown', onUploadDescriptionKeydown);
  hashtag.removeEventListener('keydown', onHashtagKeydown);
  resetFilters();
  resetScale();
  uploadForm.reset();
};

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

    if (isFormValid()) {
      blockSubmitButton();
      sendData(
        () => {
          closeForm();
          createModalMessage(ModalType.SUCCESS);
          unblockSubmitButton();
        },
        () => {
          closeForm();
          createModalMessage(ModalType.ERROR);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const onFormOpen = () => {
  effectsDefault.checked = true;
  modalUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  createScaleZoom();
  chooseFile();
  uploadForm.addEventListener('change', onFilterChange);
  buttonControlBigger.addEventListener('click', onButtonPhotoBigger);
  buttonControlSmaller.addEventListener('click', onButtonPhotoSmaller);
  document.addEventListener('keydown', onPopupEscKeydown);
  buttonCloseUpload.addEventListener('click', onFormClose);
  uploadDescription.addEventListener('keydown', onUploadDescriptionKeydown);
  hashtag.addEventListener('keydown', onHashtagKeydown);
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
