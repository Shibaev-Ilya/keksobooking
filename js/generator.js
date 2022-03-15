import {TYPE} from './create-objects.js';

export const mapCanvas = document.querySelector("#map-canvas");
const cardTemplate = document.querySelector("#card").content.querySelector(".popup");

export let createCard = (data) => {
  let {author, offer, location} = data;
  const cardElement = cardTemplate.cloneNode(true);
  let featuresContainer = cardElement.querySelector('.popup__features');
  let featureList = featuresContainer.querySelectorAll('.popup__feature');
  let featureArr = offer.features;
  let photosContainer = cardElement.querySelector('.popup__photos');
  let srcArray = offer.photos;

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
      (featureELement) => element.classList.contains('popup__feature--' + featureELement),
    );

    if (!isNecessary) {
      element.remove();
    }

  });

  cardElement.querySelector(".popup__title").textContent = offer.title;
  cardElement.querySelector(".popup__text--address").textContent = offer.address;
  cardElement.querySelector(".popup__text--price").textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector(".popup__type").textContent = TYPE[offer.type];
  cardElement.querySelector(".popup__text--capacity").textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector(".popup__text--time").textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector(".popup__description").textContent = offer.description;
  cardElement.querySelector(".popup__avatar").src = author.avatar;

  return cardElement;
};
