'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormResetButtonElement = adFormElement.querySelector('.ad-form__reset');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
  var typeHousingElement = document.querySelector('#housing-type');
  var noOffers = false;
  var selectCapacityElement = document.querySelector('#capacity');

  // Получаем координаты
  var getCoords = function (el) {
    var box = el.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  // Показывает окно "Нет кексов"
  var renderNoOffersWindow = function () {
    var noOffersElement = document.createElement('div');
    noOffersElement.classList.add('map__no-offers');
    noOffersElement.textContent = 'Извините, таких кексов - нет';
    mapElement.insertAdjacentElement('afterbegin', noOffersElement);
  };

  // Удаляет окно "Нет кексов"
  var removeNoOffersWindow = function () {
    var noOffersElement = mapElement.querySelector('.map__no-offers');

    if (noOffers) {
      noOffers = false;
      noOffersElement.remove();
    }
  };

  // Обработчик сброса формы
  var onResetForm = function () {
    mapFiltersElement.reset();
    adFormElement.reset();

    window.managesPage.switchActivityPage();
    window.housingAddress.setValueAddress();
    window.managesPage.resetPins();
    removeNoOffersWindow();

    mapPinMainElement.style.left = '570px';
    mapPinMainElement.style.top = '375px';

    mapPinMainElement.addEventListener('click', onClick);
    adFormResetButtonElement.removeEventListener('click', onResetForm);
  };

  // Обработчик смены типа жилья
  var onChangeTypeHousing = function (evt) {
    var typeHousing = evt.target.value;
    var typePins = window.filterPins.filterHousingType(window.pinsDescription, typeHousing);

    removeNoOffersWindow();

    if (typePins.length > 1) {
      window.managesPage.resetPins();
      window.renderPin.addPinList(typePins);
      noOffers = false;
    } else {
      window.managesPage.resetPins();
      renderNoOffersWindow();
      noOffers = true;
    }
  };

  // Обработчик нажатия на пин
  var onMouseDownPin = function (evt) {
    var pinCoords = getCoords(mapPinMainElement);
    var shiftX = evt.pageX - pinCoords.left;
    var shiftY = evt.pageY - pinCoords.top;

    var onMouseMove = function (moveEvt) {
      var mapCoords = getCoords(mapElement);
      var newLeft = moveEvt.pageX - shiftX - mapCoords.left;
      var newTop = moveEvt.pageY - shiftY - mapCoords.top;

      if (newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = mapElement.offsetWidth - mapPinMainElement.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      if (newTop < 130) {
        newTop = 130;
      }
      if (newTop > 630) {
        newTop = 630;
      }

      mapPinMainElement.style.left = newLeft + 'px';
      mapPinMainElement.style.top = newTop + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.housingAddress.setValueAddress();

      adFormElement.addEventListener('submit', onUploadForm);
      mapPinsElement.addEventListener('click', onCardAdClick);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Обработчик открытия
  var onClick = function () {
    window.managesPage.switchActivityPage();
    window.housingAddress.setValueAddress();
    adFormResetButtonElement.addEventListener('click', onResetForm);
    mapPinMainElement.removeEventListener('click', onClick);
  };

  // Получаем нужное обьявление
  var getCardAdData = function (altImg) {
    var mapPinIndex = window.pinsDescription.map(function (e) {
      return e.offer.title;
    }).indexOf(altImg);

    return window.pinsDescription[mapPinIndex];
  };

  // Удаляет карточку объявления
  var removeCardAd = function () {
    var cardAdElement = mapElement.querySelector('.map__card');

    if (cardAdElement) {
      cardAdElement.remove();
    }
  };

  // Обработчик открытия карточки объявления
  var onCardAdClick = function (evt) {
    var target = evt.target;
    var cardAdElement = target.closest('.map__pin');

    if (!cardAdElement || cardAdElement.matches('.map__pin--main')) {
      return;
    }

    var imageElement = cardAdElement.querySelector('img');
    var imageAlt = imageElement.getAttribute('alt');
    var cardAdData = getCardAdData(imageAlt);

    removeCardAd();
    window.pinDescription.addCardAd(cardAdData);

    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', removeCardAd);
  };

  // Обработчик отправки формы
  var onUploadForm = function (evt) {
    evt.preventDefault();
    if (!window.validator.checkValidity(selectCapacityElement)) {
      return;
    }
    window.upload.uploadFormAd(evt);
    adFormElement.removeEventListener('submit', onUploadForm);
  };

  mapPinMainElement.addEventListener('mousedown', onMouseDownPin);
  mapPinMainElement.addEventListener('click', onClick);
  typeHousingElement.addEventListener('change', onChangeTypeHousing);

  window.main = {
    onResetForm: onResetForm
  };

})();
