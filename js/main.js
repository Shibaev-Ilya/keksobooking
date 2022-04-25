import './modules/validation.js';
import {deactivateForms, activateForms} from "./modules/page-activator.js";
import {alertMessage} from "./modules/generator.js";
import "./modules/price-slider.js";
import {mapInit, addOffers} from "./modules/map.js";
import {getData} from "./modules/server-connect.js";
import "./modules/file.js";
import "./modules/filter.js"
import {filterType} from "./modules/filter.js";
import {clearMap} from "./modules/map.js";

const clearFilterBtn = document.querySelector('#clear-filter');

// блокировка форм
deactivateForms();
// инициализация карты и активация форм
mapInit(activateForms);

// получение данных с сервера и добавляем метки на карту
getData(alertMessage, (wizards) => {
  addOffers(wizards);
  filterType(wizards, addOffers);
  clearFilterBtn.addEventListener('click', () => {
    addOffers(wizards);
    clearMap();
  })
});


