const STEP_SCALE = 0.25;
const STEP_PERCENT_VALUE = 25;

const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

let currentScale = 1;
let currentPercent = 100;

const smallerScale = () => {
  buttonControlBigger.disabled = false;
  photo.style.transform = `scale(${currentScale - STEP_SCALE})`;
  scaleControlValue.value = `${currentPercent - STEP_PERCENT_VALUE}%`;
  currentScale = currentScale - STEP_SCALE;
  currentPercent = currentPercent - STEP_PERCENT_VALUE;
  if (currentPercent <= 25) {
    buttonControlSmaller.disabled = true;
  }
};

const biggerScale = () => {
  buttonControlSmaller.disabled = false;
  photo.style.transform = `scale(${currentScale + STEP_SCALE})`;
  scaleControlValue.value = `${currentPercent + STEP_PERCENT_VALUE}%`;
  currentScale = currentScale + STEP_SCALE;
  currentPercent = currentPercent + STEP_PERCENT_VALUE;
  if (currentPercent >= 100) {
    buttonControlBigger.disabled = true;
  }
};

function onPhotoSmaller() {
  smallerScale();
}

function onPhotoBigger() {
  biggerScale();
}

const getChangeScale = () => {
  photo.style.transform = `scale(${currentScale})`;
  scaleControlValue.value = `${currentPercent}%`;
  if (currentPercent >= 100) {
    buttonControlBigger.disabled = true;
  }

  buttonControlSmaller.addEventListener('click', onPhotoSmaller);
  buttonControlBigger.addEventListener('click', onPhotoBigger);
};

export {getChangeScale};
