import './validation.js';
import {deactivateForms} from "./page-activator.js";
import "./price-slider.js";
import {serverConnect, host} from "./server-connect.js";

// блокировка форм
deactivateForms();

// получение данных с сервера и инициализация карты
serverConnect(host);

let addressFromInput = document.querySelector("#server-address");
let addressButton = document.querySelector("#server-address-button");
addressFromInput.value = host;

