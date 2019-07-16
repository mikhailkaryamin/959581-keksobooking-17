'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var mapFiltersElement = document.querySelector('.map__filters');
  var fieldsetAdFormElements = adFormElement.querySelectorAll('fieldset');
  var fieldsetmapFiltersElements = mapFiltersElement.querySelectorAll('fieldset');

  // Изменяет тип жилья
  var changePricePerNight = function (typeOfHousing) {
    var priceElement = document.querySelector('#price');

    switch (typeOfHousing) {
      case 'bungalo':
        priceElement.placeholder = 0;
        priceElement.min = 0;
        break;
      case 'flat':
        priceElement.placeholder = 1000;
        priceElement.min = 1000;
        break;
      case 'house':
        priceElement.placeholder = 5000;
        priceElement.min = 5000;
        break;
      case 'palace':
        priceElement.placeholder = 10000;
        priceElement.min = 10000;
        break;
      default:
        priceElement.placeholder = 5000;
        priceElement.min = 0;
        break;
    }
  };

  // Изменяет время заезда выезда
  var changeTime = function (time) {
    var timeInElement = document.querySelector('#timein');
    var timeOutElement = document.querySelector('#timeout');

    timeInElement.value = time;
    timeOutElement.value = time;
  };

  // Устанавливает состояние фильтров
  var setDisable = function (el) {
    el.setAttribute('disabled', 'disabled');
  };

  var setActive = function (el) {
    el.removeAttribute('disabled', 'disabled');
  };

  var setStatusFieldset = function (status) {
    var keyStatus = status === 'active' ? setActive : setDisable;

    fieldsetAdFormElements.forEach(keyStatus);

    fieldsetmapFiltersElements.forEach(keyStatus);
  };

  window.filters = {
    changePricePerNight: changePricePerNight,
    changeTime: changeTime,
    setStatusFieldset: setStatusFieldset
  };
})();
