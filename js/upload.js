'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var adFormElement = document.querySelector('.ad-form');


  // Проверяет клик вне окна или нет
  var isClickOutside = function (evt, cssSelector) {
    var target = evt.target;
    var element = target.closest(cssSelector);

    return !element;
  };

  // Получаем окно статуса загрузки
  var renderWindowStatusUpload = function (statusUpload) {
    var elementContent = statusUpload.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(elementContent);
    mainElement.appendChild(fragment);
  };

  // Окно успешной загрузки
  var showUploadSuccessWindow = function () {
    var successUploadElement = document.querySelector('#success')
    .content
    .querySelector('.success');

    renderWindowStatusUpload(successUploadElement);

    mainElement.addEventListener('click', onSuccessWindowOutsideCLick);
    document.addEventListener('keydown', onFormEscPress);
  };

  // Закрытие формы успешной загрузки по клику на произвольную область
  var onSuccessWindowOutsideCLick = function () {
    removeWindowSuccessUpload();
  };

  // Закрытие окна успешной загрузки по ESC
  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, removeWindowSuccessUpload);
  };

  // Закрытие окна успешной загрузки
  var removeWindowSuccessUpload = function () {
    var succesWindowElement = mainElement.querySelector('.success');
    succesWindowElement.remove();

    mainElement.removeEventListener('click', onSuccessWindowOutsideCLick);
    document.removeEventListener('keydown', onFormEscPress);
  };

  // Окно ошибки загрузки
  var showUploadErrorWindow = function () {
    var errorUploadElement = document.querySelector('#error')
    .content
    .querySelector('.error');

    renderWindowStatusUpload(errorUploadElement);

    var errorButtonElement = document.querySelector('.error__button');

    errorButtonElement.addEventListener('click', onWindowUploadErrorClose);
    mainElement.addEventListener('click', onErrorWindowOutsideCLick);
    document.addEventListener('keydown', onFormErrorEscPress);
  };

  // Закрытие окна ошибки загрузки
  var removeWindowErrorUpload = function () {
    var errorUploadElement = document.querySelector('.error');

    errorUploadElement.remove();

    mainElement.removeEventListener('click', onErrorWindowOutsideCLick);
    document.removeEventListener('keydown', onFormErrorEscPress);
  };

  // Закрытие формы ошибки загрузки по клику на произвольную область
  var onErrorWindowOutsideCLick = function (evt) {
    if (isClickOutside(evt, '.error__button')) {
      removeWindowErrorUpload();
    }
  };

  // Закрытие формы ошибки по ESC
  var onFormErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, removeWindowErrorUpload);
  };

  // Закрытие окна ошибки по клина на кнопку
  var onWindowUploadErrorClose = function () {
    var errorButtonElement = document.querySelector('.error__button');

    removeWindowErrorUpload();
    errorButtonElement.removeEventListener('click', onWindowUploadErrorClose);
  };

  // Отправка формы
  var uploadFormAd = function () {
    var data = new FormData(adFormElement);

    var onUploadSuccess = function () {
      window.main.onResetForm();
      showUploadSuccessWindow();
    };

    var onUploadError = function () {
      window.main.onResetForm();
      showUploadErrorWindow();
    };

    window.backend.uploadForm(data, onUploadSuccess, onUploadError);
  };

  window.upload = {
    uploadFormAd: uploadFormAd
  };
})();
