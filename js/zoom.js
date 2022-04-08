const STEP_PERCENT_VALUE = 25;

const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

let currentScale = 1;
let currentPercent = 100;

const ZoomAction = {
  IN: 'in',
  OUT: 'out'
};
//при переключении превью масштаб сбросить
const resetScale = () => {
  currentScale = 1;
  currentPercent = 100;
  photo.style.transform = `scale(${currentScale})`;
  scaleControlValue.value = `${currentPercent}%`;
};

const changeScale = (plusOrMinus) => {
  if (plusOrMinus === ZoomAction.IN && currentPercent < 100) {
    currentScale = currentScale + STEP_PERCENT_VALUE / 100;
    currentPercent = currentPercent + STEP_PERCENT_VALUE;
  } else if (plusOrMinus === ZoomAction.OUT && currentPercent > 25) {
    currentScale = currentScale - STEP_PERCENT_VALUE / 100;
    currentPercent = currentPercent - STEP_PERCENT_VALUE;
  }
  photo.style.transform = `scale(${currentScale})`;
  scaleControlValue.value = `${currentPercent}%`;

  buttonControlSmaller.disabled = currentScale <= 0.25;
  buttonControlBigger.disabled = currentPercent >= 100;
};

const onPhotoBigger = () => {
  changeScale(ZoomAction.IN);
};

const onPhotoSmaller = () => {
  changeScale(ZoomAction.OUT);
};

const createScaleZoom = () => {
  photo.style.transform = `scale(${currentScale})`;
  scaleControlValue.value = `${currentPercent}%`;
  if (currentPercent >= 100) {
    buttonControlBigger.disabled = true;
  }
};

export {createScaleZoom, onPhotoBigger, onPhotoSmaller, resetScale};
