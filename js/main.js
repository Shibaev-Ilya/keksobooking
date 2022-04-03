import './validation.js';
import {deactivateForms, activateForms} from "./page-activator.js";
import {createErrorMessage} from "./generator.js";
import "./price-slider.js";
import {mapInit, addOffers} from "./map.js";
import {getData} from "./server-connect.js";

// блокировка форм
deactivateForms();
// инициализация карты и активация форм
mapInit(activateForms);

// получение данных с сервера и добавляем метки на карту
getData(createErrorMessage, addOffers);


