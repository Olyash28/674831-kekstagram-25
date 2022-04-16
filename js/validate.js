const uploadForm = document.querySelector('#upload-select-image');
const buttonSubmit = uploadForm.querySelector('#upload-submit');
const hashtag = uploadForm.querySelector('.text__hashtags');
const uploadDescription = uploadForm.querySelector('.text__description');

const MAX_LENGTH = 140;
const TEXT_ERROR_AREA = `Не больше ${ MAX_LENGTH } символов`;
const TEXT_ERROR_LENGTH = 'В хэш-теге от 2 до 20 символов с #';
const TEXT_ERROR_REPEAT = 'Хэш-теги не должны повторяться';
const TEXT_ERROR_COUNT = 'Нельзя указать больше пяти хэш-тегов';

const checkValue = (value) => {
  let textError = '';
  let isValid = true;
  const usersTags = value.trim().split(' ').map((tag) => tag.toLowerCase());
  const uniqueTags = Array.from(new Set(usersTags));
  const isUniqArrValid = uniqueTags.every((item) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item));

  if (!isUniqArrValid) {
    isValid = false;
    textError = TEXT_ERROR_LENGTH;
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }

  if (usersTags.length !== uniqueTags.length) {
    isValid = false;
    textError = TEXT_ERROR_REPEAT;
    buttonSubmit.disabled = true;
  }
  if (uniqueTags.length > 5) {
    isValid = false;
    textError = TEXT_ERROR_COUNT;
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

const pristine = new Pristine(uploadForm);
pristine.addValidator(hashtag, validateHashtag, getTextError);
pristine.addValidator(uploadDescription, validateDescription, TEXT_ERROR_AREA);

const isFormValid = () => pristine.validate();

export {isFormValid};
