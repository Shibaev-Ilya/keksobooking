import {createErrorMessage} from "./generator.js";
import {mapInit} from "./map.js";
import {activateForms} from "./page-activator.js";
export let host = 'https://25.javascript.pages.academy/keksobooking/data';

export let serverConnect = (address) => {
  fetch(address)
    .then((result) => {
      if (!result.ok) {
        createErrorMessage(result.status);
      } else {
        return result.json()
      }
    })
    .then(data => mapInit(activateForms, data))
    .catch(error => console.warn(error));
};