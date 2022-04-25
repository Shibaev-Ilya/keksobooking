/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/validation.js */ \"./js/modules/validation.js\");\n/* harmony import */ var _modules_page_activator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/page-activator.js */ \"./js/modules/page-activator.js\");\n/* harmony import */ var _modules_generator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/generator.js */ \"./js/modules/generator.js\");\n/* harmony import */ var _modules_price_slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/price-slider.js */ \"./js/modules/price-slider.js\");\n/* harmony import */ var _modules_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/map.js */ \"./js/modules/map.js\");\n/* harmony import */ var _modules_server_connect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/server-connect.js */ \"./js/modules/server-connect.js\");\n/* harmony import */ var _modules_file_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/file.js */ \"./js/modules/file.js\");\n/* harmony import */ var _modules_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/filter.js */ \"./js/modules/filter.js\");\n\n\n\n\n\n\n\n\n\n\nconst clearFilterBtn = document.querySelector('#clear-filter');\n\n// блокировка форм\n(0,_modules_page_activator_js__WEBPACK_IMPORTED_MODULE_1__.deactivateForms)();\n// инициализация карты и активация форм\n(0,_modules_map_js__WEBPACK_IMPORTED_MODULE_4__.mapInit)(_modules_page_activator_js__WEBPACK_IMPORTED_MODULE_1__.activateForms);\n\n// получение данных с сервера и добавляем метки на карту\n(0,_modules_server_connect_js__WEBPACK_IMPORTED_MODULE_5__.getData)(_modules_generator_js__WEBPACK_IMPORTED_MODULE_2__.alertMessage, (wizards) => {\n  (0,_modules_map_js__WEBPACK_IMPORTED_MODULE_4__.addOffers)(wizards);\n  (0,_modules_filter_js__WEBPACK_IMPORTED_MODULE_7__.filterType)(wizards, _modules_map_js__WEBPACK_IMPORTED_MODULE_4__.addOffers);\n  clearFilterBtn.addEventListener('click', () => (0,_modules_map_js__WEBPACK_IMPORTED_MODULE_4__.addOffers)(wizards))\n});\n\n\n\n\n//# sourceURL=webpack://keksobooking/./js/main.js?");

/***/ }),

/***/ "./js/modules/file.js":
/*!****************************!*\
  !*** ./js/modules/file.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearFiles\": () => (/* binding */ clearFiles)\n/* harmony export */ });\nconst FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];\nconst avatarInput = document.querySelector('#avatar');\nconst preview = document.querySelector('.ad-form-header__preview img');\nconst photoInput = document.querySelector('#images');\nconst photosArea = document.querySelector('.ad-form__photo-container');\nconst photoBlock = document.querySelector('.ad-form__photo');\n\navatarInput.addEventListener('change', () => {\n  const file = avatarInput.files[0];\n  const fileName = file.name.toLowerCase();\n\n  const matches = FILE_TYPES.some((it) => {\n    return fileName.endsWith(it);\n  });\n  if (matches) {\n    preview.src = URL.createObjectURL(file);\n  }\n});\n\nphotoInput.addEventListener('change', () => {\n  const files = photoInput.files;\n\n  for (let i = 0; i < files.length; i++) {\n    let file = files.item(i);\n    const fileName = file.name.toLowerCase();\n    const matches = FILE_TYPES.some((it) => {\n      return fileName.endsWith(it);\n    });\n    if (matches) {\n      let newPhoto = photoBlock.cloneNode();\n      photoBlock.remove();\n      newPhoto.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;\n      newPhoto.style.backgroundSize = 'cover';\n      newPhoto.style.backgroundPosition = 'center';\n      photosArea.append(newPhoto);\n    }\n  }\n\n});\n\nlet clearFiles = () => {\n  preview.src = 'img/muffin-grey.svg';\n  let newPhoto = photoBlock.cloneNode();\n  newPhoto.style.backgroundImage = 'none';\n  photosArea.querySelectorAll('.ad-form__photo').forEach( el => el.remove());\n  photosArea.append(newPhoto);\n};\n\n//# sourceURL=webpack://keksobooking/./js/modules/file.js?");

