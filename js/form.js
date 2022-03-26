import {isEscapeKey} from './util.js';

const btnUpload = document.querySelector('#upload-file');
const modalUpload = document.querySelector('.img-upload__overlay');
const closeBtnUpload = document.querySelector('#upload-cancel');

const openForm = () => {
  modalUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeForm = () => {
  modalUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeBtnUpload.removeEventListener('click', onCloseForm);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function onCloseForm() {
  closeForm();
  // необходимо сбрасывать значение поля выбора файла
  btnUpload.value = '';
}

btnUpload.addEventListener('change', openForm);

closeBtnUpload.addEventListener('click', onCloseForm);

// Валидация
const uploadForm = document.querySelector('#upload-select-image');
const hashtag = uploadForm.querySelector('.text__hashtags');
const uploadDescription = uploadForm.querySelector('.text__description');

//отменить обработчик Esc при фокусе
uploadDescription.addEventListener('keydown',  (evt) => {
  evt.stopPropagation();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'setup-wizard-form__element',
  errorTextParent: 'setup-wizard-form__element',
  // errorTextClass: 'setup-wizard-form__error-text',
});

function validateHashtag(value) {
  const hashtagValid = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  hashtagValid.test(value);

  return hashtagValid;
}

//нельзя указать больше пяти хэш-тегов;
// const checkAmountHashtag = () => {
//   const tags = hashtag.value;
//   const preHashtagList = tags.split(' ', 5);
//   const hashtagList = Array.from(new Set(preHashtagList));
//   // for (let i = 0; i < hashtagList.length; i++) {
//   //   validateHashtag();
//   // }
// };
//нельзя указать больше пяти хэш-тегов;

function validateDescription(value) {
  return value.length <= 6;
}

pristine.addValidator(hashtag, validateHashtag, 'обязателен # и не больше 20 символов');
pristine.addValidator(uploadDescription, validateDescription, 'не больше 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
