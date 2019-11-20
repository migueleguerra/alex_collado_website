function where(button) {
  window.localStorage.setItem(
    'serviceFlowInformation', 
    JSON.stringify([button.innerHTML])
  );
  const url = window.location.protocol + "//" +
          window.location.host + "/templates/service-flow/what.html";
  window.location.href = url;
  history.pushState(null, null, url);
}