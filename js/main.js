'use strict';

(function () {
  var pinsDescription = []; // сохраняем метки
  var mapPinsElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var typeHouseElement = document.querySelector('#type');
  var timeElement = document.querySelector('.ad-form__element--time');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormResetButtonElement = adFormElement.querySelector('.ad-form__reset');

  // Записывает значение адреса
  var setValueAdress = function () {
    var adressElement = document.querySelector('#address');
    var numberX = parseInt(mapPinMainElement.style.left, 10);
    var numberY = parseInt(mapPinMainElement.style.top, 10);
    var mapPinHeight = parseInt(getComputedStyle(mapPinMainElement).getPropertyValue('height'), 10);
    var mapPinwidth = parseInt(getComputedStyle(mapPinMainElement).getPropertyValue('width'), 10);

    var stringAdress = Math.round(numberX + 0.5 * mapPinHeight) + ', ' + (numberY + mapPinwidth);
    adressElement.value = stringAdress;
  };

  // Очищает пины
  var resetPins = function () {
    var pinsElements = mapPinsElement.querySelectorAll('.map__pin');

    for (var i = 1; i < pinsElements.length; i++) {
      pinsElements[i].remove();
    }

    return pinsElements;
  };

  // Управляет актиностью страницы
  var managesActivityPage = function () {
    mapElement.classList.toggle('map--faded');
    adFormElement.classList.toggle('ad-form--disabled');

    if (mapElement.classList.contains('map--faded')) {
      window.filters.setStatusFieldset('disable');
      resetPins();
    } else {
      window.filters.setStatusFieldset('active');
      resetPins();
      window.renderPin.addPinList(pinsDescription);
    }
  };

  // Успешная загрузка
  var onLoadSuccess = function (data) {
    pinsDescription = data;
    window.filters.setStatusFieldset('disable');
    setValueAdress();

    timeElement.addEventListener('change', onChangeTime);
    typeHouseElement.addEventListener('change', onChangeTypeHouse);
  };

  // Обработчик цены на жилье
  var onChangeTypeHouse = function (evt) {
    window.filters.changePricePerNight(evt.target.value);
  };

  // Обработчик времени заезда и выезда
  var onChangeTime = function (evt) {
    window.filters.changeTime(evt.target.value);
  };

  // Обработчик клика по пину
  var onMouseUpPin = function () {
    managesActivityPage();
    setValueAdress();
  };

  // Получаем координаты
  var getCoords = function (el) {
    var box = el.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  // Обработчик сбраса формы
  var onResetForm = function () {
    managesActivityPage();
    setValueAdress();
    resetPins();

    mapPinMainElement.style.left = '570px';
    mapPinMainElement.style.top = '375px';
    adFormResetButtonElement.removeEventListener('click', onResetForm);
  };

  // Обработчик нажатия на пин
  var onMouseDownPin = function (evt) {
    var pinCoords = getCoords(mapPinMainElement);
    var shiftX = evt.pageX - pinCoords.left;
    var shiftY = evt.pageY - pinCoords.top;

    var mapCoords = getCoords(mapElement);

    var onMouseMove = function (moveEvt) {
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

      var pinsElements = mapPinsElement.querySelectorAll('.map__pin');

      if (pinsElements.length === 1) {
        onMouseUpPin();
        adFormResetButtonElement.addEventListener('click', onResetForm);
      } else {
        setValueAdress();
        return;
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  mapPinMainElement.addEventListener('mousedown', onMouseDownPin);

  window.backend.load(onLoadSuccess);
})();
