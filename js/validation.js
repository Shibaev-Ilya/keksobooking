export let mainForm = document.querySelector(".ad-form");

export let formValidation = (form) => {

  var config = {
    classTo: 'ad-form__element',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
};

  // create the pristine instance
  let pristine = new Pristine(form, config);

  form.addEventListener('submit', function (e) {
     e.preventDefault();

     // check if the form is valid
     let valid = pristine.validate(); // returns true or false


  });
};