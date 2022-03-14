export let activatePage = (status) => {
  let mapFilters = document.querySelector('.map__filters');
  let adForm = document.querySelector('.ad-form');

  if (!status) {
    mapFilters.classList.add('map__filters--disabled');
    mapFilters.querySelectorAll('.map__filter').forEach((select) => select.setAttribute("disabled", "disabled"));

    adForm.classList.add('ad-form--disabled');
    adForm.querySelectorAll('input, select, textarea, button').forEach((select) => select.setAttribute("disabled", "disabled"));
  }
};