import {resetForms} from "./map.js";

export const getData = (onError, onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((result) => {
      if (!result.ok) {
        onError(`${result.status}`);
      } else {
        return result.json()
      }
    })
    .then(data => onSuccess(data))
    .catch(error => onError(error));
};

export const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    }
    )
    .then(result => {
      if (result.ok) {
        onSuccess();
        resetForms();
      } else {
        onFail();
        console.log(result);
      }
    })
    .catch(() => onFail());
};
