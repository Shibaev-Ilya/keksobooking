import {slider} from "./price-slider.js";
import {sendData} from "./server-connect.js";
import {successMessage, errorMessage} from "./generator.js";

let mainForm = document.querySelector("#form1");
let minPrice = 0;
let pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};
const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const allowedGuests = {
  100: ['0'],
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
};
const inputPrice = mainForm.querySelector('#price');
const selectType = mainForm.querySelector('#type');
const timeWrapper = mainForm.querySelector('.ad-form__element--time');
const timeIn = mainForm.querySelector('#timein');
const timeout = mainForm.querySelector('#timeout');
const capacity = mainForm.querySelector('#capacity');
const roomNumber = mainForm.querySelector('#room_number');

let formValidation = () => {

  // смена Время заезда и выезда
  timeWrapper.addEventListener('change', (evt) => {
    if (evt.target === timeIn) {
      timeout.value = timeIn.value;
    }
    if (evt.target === timeout) {
      timeIn.value = timeout.value;
    }
  });

  //смена плейсхолдера в поле цена
  let changePricePlaceholder = () => {
    inputPrice.placeholder = minPrices[selectType.value];
    inputPrice.setAttribute('data-pristine-min', minPrices[selectType.value]);

    minPrice = parseInt(inputPrice.placeholder);
    // обновляем данные слайдера при смене типа жилья
    slider.noUiSlider.updateOptions({
      range: {
        min: minPrice,
        max: 100000,
      },
      step: 1,
    });
// устанавливаем ручку слайдера в новую позицию после смены
    slider.noUiSlider.set(minPrice);

  };

  selectType.addEventListener('change', changePricePlaceholder);

  // create the pristine instance
  let pristine = new Pristine(mainForm, pristineConfig);

  mainForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // check if the form is valid
    let valid = pristine.validate(); // returns true or false
    let form = new FormData(e.target);
    if (valid) {
      sendData(
        successMessage,
        errorMessage,
        form
      );
    }
  });

  // валидация поля цена за ночь на основе типа жилья
  let priceErrorMessage = () => `Price for this type of apartment should be more than ${inputPrice.placeholder}`;
  let checkValidPrice = value => value >= minPrices[selectType.value];
  pristine.addValidator(inputPrice, checkValidPrice, priceErrorMessage);

  // валидация разрешенного количества гостей
  let capacityErrorMessage = () => `max ${allowedGuests[roomNumber.value]}`;
  let checkCapacity = (value) => allowedGuests[roomNumber.value].includes(value);
  pristine.addValidator(capacity, checkCapacity, capacityErrorMessage);

};

// валидация формы при загрузке окна
window.onload = function() {
  formValidation(mainForm);
};