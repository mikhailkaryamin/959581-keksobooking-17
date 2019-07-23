'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormResetButtonElement = adFormElement.querySelector('.ad-form__reset');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
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

  // Обработчик сброса формы
  var onResetForm = function () {
    mapFiltersElement.reset();
    adFormElement.reset();

    window.managesPage.switchActivityPage();
    window.housingAddress.setValueAddress();
    window.managesPage.resetPins();
    window.noOffersWindow.removeNoOffersWindow(noOffers);
    window.cardAd.removeCardAd();
    window.form.resetImgForm();

    mapPinMainElement.style.left = window.constatns.STARTING_COORD_HORIZONTALY;
    mapPinMainElement.style.top = window.constatns.STARTING_COORD_VERTICAL;

    mapPinMainElement.addEventListener('click', onClickMainPin);
    adFormResetButtonElement.removeEventListener('click', onResetForm);
  };

  // Обработчик фильтра карты
  var onChangeFilterMapPins = function (evt) {
    var filterValue = evt.target.value;
    var filterName = evt.target.name;

    var filteredPins = window.filterPins.getFilteredList(filterValue, filterName);

    renderFilterPins(filteredPins);
  };

  // Рендер пинов
  var renderFilterPins = function (pins) {
    window.noOffersWindow.removeNoOffersWindow(noOffers);

    if (pins.length >= 1) {
      window.managesPage.resetPins();
      window.renderPin.addPinList(pins);
      noOffers = false;
    } else {
      window.managesPage.resetPins();
      window.noOffersWindow.renderNoOffersWindow();
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
      mapFiltersElement.addEventListener('change', onChangeFilterMapPins);
      adFormElement.addEventListener('submit', onUploadForm);
      mapPinsElement.addEventListener('click', onCardAdClick);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Обработчик открытия
  var onClickMainPin = function () {
    window.managesPage.switchActivityPage();
    window.housingAddress.setValueAddress();
    adFormResetButtonElement.addEventListener('click', onResetForm);
    mapPinMainElement.removeEventListener('click', onClickMainPin);
  };

  // Обработчик открытия карточки объявления
  var onCardAdClick = function (evt) {
    var target = evt.target;
    var mapPinElement = target.closest('.map__pin');

    if (!mapPinElement || mapPinElement.matches('.map__pin--main')) {
      return;
    }

    var imageElement = mapPinElement.querySelector('img');
    var imageAlt = imageElement.getAttribute('alt');
    var cardAdData = window.cardAd.getCardAdData(imageAlt);

    window.cardAd.removeCardAd();
    window.cardAd.addCardAd(cardAdData);

    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', window.cardAd.removeCardAd);
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
  mapPinMainElement.addEventListener('click', onClickMainPin);

  window.main = {
    onResetForm: onResetForm
  };

})();
