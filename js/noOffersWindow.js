'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  // Показывает окно "Нет кексов"
  var renderNoOffersWindow = function () {
    var noOffersElement = document.createElement('div');
    noOffersElement.classList.add('map__no-offers');
    noOffersElement.textContent = 'Извините, таких кексов - нет';
    mapElement.insertAdjacentElement('afterbegin', noOffersElement);
  };

  // Удаляет окно "Нет кексов"
  var removeNoOffersWindow = function (noOffers) {
    var noOffersElement = mapElement.querySelector('.map__no-offers');

    if (noOffers) {
      noOffers = false;
      noOffersElement.remove();
    }
  };

  window.noOffersWindow = {
    renderNoOffersWindow: renderNoOffersWindow,
    removeNoOffersWindow: removeNoOffersWindow
  };
})();
