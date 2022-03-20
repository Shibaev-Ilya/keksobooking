let mainForm = document.querySelector(".ad-form");

let formValidation = (form) => {

  let pristineConfig = {
    classTo: 'ad-form__element',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
  };

  const inputPrice = form.querySelector('#price');
  const selectType = form.querySelector('#type');
  const timeWrapper = form.querySelector('.ad-form__element--time');
  const timeIn = form.querySelector('#timein');
  const timeout = form.querySelector('#timeout');
  const capacity = form.querySelector('#capacity');
  const roomNumber = form.querySelector('#room_number');
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
  };
  selectType.addEventListener('change', changePricePlaceholder);

  // create the pristine instance
  let pristine = new Pristine(form, pristineConfig);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // check if the form is valid
    let valid = pristine.validate(); // returns true or false
    if (valid) form.submit();
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