/***/ }),

/***/ "./js/modules/filter.js":
/*!******************************!*\
  !*** ./js/modules/filter.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"filterType\": () => (/* binding */ filterType)\n/* harmony export */ });\nconst selectType = document.querySelector('#housing-type');\nconst selectPrice = document.querySelector('#housing-price');\nconst selectRooms = document.querySelector('#housing-rooms');\nconst selectGuests = document.querySelector('#housing-guests');\nconst featureButtons = Array.from(document.querySelectorAll('.map__checkbox'));\n\nconst mapFilter = document.querySelector('.js-map__filters');\n\nconst PricesRange = {\n  low: {\n    MIN: 0,\n    MAX: 9999,\n  },\n  middle: {\n    MIN: 10000,\n    MAX: 50000,\n  },\n  high: {\n    MIN: 50001,\n    MAX: 100000,\n  },\n};\n\nlet checkPrice = element => {\n  if (selectPrice.value === 'any') {\n    return true;\n  }\n  return element['offer']['price'] >= PricesRange[selectPrice.value]['MIN'] && element['offer']['price'] <= PricesRange[selectPrice.value]['MAX'];\n};\nlet checkType = element => element['offer']['type'] === selectType.value || selectType.value === 'any';\nlet checkRooms = element => element['offer']['rooms'] === +selectRooms.value || selectRooms.value === 'any';\nlet checkGuests = element => element['offer']['guests'] === +selectGuests.value || selectGuests.value === 'any';\nlet checkFeatures = (element, target) => {\n  if (target.classList.contains('map__checkbox')) {\n    let featuresArr = element['offer']['features'];\n    let checkedFeatures = featureButtons.filter((el) => el.checked).map((el) => el.value);\n    return checkedFeatures.every((checkedFeature) => featuresArr && featuresArr.includes(checkedFeature));\n  }\n  return true;\n};\n\nlet filterType = (data, cb) => {\n\n  let newArray = [];\n\n  mapFilter.addEventListener('change', (evt) => {\n    newArray = data.filter((el) => checkType(el) && checkPrice(el) && checkRooms(el) && checkGuests(el) && checkFeatures(el, evt.target));\n    cb(newArray);\n  });\n\n};\n\n\n//# sourceURL=webpack://keksobooking/./js/modules/filter.js?");

/***/ }),

