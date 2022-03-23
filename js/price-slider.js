export const slider = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');
const selectType = document.querySelector('#type');
let initialValue = parseInt(inputPrice.getAttribute('placeholder'));

export let createPriceSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100000,
    },
    start: initialValue,
    step: 1,
    connect: 'lower',
    // форматирование чисел в слайдере для вывода в инпут to
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

// инициализация слайдера
createPriceSlider();

// получем значение слайдера и записываем в инпут
slider.noUiSlider.on('update', () => {
  inputPrice.value = slider.noUiSlider.get();
});

// активация и деактивация слацдера
//slider.setAttribute('disabled', true);
// slider.removeAttribute('disabled');