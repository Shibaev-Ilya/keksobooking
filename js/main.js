import './validation.js';
import {deactivateForms, activateForms} from "./page-activator.js";
import {alertMessage} from "./generator.js";
import "./price-slider.js";
import {mapInit, addOffers} from "./map.js";
import {getData} from "./server-connect.js";
import "./file.js";

// блокировка форм
deactivateForms();
// инициализация карты и активация форм
mapInit(activateForms);

// получение данных с сервера и добавляем метки на карту
getData(alertMessage, addOffers);


