const EMAIL_JS_ID = 'user_RjYoUr6zpBN3O4umVqmJ3';  
emailjs.init(EMAIL_JS_ID);

function sendData() {
  let formData = new FormData(document.querySelector('form'));

  if (formData.get('name') === '' || formData.get('email') === '' ||
      formData.get('phone') === '' || grecaptcha.getResponse().length === 0) {
    printErrorMessage();
    return;
  }
  $('.loading').css('visibility', 'visible');
  formData = setEmailAttributes(formData, 'template_contact');
  emptyInputFields();
  sendEmail(formData);
}

function printErrorMessage() {
  const spanElement = document.createElement('span');
  const errorMessage = document.documentElement.lang === 'es' ? 
    'Asegurate de llenar todos los campos requeridos.' :
    'Make sure you fill all required input fields.'
  const text = document.createTextNode(errorMessage);
  spanElement.appendChild(text);
  document.getElementById('error-msg').appendChild(spanElement);

  setTimeout(function() {
    document.getElementById('error-msg').removeChild(spanElement);
  }, 5000);
}

function emptyInputFields() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
  document.getElementById('phone').value = '';
}

function setEmailAttributes(formData, template_id) {
  formData.append('service_id', 'default_service');
  formData.append('template_id', template_id);
  formData.append('user_id', EMAIL_JS_ID);
  return formData;
}

function redirectFinalUrl(nextUrlName) {
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
    redirectFinalUrl('success');
  }).fail(function(error) {
    redirectFinalUrl('error');
  });
}
