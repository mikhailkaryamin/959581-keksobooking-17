'use strict';

(function () {
  var mapPinMainElement = document.querySelector('.map__pin--main');

  // Записывает значение адреса
  var setValueAddress = function () {
    var addressElement = document.querySelector('#address');
    var numberX = parseInt(mapPinMainElement.style.left, 10);
    var numberY = parseInt(mapPinMainElement.style.top, 10);
    var mapPinHeight = parseInt(getComputedStyle(mapPinMainElement).getPropertyValue('height'), 10);
    var mapPinWidth = parseInt(getComputedStyle(mapPinMainElement).getPropertyValue('width'), 10);

    addressElement.value = Math.round(numberX + 0.5 * mapPinHeight) + ', ' + (numberY + mapPinWidth);
  };

  window.housingAddress = {
    setValueAddress: setValueAddress
  };
})();
