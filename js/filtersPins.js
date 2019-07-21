'use strict';

(function () {
  var MAX_NUMBER_PINS = 5;

  // Обрезает массив до нужной длины
  var filterMaxNumberPins = function (data) {
    var filteredMaxNumberPins = data.slice(MAX_NUMBER_PINS);
    return filteredMaxNumberPins;
  };

  // Фильтрует по типу жилья
  var filterHousingType = function (pinsDescription, key) {
    var filteredPins = pinsDescription;

    if (key !== 'any') {
      filteredPins = pinsDescription.filter(function (el) {
        return el.offer.type === key;
      });
    }

    if (filteredPins.length > MAX_NUMBER_PINS) {
      filteredPins = filterMaxNumberPins(filteredPins);
    }

    return filteredPins;
  };

  window.filterPins = {
    filterHousingType: filterHousingType,
    filterMaxNumberPins: filterMaxNumberPins
  };
})();
