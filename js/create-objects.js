import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray} from './util.js';

export const TYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// Генерация данных
const createObject = (imgNumber) => {

    let locationLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
    let locationLng = getRandomPositiveFloat(139.70000, 139.80000, 5);

    let imageName = imgNumber + 1;
    if (imageName < 10) {
        imageName = `user0${imageName}.png`;
    } else {
      imageName = 'default.png';
    }

    return {
        'author': {
            'avatar': `img/avatars/${imageName}`,
        },
        'offer': {
            'title': `Заголовок ${getRandomPositiveInteger(1, 100)}`,
            'address': `${locationLat}, ${locationLng}`,
            'price': getRandomPositiveInteger(1000, 10000),
            'type': getRandomArrayElement(TYPE),
            'rooms': getRandomPositiveInteger(1, 10),
            'guests': getRandomPositiveInteger(1, 10),
            'checkin': getRandomArrayElement(TIMES),
            'checkout': getRandomArrayElement(TIMES),
            'features': getRandomArray(FEATURES),
            'description': `Описание помещения ${getRandomPositiveInteger(1, 100)}`,
            'photos': PHOTOS,
        },
        'location': {
            'lat': locationLat,
            'lng': locationLng,
        },

    }

};

let createOffers = (count) => {
  let offersArray = [];
  for (let i = 0; i < count; i++) {
    offersArray[i] = createObject(i);
  }
  return offersArray;
};

export {createOffers};