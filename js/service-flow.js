const KEY_LOCAL_STORAGE = "serviceFlowInformation";
let selectedItems = [];

function nextUrl(button, thisUrlName, nextUrlName) {
  let serviceInfo = JSON.parse(window.localStorage.getItem(KEY_LOCAL_STORAGE));
  if (!serviceInfo) {
    window.localStorage.removeItem(KEY_LOCAL_STORAGE);
    const serviceInfoStart = {
      where: button.innerText,
    };
    addObjectToLocalStorage(serviceInfoStart);
  } else {
    serviceInfo[thisUrlName] = button.innerText;
    addObjectToLocalStorage(serviceInfo);
  }

  window.location.href = urlBuild(nextUrlName);
}

function nextUrlMultipleOption(thisUrlName, nextUrlName, type = null) {
  let serviceInfo = JSON.parse(window.localStorage.getItem(KEY_LOCAL_STORAGE));
  serviceInfo = setMultipleData(thisUrlName, serviceInfo, type);
  addObjectToLocalStorage(serviceInfo);
  window.location.href = urlBuild(nextUrlName);
}

function setMultipleData(thisUrlName, serviceInfo, type) {
  switch (thisUrlName) {
    case "how-many":
      serviceInfo["how-many"] = {
        adults: document.getElementById("adults").value,
        children: document.getElementById("children").value,
      };
      break;

    case "food":
      serviceInfo["food"] = {
        "selected-food": selectedItems,
        "message-food": document.getElementById("message-food").value,
      };
      document.getElementById("message-food").value = "";
      selectedItems = [];
      break;

    case "calendar":
      if (type === "one-service") {
        serviceInfo["calendar"] = {
          "one-service-date": document.getElementById("from-date").value,
        };
        break;
      }
      serviceInfo["calendar"] = {
        "from-date": document.getElementById("from-date").value,
        "to-date": document.getElementById("to-date").value,
      };
      break;

    case "allergies":
      serviceInfo["allergies"] = {
        "selected-allergies": selectedItems,
        "message-allergies": document.getElementById("message-allergies").value,
      };
      document.getElementById("message-allergies").value = "";
      break;

    default:
      break;
  }
  return serviceInfo;
}

function addObjectToLocalStorage(obj) {
  window.localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(obj));
}

function urlBuild(nextUrlName) {
  const lang = document.documentElement.lang;
  const language = lang === "es" ? "/es" : "";
  const folder = lang === "es" ? "/flujo-de-servicio/" : "/service-flow/";
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    language +
    "/templates" +
    folder +
    nextUrlName +
    ".html"
  );
}

function plusButton(plus) {
  let inputElement = plus.previousElementSibling.previousElementSibling;
  inputElement.value = (parseInt(inputElement.value) + 1).toString();
  document.getElementById(inputElement.id).value = inputElement.value;
}

function minusButton(minus) {
  let inputElement = minus.previousElementSibling;
  let count = parseInt(inputElement.value);
  if (count > 0) {
    document.getElementById(inputElement.id).value = count - 1;
  }
}

function onClickFood(button) {
  if (window.getComputedStyle(button).backgroundColor === "rgb(252, 222, 97)") {
    document.getElementById(button.id).style.background = "#ff7730";
    selectedItems.push(button.id);
  } else {
    document.getElementById(button.id).style.background = "#FCDE61";
    const indexId = selectedItems.indexOf(button.id);
    if (indexId > -1) {
      selectedItems.splice(indexId, 1);
    }
  }
}

function sendDataServiceFlow() {
  let formData = new FormData(document.querySelector("form"));
  if (
    formData.get("name") === "" ||
    formData.get("email") === "" ||
    formData.get("phone") === "" ||
    grecaptcha.getResponse().length === 0
  ) {
    printErrorMessage();
    return;
  }

  formData = getAndRemoveLocalStorageKey(formData);
  $(".loading").css("visibility", "visible");
  formData = setEmailAttributes(formData, "template_services");
  emptyInputFields();
  sendEmail(formData);
}

function getAndRemoveLocalStorageKey(formData) {
  const serviceFlowData = JSON.parse(
    window.localStorage.getItem(KEY_LOCAL_STORAGE)
  );
  formData = setServiceFlowData(formData, serviceFlowData);
  window.localStorage.removeItem(KEY_LOCAL_STORAGE);
  return formData;
}

function setServiceFlowData(formData, serviceFlowData) {
  if (serviceFlowData) {
    formData.append("where", serviceFlowData.where);
    formData.append("what", serviceFlowData.what);
    formData.append("typeService", serviceFlowData["type-service"]);

    if (serviceFlowData["how-many"]) {
      formData.append("adults", serviceFlowData["how-many"].adults);
      formData.append("children", serviceFlowData["how-many"].children);
    }

    formData.append("meal", serviceFlowData.meal);

    if (serviceFlowData.food) {
      formData.append("foodMessage", serviceFlowData.food["message-food"]);
      formData.append(
        "selectedFood",
        getStringFromArray(serviceFlowData.food["selected-food"])
      );
    }

    formData.append("stove", serviceFlowData.stove);
    formData.append("hobs", serviceFlowData.hobs);
    formData.append("oven", serviceFlowData.oven);

    if (serviceFlowData.calendar) {
      formData.append(
        "oneServiceDate",
        serviceFlowData.calendar["one-service-date"]
      );
      formData.append("fromDate", serviceFlowData.calendar["from-date"]);
      formData.append("toDate", serviceFlowData.calendar["to-date"]);
    }

    if (serviceFlowData.allergies) {
      formData.append(
        "allergiesMessage",
        serviceFlowData.allergies["message-allergies"]
      );
      formData.append(
        "selectedAllergies",
        getStringFromArray(serviceFlowData.allergies["selected-allergies"])
      );
    }
  }

  return formData;
}

function getStringFromArray(selectedItems) {
  if (selectedItems) {
    return selectedItems.toString();
  }
  return "";
}
