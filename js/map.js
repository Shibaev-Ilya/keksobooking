const mapCenter = {
  lat: 35.68172,
  lng: 139.75392,
};
const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('[type="reset"]');

// блокируем для ручного ввода
inputAddress.readOnly = true;

export let mapInit = (activateForms) => {
  // создаем карту
  const map = L.map('map-canvas')
    .on('load', activateForms)
    .setView(mapCenter, 13);

  // добавляем слои карты с openstreetmap
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // кастомная иконка маркера
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
  // добавляем маркер на карту
  marker.addTo(map);

  // меняем инпут в зависимости от положения маркера
  marker.on('moveend', (evt) => {
    let coords = evt.target.getLatLng();
    inputAddress.value = `${coords['lat'].toFixed(5)}, ${coords['lng'].toFixed(5)}`;
  });

  resetButton.addEventListener('click', () => {
    marker.setLatLng(mapCenter);
  });

};
