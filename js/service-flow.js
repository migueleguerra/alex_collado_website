const KEY_LOCAL_STORAGE = 'serviceFlowInformation';

let selectedItems = [];

function nextUrl(button, thisUrlName, nextUrlName) {
  let serviceInfo =
      JSON.parse(window.localStorage.getItem(KEY_LOCAL_STORAGE));

  if(checkIfBeginning(serviceInfo)) {
   return;
  }

  if(!serviceInfo) {
    const serviceInfoStart = {
      'where': button.innerText,
    };
    addObjectToLocalStorage(serviceInfoStart);
  } else {
    serviceInfo[thisUrlName] = button.innerText;
    addObjectToLocalStorage(serviceInfo);
  }

  window.location.href = urlBuild(nextUrlName);
}

function nextUrlMultipleOption(thisUrlName, nextUrlName) {
  let serviceInfo =
      JSON.parse(window.localStorage.getItem(KEY_LOCAL_STORAGE));

  if(checkIfBeginning(serviceInfo)) {
    return;
  }
  serviceInfo = setMultipleData(thisUrlName, serviceInfo);
  addObjectToLocalStorage(serviceInfo);
  window.location.href = urlBuild(nextUrlName);
}

function setMultipleData(thisUrlName, serviceInfo) {
  switch (thisUrlName) {
    case 'how-many':
      serviceInfo['how-many'] = {
        'seniors': document.getElementById('seniors').value,
        'adults': document.getElementById('adults').value,
        'children': document.getElementById('children').value,
      };
      break;

    case 'food':
      serviceInfo['food'] = {
        'selected-food': selectedItems,
        'message-food':
        document.getElementById('message-food').value,
      };
      selectedItems = [];
      break;

    case 'calendar':
      serviceInfo['calendar'] = {
        'from-date': document.getElementById('from-date').value,
        'to-date': document.getElementById('to-date').value,
      };
      break;

    case 'allergies':
      serviceInfo['allergies'] = {
        'selected-allergies': selectedItems,
        'message-allergies':
        document.getElementById('message-allergies').value
      }
  }
  return serviceInfo;
}

function checkIfBeginning(serviceInfo) {
  if(!serviceInfo.where) {
    window.localStorage.removeItem(KEY_LOCAL_STORAGE);
    const url = urlBuild('where');
    window.location.href = url;
    history.pushState(null, null, url);
    return true;
  }
  return false;
}

function addObjectToLocalStorage(obj) {
  window.localStorage.setItem(
      KEY_LOCAL_STORAGE,
      JSON.stringify(obj),
  );
}

function urlBuild(nextUrlName) {
  return window.location.protocol + '//' +
      window.location.host + '/templates/service-flow/' + nextUrlName + '.html';
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

function onClickFood(button) {
  if(window.getComputedStyle(button).backgroundColor === 'rgb(252, 222, 97)') {
    document.getElementById(button.id).style.background = '#ff7730';
    selectedItems.push(button.id);
  } else {
    document.getElementById(button.id).style.background = '#FCDE61';
    const indexId = selectedItems.indexOf(button.id);
    if (indexId > -1) {
      selectedItems.splice(indexId, 1);
    }
  }
}
