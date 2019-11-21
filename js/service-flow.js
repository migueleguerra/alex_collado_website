function nextUrl(button, url) {
  /*window.localStorage.setItem(
    'serviceFlowInformation',
    JSON.stringify([button.innerHTML])
  );*/
  window.location.href = urlBuild(url);
}

function urlBuild(htmlPage) {
  return window.location.protocol + "//" +
      window.location.host + "/templates/service-flow/" + htmlPage;
}

function plusButton(plus) {
  let inputElement = plus.previousElementSibling;
  inputElement.value = (parseInt(inputElement.value) + 1).toString();
  document.getElementById(inputElement.id).value = inputElement.value;
}

function minusButton(plus) {
  let inputElement = plus.previousElementSibling.previousElementSibling;
  let count = parseInt(inputElement.value);
  if (count > 0) {
    document.getElementById(inputElement.id).value = count - 1;
  }
}
