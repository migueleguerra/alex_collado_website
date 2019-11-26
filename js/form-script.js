emailjs.init("user_RjYoUr6zpBN3O4umVqmJ3");

function sendData() {
  let formData = new FormData(document.querySelector('form'));

  if (formData.get('name') === '' || formData.get('email') === '' ||
    grecaptcha.getResponse().length === 0) {
    printErrorMessage();
    return;
  }
  $(".loading").css("visibility", "visible");
  formData = setEmailAttributes(formData);
  emptyInputFields();
  sendEmail(formData);
}

function printErrorMessage() {
  const spanElement = document.createElement('span');
  const text = document.createTextNode(
      'Make sure you fill all input fields.'
  );
  spanElement.appendChild(text);
  document.getElementById('error-msg').appendChild(spanElement);

  setTimeout(function() {
    document.getElementById('error-msg').removeChild(spanElement);
  }, 5000);
}

function emptyInputFields() {
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('message').value = "";
}

function setEmailAttributes(formData) {
  formData.append('service_id', 'default_service');
  formData.append('template_id', 'template_fTVZQWGb');
  formData.append('user_id', 'user_RjYoUr6zpBN3O4umVqmJ3');
  return formData;
}

function urlFinalBuildAndSend(nextUrlName) {
  const url = window.location.protocol + '//' +
      window.location.host + '/templates/' + nextUrlName + '.html';
  window.location.href = url;
  history.pushState(null, null, url);
}

function sendEmail(formData) {
  $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false
  }).done(function() {
    urlFinalBuildAndSend('success');
  }).fail(function(error) {
    urlFinalBuildAndSend('error');
  });
}