/***/ "./js/modules/generator.js":
/*!*********************************!*\
  !*** ./js/modules/generator.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"alertMessage\": () => (/* binding */ alertMessage),\n/* harmony export */   \"createCard\": () => (/* binding */ createCard),\n/* harmony export */   \"errorMessage\": () => (/* binding */ errorMessage),\n/* harmony export */   \"successMessage\": () => (/* binding */ successMessage)\n/* harmony export */ });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./js/modules/util.js\");\n\n\nconst cardTemplate = document.querySelector(\"#card\").content.querySelector(\".popup\");\nconst errorPopup = document.querySelector(\"#error\").content.querySelector(\".error\");\nconst successPopup = document.querySelector(\"#success\").content.querySelector(\".success\");\n\nlet createCard = (data) => {\n  let {author, offer, location} = data;\n  const cardElement = cardTemplate.cloneNode(true);\n  let featuresContainer = cardElement.querySelector('.popup__features');\n  let featureList = featuresContainer.querySelectorAll('.popup__feature');\n  let photosContainer = cardElement.querySelector('.popup__photos');\n  let featureArr = offer.features ? offer.features: [];\n  let srcArray = offer.photos ? offer.photos: [];\n\n  const similarListFragment = document.createDocumentFragment();\n\n  srcArray.forEach((src) => {\n    let photoElement = photosContainer.querySelector('.popup__photo').cloneNode(true);\n    photoElement.src = src;\n    similarListFragment.append(photoElement);\n  });\n\n  photosContainer.innerHTML = '';\n\n  photosContainer.append(similarListFragment);\n\n  featureList.forEach((element) => {\n\n    const isNecessary = featureArr.some(\n      (featureElement) => element.classList.contains('popup__feature--' + featureElement),\n    );\n\n    if (!isNecessary) {\n      element.remove();\n    }\n\n  });\n\n  cardElement.querySelector(\".popup__title\").textContent = offer.title;\n  cardElement.querySelector(\".popup__text--address\").textContent = offer.address ? offer.address: '-';\n  cardElement.querySelector(\".popup__text--price\").textContent = `${offer.price} ₽/ночь`;\n  cardElement.querySelector(\".popup__type\").textContent = _util_js__WEBPACK_IMPORTED_MODULE_0__.TYPE[offer.type];\n  cardElement.querySelector(\".popup__text--capacity\").textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;\n  cardElement.querySelector(\".popup__text--time\").textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;\n  cardElement.querySelector(\".popup__description\").textContent = offer.description ? offer.description : '';\n  cardElement.querySelector(\".popup__avatar\").src = author.avatar ? author.avatar : '/img/avatars/default.png';\n\n  return cardElement;\n};\n\n// всплывающее сообщение об ошибке на 3 сек\nlet alertMessage = (errorText = 'done') => {\n\n  let alarm = document.createElement('div');\n  alarm.style.backgroundColor = \"#ff6547\";\n  alarm.style.position = \"fixed\";\n  alarm.style.top = \"0\";\n  alarm.style.left = \"0\";\n  alarm.style.textAlign = \"center\";\n  alarm.style.fontWeight = \"700\";\n  alarm.style.padding = \"20px 30px\";\n  alarm.textContent = `${errorText}. Try later`;\n\n  document.body.append(alarm);\n\n  setTimeout(() => alarm.remove(), 3000);\n\n};\n\nlet successMessage = () => {\n  let popup = successPopup.cloneNode(true);\n  onForm(popup);\n};\n\nlet errorMessage = () => {\n  let popup = errorPopup.cloneNode(true);\n  onForm(popup);\n};\n\n// добавить попап и навесить на него обработчики его закрытия\nlet onForm = (popup) => {\n  popup.addEventListener('click', () => {\n    popup.remove();\n  });\n  document.addEventListener('keydown', (evt) => {\n    if (evt.key === 'Escape') {\n      popup.remove();\n    }\n  });\n  document.body.append(popup);\n};\n\n//# sourceURL=webpack://keksobooking/./js/modules/generator.js?");

/***/ }),

