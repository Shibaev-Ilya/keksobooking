const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarInput = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('#images');
const photosArea = document.querySelector('.ad-form__photo-container');
const photoBlock = document.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

photoInput.addEventListener('change', () => {
  const files = photoInput.files;

  for (let i = 0; i < files.length; i++) {
    let file = files.item(i);
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      let newPhoto = photoBlock.cloneNode();
      photoBlock.remove();
      newPhoto.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      newPhoto.style.backgroundSize = 'cover';
      newPhoto.style.backgroundPosition = 'center';
      photosArea.append(newPhoto);
    }
  }

});

export let clearFiles = () => {
  preview.src = 'img/muffin-grey.svg';
  let newPhoto = photoBlock.cloneNode();
  newPhoto.style.backgroundImage = 'none';
  photosArea.querySelectorAll('.ad-form__photo').forEach( el => el.remove());
  photosArea.append(newPhoto);
};