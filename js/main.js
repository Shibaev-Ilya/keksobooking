import {creaateOffers} from './create-objects.js';
import {createCard, mapCanvas} from './generator.js';
import {formValidation, mainForm} from './validation.js'

let offers = creaateOffers(4);

const similarListFragment = document.createDocumentFragment();

offers.forEach((data) => similarListFragment.append(createCard(data)));

mapCanvas.append(similarListFragment);

window.onload = function() {

  formValidation(mainForm);

};
