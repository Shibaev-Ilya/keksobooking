import {createCard} from './generator.js';
import {activateForms} from "./page-activator.js";

const mapCenter = {
  lat: 35.68172,
  lng: 139.75392,
};
const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('[type="reset"]');
const mainForm = document.querySelector('#form1');
let filterForm = document.querySelector('.map__filters');

// блокируем для ручного ввода
inputAddress.readOnly = true;

// создаем карту
const map = L.map('map-canvas');
// кастомная иконка главного маркера
let myIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [38, 38],
  iconAnchor: [19, 37],
  //popupAnchor: [-3, -76],
});
// создаем draggable маркер
let marker = L.marker(
  mapCenter,
  {
    draggable: true,
    icon: myIcon
  }
);

export let mapInit = (activateForms) => {

  map.on('load', activateForms)
    .setView(mapCenter, 13);

  // добавляем слои карты с openstreetmap
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // добавляем маркер на карту
  marker.addTo(map);

  inputAddress.value = `${mapCenter.lat}, ${mapCenter.lng}`;

  // меняем инпут в зависимости от положения маркера
  marker.on('moveend', (evt) => {
    let coords = evt.target.getLatLng();
    inputAddress.value = `${coords['lat'].toFixed(5)}, ${coords['lng'].toFixed(5)}`;
  });

  //удаляем слой с группой маркеров
  //markerGroup.clearLayers();

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForms();
  });

};

export let addOffers = (data) => {
  // кастомная иконка маркера с офферами
  let offerMarker = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -15],
  });

  //создаем слой с группой маркеров
  const markerGroup = L.layerGroup().addTo(map);
  // перебираем массив с объявлениями, добавляем метку и попап на карту
  if (data) {
    data.forEach((el) => {
      let {location} = el;
      let popupCard = createCard(el);
      const marker = L.marker({
          lat: location['lat'],
          lng: location['lng']
        },
        {
          icon: offerMarker
        });
      //добавляем слой с группой маркеров
      marker.addTo(markerGroup).bindPopup(popupCard);
    });
  }
};

export const resetForms = () => {
  mainForm.reset();
  filterForm.reset();
  marker.setLatLng(mapCenter);
  map.setView(mapCenter, 13);
  inputAddress.value = `${mapCenter.lat}, ${mapCenter.lng}`;
  map.closePopup();
};