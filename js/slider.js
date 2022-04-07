import {resetScale} from './zoom.js';

const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value'); //инпут слайдера
const photo = document.querySelector('.img-upload__preview img');//большая фотка
const sliderContainer = document.querySelector('.img-upload__effect-level');
let filterType = '';

sliderValue.value = 1; //первоначальное значение слайдера в инпуте
sliderContainer.classList.add('hidden');

if(slider.noUiSlider) {
  slider.noUiSlider.on('update', () => {
    const newValue = slider.noUiSlider.get();
    let unit = '';

    if (filterType === 'blur') {
      unit = 'px';
    }
    if (filterType === 'invert') {
      unit = '%';
    }

    sliderValue.value = newValue;
    photo.style.filter = `${filterType}(${newValue}${unit})`;
  });
}

const getOptionsSlider = (options) => {
  if(options !== 'none' && !slider.noUiSlider) {
    sliderContainer.classList.remove('hidden');
    noUiSlider.create(slider, {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    });
  }

  switch (options) {
    case 'chrome': {
      filterType = 'grayscale';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
        connect: 'lower',
      });
      break;
    }
    case 'sepia': {
      filterType = 'sepia';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
        connect: 'lower',
      });
      break;
    }
    case 'marvin': {
      filterType = 'invert';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    }
    case 'phobos': {
      filterType = 'blur';
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    }
    case 'heat': {
      filterType = 'brightness';
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    }
    default:
      filterType = 'none';
      photo.style.filter = 'none';
      sliderContainer.classList.add('hidden');
      slider.noUiSlider.destroy();
  }
};

const onFilterChange = (evt) => {
  resetScale();
  if (evt.target.matches('input[type="radio"]')) {
    photo.className = `effects__preview--${evt.target.value}`; //evt.target.value здесь это value radio
    getOptionsSlider(evt.target.value);
  }
};

export {onFilterChange};
