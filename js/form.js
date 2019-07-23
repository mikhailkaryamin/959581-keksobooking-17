'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var mapFiltersElement = document.querySelector('.map__filters');
  var fieldsetAdFormElements = adFormElement.querySelectorAll('fieldset');
  var fieldsetMapFiltersElements = mapFiltersElement.querySelectorAll('select');
  var selectCapacityElement = document.querySelector('#capacity');
  var selectNumberRoomsElement = document.querySelector('#room_number');

  // Изменяет тип жилья
  var changePricePerNight = function (typeOfHousing) {
    var priceElement = document.querySelector('#price');

    switch (typeOfHousing) {
      case 'bungalo':
        priceElement.placeholder = window.constatns.PricePerNight.ZERO;
        priceElement.min = window.constatns.PricePerNight.ZERO;
        break;
      case 'flat':
        priceElement.placeholder = window.constatns.PricePerNight.ONE_THOUSAND;
        priceElement.min = window.constatns.PricePerNight.ONE_THOUSAND;
        break;
      case 'house':
        priceElement.placeholder = window.constatns.PricePerNight.FIVE_THOUSAND;
        priceElement.min = window.constatns.PricePerNight.FIVE_THOUSAND;
        break;
      case 'palace':
        priceElement.placeholder = window.constatns.PricePerNight.TEN_THOUSAND;
        priceElement.min = window.constatns.PricePerNight.TEN_THOUSAND;
        break;
      default:
        priceElement.placeholder = window.constatns.PricePerNight.FIVE_THOUSAND;
        priceElement.min = window.constatns.PricePerNight.ZERO;
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

  // Очищает загруженные картинки
  var resetImgForm = function () {
    var avatarFormElement = document.querySelector('.ad-form-header__preview');
    var imgAvatarElement = avatarFormElement.querySelector('img');
    var photosHousingElement = document.querySelector('.ad-form__photo');
    var imgPhotosHousingElement = photosHousingElement.querySelectorAll('img');
    imgAvatarElement.src = 'img/muffin-grey.svg';

    imgPhotosHousingElement.forEach(function (el) {
      el.remove();
    });
  };

  // Устанавливает состояние фильтров
  var setDisable = function (el) {
    el.setAttribute('disabled', 'disabled');
  };

  var setActive = function (el) {
    el.removeAttribute('disabled');
  };

  var setStatusFieldset = function (status) {
    var keyStatus = status === 'active' ? setActive : setDisable;

    fieldsetAdFormElements.forEach(keyStatus);

    fieldsetMapFiltersElements.forEach(keyStatus);
  };

  // Обработчик количества мест
  var onChangeCapacity = function () {
    window.validator.checkValidity(selectCapacityElement);
  };

  selectCapacityElement.addEventListener('change', onChangeCapacity);
  selectNumberRoomsElement.addEventListener('change', onChangeCapacity);

  window.form = {
    changePricePerNight: changePricePerNight,
    changeTime: changeTime,
    setStatusFieldset: setStatusFieldset,
    resetImgForm: resetImgForm
  };
})();
