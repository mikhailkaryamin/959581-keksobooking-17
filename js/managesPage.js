'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var adFormElement = document.querySelector('.ad-form');

  // Очищает пины
  var resetPins = function () {
    var pinsElements = mapPinsElement.querySelectorAll('.map__pin');

    pinsElements.forEach(function (e) {
      if (!e.matches('.map__pin--main')) {
        e.remove();
      }
    });
  };

  // Управляет актиностью страницы
  var switchActivityPage = function () {
    mapElement.classList.toggle('map--faded');
    adFormElement.classList.toggle('ad-form--disabled');

    if (mapElement.classList.contains('map--faded')) {
      window.form.setStatusFieldset('disable');
      resetPins();
    } else {
      var mapPins = window.pinsDescription;

      // Если больше 5 то обрезаем
      if (window.pinsDescription.length > window.constatns.MAX_NUMBER_PINS) {
        mapPins = window.filterPins.filterMaxNumberPins(window.pinsDescription);
      }
      window.form.setStatusFieldset('active');
      resetPins();
      window.renderPin.addPinList(mapPins);
    }
  };

  window.managesPage = {
    resetPins: resetPins,
    switchActivityPage: switchActivityPage
  };
})();
