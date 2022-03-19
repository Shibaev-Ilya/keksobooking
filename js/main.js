import {createOffers} from './create-objects.js';
import {createCard, mapCanvas} from './generator.js';
import {formValidation, mainForm} from './validation.js'
import {activatePage} from "./page-activator.js";

// создаем массив с апартаментами
let offers = createOffers(5);

//добавляем аппартаменты на страницу
const similarListFragment = document.createDocumentFragment();
offers.forEach((data) => similarListFragment.append(createCard(data)));
mapCanvas.append(similarListFragment);

// валидация формы при загрузке окна
window.onload = function() {
  formValidation(mainForm);
};

// активация форм на странице
activatePage(true);