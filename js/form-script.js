emailjs.init("user_RjYoUr6zpBN3O4umVqmJ3");

function sendData() {
  const formData = new FormData(document.querySelector('form'));

  if (formData.get('name') !== '' && formData.get('email') !== '') {
    $(".loading").css("visibility", "visible");

    formData.append('service_id', 'default_service');
    formData.append('template_id', 'template_fTVZQWGb');
    formData.append('user_id', 'user_RjYoUr6zpBN3O4umVqmJ3');

    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('message').value = "";

    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).done(function() {
      alert('Your mail is sent!');
      const url = window.location.protocol + "//" +
          window.location.host + "/templates/success.html";
      window.location.href = url;
      //history.pushState(null, null, url);
    }).fail(function(error) {
      alert('Oops... ' + JSON.stringify(error));
      const url = window.location.protocol + "//" +
          window.location.host + "/templates/error.html";
      window.location.href = url;
      //history.pushState(null, null, url);
    });
  }
}
