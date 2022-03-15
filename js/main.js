import {createOffers} from './create-objects.js';
import {createCard, mapCanvas} from './generator.js';
import {formValidation, mainForm} from './validation.js'
import {activatePage} from "./page-activator.js";

let offers = createOffers(5);

const similarListFragment = document.createDocumentFragment();

offers.forEach((data) => similarListFragment.append(createCard(data)));

mapCanvas.append(similarListFragment);

window.onload = function() {

  formValidation(mainForm);

};

activatePage(true);