/***/ "./js/modules/map.js":
/*!***************************!*\
  !*** ./js/modules/map.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addOffers\": () => (/* binding */ addOffers),\n/* harmony export */   \"mapInit\": () => (/* binding */ mapInit),\n/* harmony export */   \"resetForms\": () => (/* binding */ resetForms)\n/* harmony export */ });\n/* harmony import */ var _generator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generator.js */ \"./js/modules/generator.js\");\n/* harmony import */ var _page_activator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-activator.js */ \"./js/modules/page-activator.js\");\n/* harmony import */ var _price_slider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./price-slider.js */ \"./js/modules/price-slider.js\");\n/* harmony import */ var _file_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./file.js */ \"./js/modules/file.js\");\n\n\n\n\n\nconst mapCenter = {\n  lat: 35.68172,\n  lng: 139.75392,\n};\nconst inputAddress = document.querySelector('#address');\nconst resetButton = document.querySelector('.js-reset');\nconst mainForm = document.querySelector('#form1');\nlet filterForm = document.querySelector('.map__filters');\nconst AMOUNT_OFFERS = 15;\n\n// блокируем для ручного ввода\ninputAddress.readOnly = true;\n\n// создаем карту\nconst map = L.map('map-canvas');\n// кастомная иконка главного маркера\nlet myIcon = L.icon({\n  iconUrl: 'img/main-pin.svg',\n  iconSize: [38, 38],\n  iconAnchor: [19, 37],\n  //popupAnchor: [-3, -76],\n});\n// создаем draggable маркер\nlet marker = L.marker(\n  mapCenter,\n  {\n    draggable: true,\n    icon: myIcon\n  }\n);\n\nlet mapInit = (activateForms) => {\n\n  map.on('load', activateForms)\n    .setView(mapCenter, 13);\n\n  // добавляем слои карты с openstreetmap\n  L.tileLayer(\n    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',\n    {\n      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n    },\n  ).addTo(map);\n\n  // добавляем маркер на карту\n  marker.addTo(map);\n\n  inputAddress.value = `${mapCenter.lat}, ${mapCenter.lng}`;\n\n  // меняем инпут в зависимости от положения маркера\n  marker.on('moveend', (evt) => {\n    let coords = evt.target.getLatLng();\n    inputAddress.value = `${coords['lat'].toFixed(5)}, ${coords['lng'].toFixed(5)}`;\n  });\n\n  resetButton.addEventListener('click', (evt) => {\n    evt.preventDefault();\n    (0,_price_slider_js__WEBPACK_IMPORTED_MODULE_2__.resetHandles)();\n    resetForms();\n  });\n\n};\n\n//создаем слой с группой маркеров\nconst markerGroup = L.layerGroup().addTo(map);\n\nlet addOffers = (data) => {\n  // кастомная иконка маркера с офферами\n  let offerMarker = L.icon({\n    iconUrl: 'img/pin.svg',\n    iconSize: [30, 30],\n    iconAnchor: [15, 30],\n    popupAnchor: [0, -15],\n  });\n\n  // перебираем массив с объявлениями, добавляем метку и попап на карту\n  if (data) {\n    markerGroup.clearLayers();\n    (0,_page_activator_js__WEBPACK_IMPORTED_MODULE_1__.activateFilters)();\n    let shortArray = data.slice(0, AMOUNT_OFFERS);\n    shortArray.forEach((el) => {\n      let {location} = el;\n      let popupCard = (0,_generator_js__WEBPACK_IMPORTED_MODULE_0__.createCard)(el);\n      const marker = L.marker({\n          lat: location['lat'],\n          lng: location['lng']\n        },\n        {\n          icon: offerMarker\n        });\n      //добавляем слой с группой маркеров\n      marker.addTo(markerGroup).bindPopup(popupCard);\n    });\n  }\n};\n\nconst resetForms = () => {\n  mainForm.reset();\n  filterForm.reset();\n  marker.setLatLng(mapCenter);\n  map.setView(mapCenter, 13);\n  inputAddress.value = `${mapCenter.lat}, ${mapCenter.lng}`;\n  map.closePopup();\n  (0,_price_slider_js__WEBPACK_IMPORTED_MODULE_2__.resetHandles)();\n  (0,_file_js__WEBPACK_IMPORTED_MODULE_3__.clearFiles)();\n};\n\n//# sourceURL=webpack://keksobooking/./js/modules/map.js?");

/***/ }),

/***/ "./js/modules/page-activator.js":
/*!**************************************!*\
  !*** ./js/modules/page-activator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"activateFilters\": () => (/* binding */ activateFilters),\n/* harmony export */   \"activateForms\": () => (/* binding */ activateForms),\n/* harmony export */   \"deactivateForms\": () => (/* binding */ deactivateForms)\n/* harmony export */ });\nlet mapFilters = document.querySelector('.map__filters');\nlet adForm = document.querySelector('.ad-form');\n\nlet deactivateForms = () => {\n    mapFilters.classList.add('map__filters--disabled');\n    mapFilters.querySelectorAll('.map__filter').forEach((select) => select.setAttribute(\"disabled\", \"disabled\"));\n    adForm.classList.add('ad-form--disabled');\n    adForm.querySelectorAll('input, select, textarea, button').forEach((select) => select.setAttribute(\"disabled\", \"disabled\"));\n};\n\nlet activateForms = () => {\n    adForm.classList.remove('ad-form--disabled');\n    adForm.querySelectorAll('input, select, textarea, button').forEach((select) => select.disabled = false);\n};\n\nlet activateFilters = () => {\n  mapFilters.classList.remove('map__filters--disabled');\n  mapFilters.querySelectorAll('.map__filter').forEach((select) => select.disabled = false);\n};\n\n//# sourceURL=webpack://keksobooking/./js/modules/page-activator.js?");

