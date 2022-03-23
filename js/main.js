import './validation.js';
import {activateForms, deactivateForms} from "./page-activator.js";
import {mapInit} from "./map.js";
import "./price-slider.js";


// блокировка форм
deactivateForms();

// инициализация карты и активация форм
mapInit(activateForms);
