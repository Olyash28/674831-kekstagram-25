const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const photo = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let filterType = '';

const PhotoEffect = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

sliderValue.value = 1;
sliderContainer.classList.add('hidden');

const changeOptionsSlider = (option) => {

  if (option !== 'none' && !slider.noUiSlider) {
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

  if (slider.noUiSlider) {
    slider.noUiSlider.on('update', () => {
      const currentValue = slider.noUiSlider.get();
      let unit = '';

      if (filterType === 'blur') {
        unit = 'px';
      }
      if (filterType === 'invert') {
        unit = '%';
      }

      sliderValue.value = currentValue;
      photo.style.filter = `${ filterType }(${ currentValue }${ unit })`;
    });
  }

  switch (option) {
    case PhotoEffect.CHROME: {
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
    case PhotoEffect.SEPIA: {
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
    case PhotoEffect.MARVIN: {
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
    case PhotoEffect.PHOBOS: {
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
    case PhotoEffect.HEAT: {
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
  if (evt.target.matches('input[type="radio"]')) {
    photo.className = `effects__preview--${ evt.target.value }`;
    changeOptionsSlider(evt.target.value);
  }
};

const resetFilters = () => {
  photo.style.filter = 'none';
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
  sliderContainer.classList.add('hidden');
};

export {onFilterChange, resetFilters};
