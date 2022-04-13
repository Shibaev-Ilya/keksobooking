const selectType = document.querySelector('#housing-type');
const selectPrice = document.querySelector('#housing-price');
const selectRooms = document.querySelector('#housing-rooms');
const selectGuests = document.querySelector('#housing-guests');
const featureButtons = Array.from(document.querySelectorAll('.map__checkbox'));

const mapFilter = document.querySelector('.js-map__filters');

const PricesRange = {
  low: {
    MIN: 0,
    MAX: 9999,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50001,
    MAX: 100000,
  },
};

let checkPrice = element => {
  if (selectPrice.value === 'any') {
    return true;
  }
  return element['offer']['price'] >= PricesRange[selectPrice.value]['MIN'] && element['offer']['price'] <= PricesRange[selectPrice.value]['MAX'];
};
let checkType = element => element['offer']['type'] === selectType.value || selectType.value === 'any';
let checkRooms = element => element['offer']['rooms'] === +selectRooms.value || selectRooms.value === 'any';
let checkGuests = element => element['offer']['guests'] === +selectGuests.value || selectGuests.value === 'any';
let checkFeatures = (element, target) => {
  if (target.classList.contains('map__checkbox')) {
    let featuresArr = element['offer']['features'];
    let checkedFeatures = featureButtons.filter((el) => el.checked).map((el) => el.value);
    return checkedFeatures.every((checkedFeature) => featuresArr && featuresArr.includes(checkedFeature));
  }
  return true;
};

export let filterType = (data, cb) => {

  let newArray = [];

  mapFilter.addEventListener('change', (evt) => {
    newArray = data.filter((el) => checkType(el) && checkPrice(el) && checkRooms(el) && checkGuests(el) && checkFeatures(el, evt.target));
    cb(newArray);
  });

};
