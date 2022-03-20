let mapFilters = document.querySelector('.map__filters');
let adForm = document.querySelector('.ad-form');

export let deactivateForms = () => {
    mapFilters.classList.add('map__filters--disabled');
    mapFilters.querySelectorAll('.map__filter').forEach((select) => select.setAttribute("disabled", "disabled"));
    adForm.classList.add('ad-form--disabled');
    adForm.querySelectorAll('input, select, textarea, button').forEach((select) => select.setAttribute("disabled", "disabled"));
};

export let activateForms = () => {
    mapFilters.classList.remove('map__filters--disabled');
    mapFilters.querySelectorAll('.map__filter').forEach((select) => select.disabled = false);
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('input, select, textarea, button').forEach((select) => select.disabled = false);
};