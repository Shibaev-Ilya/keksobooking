import {TYPE} from './util.js';

const cardTemplate = document.querySelector("#card").content.querySelector(".popup");
const errorPopup = document.querySelector("#error").content.querySelector(".error");
const successPopup = document.querySelector("#success").content.querySelector(".success");

export let createCard = (data) => {
  let {author, offer, location} = data;
  const cardElement = cardTemplate.cloneNode(true);
  let featuresContainer = cardElement.querySelector('.popup__features');
  let featureList = featuresContainer.querySelectorAll('.popup__feature');
  let photosContainer = cardElement.querySelector('.popup__photos');
  let featureArr = offer.features ? offer.features: [];
  let srcArray = offer.photos ? offer.photos: [];

  const similarListFragment = document.createDocumentFragment();

  srcArray.forEach((src) => {
    let photoElement = photosContainer.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = src;
    similarListFragment.append(photoElement);
  });

  photosContainer.innerHTML = '';

  photosContainer.append(similarListFragment);

  featureList.forEach((element) => {

    const isNecessary = featureArr.some(
      (featureElement) => element.classList.contains('popup__feature--' + featureElement),
    );

    if (!isNecessary) {
      element.remove();
    }

  });

  cardElement.querySelector(".popup__title").textContent = offer.title;
  cardElement.querySelector(".popup__text--address").textContent = offer.address ? offer.address: '-';
  cardElement.querySelector(".popup__text--price").textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector(".popup__type").textContent = TYPE[offer.type];
  cardElement.querySelector(".popup__text--capacity").textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector(".popup__text--time").textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector(".popup__description").textContent = offer.description ? offer.description : '';
  cardElement.querySelector(".popup__avatar").src = author.avatar ? author.avatar : '/img/avatars/default.png';

  return cardElement;
};

// всплывающее сообщение об ошибке на 3 сек
export let alertMessage = (errorText = 'done') => {

  let alarm = document.createElement('div');
  alarm.style.backgroundColor = "#ff6547";
  alarm.style.position = "fixed";
  alarm.style.top = "0";
  alarm.style.left = "0";
  alarm.style.textAlign = "center";
  alarm.style.fontWeight = "700";
  alarm.style.padding = "20px 30px";
  alarm.textContent = `${errorText}. Try later`;

  document.body.append(alarm);

  setTimeout(() => alarm.remove(), 3000);

};

export let successMessage = () => {
  let popup = successPopup.cloneNode(true);
  onForm(popup);
};

export let errorMessage = () => {
  let popup = errorPopup.cloneNode(true);
  onForm(popup);
};

// добавить попап и навесить на него обработчики его закрытия
let onForm = (popup) => {
  popup.addEventListener('click', () => {
    popup.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popup.remove();
    }
  });
  document.body.append(popup);
};