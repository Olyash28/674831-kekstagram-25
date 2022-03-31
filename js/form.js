import {isEscapeKey} from './util.js';

const btnUpload = document.querySelector('#upload-file');
const modalUpload = document.querySelector('.img-upload__overlay');
const closeBtnUpload = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('#upload-select-image');
const hashtag = uploadForm.querySelector('.text__hashtags');
const uploadDescription = uploadForm.querySelector('.text__description');
const btnSubmit = uploadForm.querySelector('#upload-submit');

const pristine = new Pristine(uploadForm);

const openForm = () => {
  modalUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  closeBtnUpload.addEventListener('click', onCloseForm);
  // btnSubmit.setAttribute('disabled', '');
  // btnSubmit.disabled = true;
};

//отменить обработчик Esc при фокусе
uploadDescription.addEventListener('keydown',  (evt) => {
  evt.stopPropagation();
});

hashtag.addEventListener('keydown',  (evt) => {
  evt.stopPropagation();
});

const closeForm = () => {
  modalUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeBtnUpload.removeEventListener('click', onCloseForm);
  pristine.reset();
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function onCloseForm() {
  closeForm();
  btnUpload.value = '';
}

btnUpload.addEventListener('change', openForm);

const checkValue = (value) => {
  let textError = '';
  let isValid = true;
  const usersTags = value.trim().split(' ');
  const uniqueTags = Array.from(new Set(usersTags));
  const isUniqArrValid = uniqueTags.every((item) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item));

  if(!isUniqArrValid) {
    isValid = false;
    textError = 'В хэш-теге от 2 до 20 символов с #';
    btnSubmit.disabled = true;
  }
  if(usersTags.length !== uniqueTags.length) {
    isValid = false;
    textError = 'Хэш-теги не должны повторяться';
    btnSubmit.disabled = true;
  }
  if(uniqueTags.length > 5) {
    isValid = false;
    textError = 'Нельзя указать больше пяти хэш-тегов';
    btnSubmit.disabled = true;
  }
  if (value.length === 0) {
    isValid = true;
    btnSubmit.disabled = false;
  }

  return {
    isValid,
    textError
  };
};

function validateHashtag(value) {
  const {isValid} = checkValue(value);

  return isValid;
}

function getTextError(value) {
  const {textError} = checkValue(value);

  return textError;
}

function validateDescription(value) {
  return value.length <= 140;
}

pristine.addValidator(hashtag, validateHashtag, getTextError);
pristine.addValidator(uploadDescription, validateDescription, 'Не больше 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
