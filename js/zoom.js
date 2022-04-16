const DefaultState = {
  SCALE: 1,
  PERCENT: 100
};

const StepPercent = {
  MIN: 25,
  MAX: 100,
};

const ZoomAction = {
  IN: 'in',
  OUT: 'out'
};

const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

let currentScale = DefaultState.SCALE;
let currentPercent = DefaultState.PERCENT;

const resetScale = () => {
  currentScale = DefaultState.SCALE;
  currentPercent = DefaultState.PERCENT;
  photo.style.transform = `scale(${ currentScale })`;
  scaleControlValue.value = `${ currentPercent }%`;
};

const changeScale = (plusOrMinus) => {
  if (plusOrMinus === ZoomAction.IN && currentPercent < StepPercent.MAX) {
    currentScale = currentScale + StepPercent.MIN / StepPercent.MAX;
    currentPercent = currentPercent + StepPercent.MIN;
  } else if (plusOrMinus === ZoomAction.OUT && currentPercent > StepPercent.MIN) {
    currentScale = currentScale - StepPercent.MIN / StepPercent.MAX;
    currentPercent = currentPercent - StepPercent.MIN;
  }
  photo.style.transform = `scale(${ currentScale })`;
  scaleControlValue.value = `${ currentPercent }%`;

  buttonControlSmaller.disabled = currentPercent <= StepPercent.MIN;
  buttonControlBigger.disabled = currentPercent >= StepPercent.MAX;
};

const onButtonPhotoBigger = () => {
  changeScale(ZoomAction.IN);
};

const onButtonPhotoSmaller = () => {
  changeScale(ZoomAction.OUT);
};

const createScaleZoom = () => {
  photo.style.transform = `scale(${ currentScale })`;
  scaleControlValue.value = `${ currentPercent }%`;
  buttonControlSmaller.disabled = false;
};

export {createScaleZoom, onButtonPhotoBigger, onButtonPhotoSmaller, resetScale};