/***/ }),

/***/ "./js/modules/price-slider.js":
/*!************************************!*\
  !*** ./js/modules/price-slider.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPriceSlider\": () => (/* binding */ createPriceSlider),\n/* harmony export */   \"resetHandles\": () => (/* binding */ resetHandles),\n/* harmony export */   \"slider\": () => (/* binding */ slider)\n/* harmony export */ });\nconst slider = document.querySelector('.ad-form__slider');\nconst inputPrice = document.querySelector('#price');\nlet initialValue = parseInt(inputPrice.getAttribute('placeholder'));\nconst defaultPlaceholder = inputPrice.placeholder;\nlet minPrice = parseInt(inputPrice.placeholder);\n\nlet createPriceSlider = () => {\n  noUiSlider.create(slider, {\n    range: {\n      min: 0,\n      max: 100000,\n    },\n    start: initialValue,\n    step: 1,\n    connect: 'lower',\n    // форматирование чисел в слайдере для вывода в инпут to\n    format: {\n      to: function (value) {\n        return value.toFixed(0);\n      },\n      from: function (value) {\n        return parseFloat(value);\n      },\n    },\n  });\n};\n\n// инициализация слайдера\ncreatePriceSlider();\n\n// получем значение слайдера и записываем в инпут\nslider.noUiSlider.on('slide', () => {\n  inputPrice.value = slider.noUiSlider.get();\n});\n\n// активация и деактивация слацдера\n//slider.setAttribute('disabled', true);\n// slider.removeAttribute('disabled');\n\n// сброс ручки слайдера\nlet resetHandles = () => {\n  slider.noUiSlider.set(minPrice);\n  inputPrice.placeholder = defaultPlaceholder;\n};\n\n//# sourceURL=webpack://keksobooking/./js/modules/price-slider.js?");

/***/ }),

/***/ "./js/modules/server-connect.js":
/*!**************************************!*\
  !*** ./js/modules/server-connect.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"sendData\": () => (/* binding */ sendData)\n/* harmony export */ });\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ \"./js/modules/map.js\");\n\n\nconst getData = (onError, onSuccess) => {\n  fetch('https://25.javascript.pages.academy/keksobooking/data')\n    .then((result) => {\n      if (!result.ok) {\n        onError(`${result.status}`);\n      } else {\n        return result.json()\n      }\n    })\n    .then(data => onSuccess(data))\n    .catch(error => onError(error));\n};\n\nconst sendData = (onSuccess, onFail, body) => {\n  fetch('https://25.javascript.pages.academy/keksobooking',\n    {\n      method: 'POST',\n      body: body,\n    }\n    )\n    .then(result => {\n      if (result.ok) {\n        onSuccess();\n        (0,_map_js__WEBPACK_IMPORTED_MODULE_0__.resetForms)();\n      } else {\n        onFail();\n        console.log(result);\n      }\n    })\n    .catch(() => onFail());\n};\n\n\n//# sourceURL=webpack://keksobooking/./js/modules/server-connect.js?");

/***/ }),

