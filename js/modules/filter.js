const selectType = document.querySelector('#housing-type');

export let filterType = (data, cb) => {
  let newArray = data;
  selectType.addEventListener('change', (evt) => {
      newArray = data.filter((el) => el['offer']['type'] === evt.target.value || evt.target.value === 'any');
    cb(newArray);
  });
};
