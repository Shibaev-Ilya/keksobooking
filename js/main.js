import {createOffers} from './create-objects.js';
import {createCard, mapCanvas} from './generator.js';
import './validation.js';
import {activateForms, deactivateForms} from "./page-activator.js";
import {mapInit} from "./map.js";

// создаем массив с апартаментами
let offers = createOffers(5);

//добавляем аппартаменты на страницу
const similarListFragment = document.createDocumentFragment();
offers.forEach((data) => similarListFragment.append(createCard(data)));
//mapCanvas.append(similarListFragment);

// блокировка форм
deactivateForms();

// инициализация карты и активация форм
mapInit(activateForms);