/***/ "./js/modules/util.js":
/*!****************************!*\
  !*** ./js/modules/util.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TYPE\": () => (/* binding */ TYPE),\n/* harmony export */   \"getRandomPositiveInteger\": () => (/* binding */ getRandomPositiveInteger)\n/* harmony export */ });\n// возвращает рандомное число в заданном диапазоне\nconst getRandomPositiveInteger = (a, b) => {\n  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,\n  // реализуем поддержку передачи минимального и максимального значения в любом порядке,\n  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.\n\n  // После нам нужно убедиться, что пользователь не передал дробные значения,\n  // для этого на всякий пожарный случай нижнюю границу диапазона\n  // мы округляем к ближайшему большему целому с помощью Math.ceil,\n  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor\n  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));\n  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));\n  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),\n  // мы не ругаем пользователя за переданное отрицательное число,\n  // а просто берём его по модулю с помощью Math.abs\n\n  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),\n  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.\n  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.\n  const result = Math.random() * (upper - lower + 1) + lower;\n  // \"Плюс единица\", чтобы включить верхнюю границу диапазона в случайные числа\n\n  // И в конце с помощью метода Math.floor мы округляем полученный результат,\n  // потому что Math.random() генерирует только дробные числа и ноль.\n  return Math.floor(result);\n\n}\n// возвращает рандомное чтсло с num количеством знаков после запятой\nconst getRandomPositiveFloat = (a, b, digits = 1) => {\n  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,\n  // реализуем поддержку передачи минимального и максимального значения в любом порядке,\n  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max\n  const lower = Math.min(Math.abs(a), Math.abs(b));\n  const upper = Math.max(Math.abs(a), Math.abs(b));\n  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),\n  // мы не ругаем пользователя за переданное отрицательное число,\n  // а просто берём его по модулю с помощью Math.abs\n\n  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),\n  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.\n  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.\n  const result = Math.random() * (upper - lower) + lower;\n\n  // И в конце с помощью метода toFixed любого числа в JavaScript\n  // указать требуемое количество знаков после точки.\n  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число\n  return +result.toFixed(digits);\n}\n// возвращает рандомный элемент массива\nconst getRandomArrayElement = (data) => {\n\n  if(Array.isArray(data)) {\n    return data[getRandomPositiveInteger(0, data.length - 1)]\n  }\n\n  let arrKeys = Object.keys(data);\n\n  return arrKeys[getRandomPositiveInteger(0, arrKeys.length - 1)]\n\n};\n// возвращает массив случайной длинны из неповторяющихся значений\nconst getRandomArray = (arr) => {\n\n  let newArr = [];\n  let randomLength = getRandomPositiveInteger(0, arr.length -1);\n\n  if (randomLength === arr.length-1) {\n    return arr;\n  }\n\n  for (let i = 0; i <= randomLength; i++) {\n    newArr[i] = arr[getRandomPositiveInteger(0, arr.length - 1)];\n  }\n\n  return Array.from(new Set(newArr));\n\n};\n\nconst TYPE = {\n  'palace': 'Дворец',\n  'flat': 'Квартира',\n  'house': 'Дом',\n  'bungalow': 'Бунгало',\n  'hotel': 'Отель'\n};\n\nfunction debounce (callback, timeoutDelay = 500) {\n  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился\n  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать\n  let timeoutId;\n\n  return (...rest) => {\n    // Перед каждым новым вызовом удаляем предыдущий таймаут,\n    // чтобы они не накапливались\n    clearTimeout(timeoutId);\n\n    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку\n    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);\n\n    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,\n    // пока действие совершается чаще, чем переданная задержка timeoutDelay\n  };\n}\n\nfunction throttle (callback, delayBetweenFrames) {\n  // Используем замыкания, чтобы время \"последнего кадра\" навсегда приклеилось\n  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать\n  let lastTime = 0;\n\n  return (...rest) => {\n    // Получаем текущую дату в миллисекундах,\n    // чтобы можно было в дальнейшем\n    // вычислять разницу между кадрами\n    const now = new Date();\n\n    // Если время между кадрами больше задержки,\n    // вызываем наш колбэк и перезаписываем lastTime\n    // временем \"последнего кадра\"\n    if (now - lastTime >= delayBetweenFrames) {\n      callback.apply(this, rest);\n      lastTime = now;\n    }\n  };\n}\n\n\n\n\n//# sourceURL=webpack://keksobooking/./js/modules/util.js?");

/***/ }),

