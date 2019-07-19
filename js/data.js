'use strict';

(function () {
  var typeHouseElement = document.querySelector('#type');
  var timeElement = document.querySelector('.ad-form__element--time');

  // Успешная загрузка
  var onLoadSuccess = function (data) {
    window.pinsDescription = data;
    window.form.setStatusFieldset('disable');
    window.housingAddress.setValueAddress();

    timeElement.addEventListener('change', onChangeTime);
    typeHouseElement.addEventListener('change', onChangeTypeHouse);
  };

  // Сообщение об ошибке
  var onLoadError = function (errorMessage) {
    var errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('error-message');
    errorMessageElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessageElement);
  };

  // Обработчик цены на жилье
  var onChangeTypeHouse = function (evt) {
    window.form.changePricePerNight(evt.target.value);
  };

  // Обработчик времени заезда и выезда
  var onChangeTime = function (evt) {
    window.form.changeTime(evt.target.value);
  };

  window.backend.load(onLoadSuccess, onLoadError);

})();
