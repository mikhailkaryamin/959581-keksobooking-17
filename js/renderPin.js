'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');

  var renderPinElement = function (data) {
    var pinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
    var mapPinElement = pinElement.cloneNode(true);
    mapPinElement.style.left = data.location.x - 0.5 * window.constatns.WIDTH_PIN + 'px';
    mapPinElement.style.top = data.location.y - window.constatns.HEIGHT_PIN + 'px';
    mapPinElement.querySelector('img').src = data.author.avatar;
    mapPinElement.querySelector('img').alt = data.offer.title;

    return mapPinElement;
  };

  // Добавляет пины в разметку
  var addPinList = function (descriptionPins) {
    var fragment = document.createDocumentFragment();

    descriptionPins.forEach(function (el) {
      fragment.appendChild(renderPinElement(el));
    });

    mapPinsElement.appendChild(fragment);
  };

  window.renderPin = {
    addPinList: addPinList
  };
})();