/***/ "./js/modules/validation.js":
/*!**********************************!*\
  !*** ./js/modules/validation.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _price_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./price-slider.js */ \"./js/modules/price-slider.js\");\n/* harmony import */ var _server_connect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server-connect.js */ \"./js/modules/server-connect.js\");\n/* harmony import */ var _generator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generator.js */ \"./js/modules/generator.js\");\n\n\n\n\nlet mainForm = document.querySelector(\"#form1\");\nlet minPrice = 0;\nlet pristineConfig = {\n  classTo: 'ad-form__element',\n  errorClass: 'has-danger',\n  successClass: 'has-success',\n  errorTextParent: 'ad-form__element',\n  errorTextTag: 'div',\n  errorTextClass: 'text-help'\n};\nconst minPrices = {\n  'bungalow': 0,\n  'flat': 1000,\n  'hotel': 3000,\n  'house': 5000,\n  'palace': 10000,\n};\nconst allowedGuests = {\n  100: ['0'],\n  1: ['1'],\n  2: ['1', '2'],\n  3: ['1', '2', '3'],\n};\nconst inputPrice = mainForm.querySelector('#price');\nconst selectType = mainForm.querySelector('#type');\nconst timeWrapper = mainForm.querySelector('.ad-form__element--time');\nconst timeIn = mainForm.querySelector('#timein');\nconst timeout = mainForm.querySelector('#timeout');\nconst capacity = mainForm.querySelector('#capacity');\nconst roomNumber = mainForm.querySelector('#room_number');\n\nlet formValidation = () => {\n\n  // смена Время заезда и выезда\n  timeWrapper.addEventListener('change', (evt) => {\n    if (evt.target === timeIn) {\n      timeout.value = timeIn.value;\n    }\n    if (evt.target === timeout) {\n      timeIn.value = timeout.value;\n    }\n  });\n\n  //смена плейсхолдера в поле цена\n  let changePricePlaceholder = () => {\n    inputPrice.placeholder = minPrices[selectType.value];\n    inputPrice.setAttribute('data-pristine-min', minPrices[selectType.value]);\n\n    minPrice = parseInt(inputPrice.placeholder);\n    // обновляем данные слайдера при смене типа жилья\n    _price_slider_js__WEBPACK_IMPORTED_MODULE_0__.slider.noUiSlider.updateOptions({\n      range: {\n        min: minPrice,\n        max: 100000,\n      },\n      step: 1,\n    });\n// устанавливаем ручку слайдера в новую позицию после смены\n    _price_slider_js__WEBPACK_IMPORTED_MODULE_0__.slider.noUiSlider.set(minPrice);\n\n  };\n\n  selectType.addEventListener('change', changePricePlaceholder);\n\n  // create the pristine instance\n  let pristine = new Pristine(mainForm, pristineConfig);\n\n  mainForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    // check if the form is valid\n    let valid = pristine.validate(); // returns true or false\n    let form = new FormData(e.target);\n    if (valid) {\n      (0,_server_connect_js__WEBPACK_IMPORTED_MODULE_1__.sendData)(\n        _generator_js__WEBPACK_IMPORTED_MODULE_2__.successMessage,\n        _generator_js__WEBPACK_IMPORTED_MODULE_2__.errorMessage,\n        form\n      );\n    }\n  });\n\n  // валидация поля цена за ночь на основе типа жилья\n  let priceErrorMessage = () => `Price for this type of apartment should be more than ${inputPrice.placeholder}`;\n  let checkValidPrice = value => value >= minPrices[selectType.value];\n  pristine.addValidator(inputPrice, checkValidPrice, priceErrorMessage);\n\n  // валидация разрешенного количества гостей\n  let capacityErrorMessage = () => `max ${allowedGuests[roomNumber.value]}`;\n  let checkCapacity = (value) => allowedGuests[roomNumber.value].includes(value);\n  pristine.addValidator(capacity, checkCapacity, capacityErrorMessage);\n\n};\n\n// валидация формы при загрузке окна\nwindow.onload = function() {\n  formValidation(mainForm);\n};\n\n//# sourceURL=webpack://keksobooking/./js/modules/validation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;