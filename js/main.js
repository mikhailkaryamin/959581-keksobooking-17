'use strict';

(function () {
  var pinsDescription = []; // сохраняем метки
  var mapPinsElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var mapFiltersElement = document.querySelector('.map__filters');
  var typeHouseElement = document.querySelector('#type');
  var timeElement = document.querySelector('.ad-form__element--time');
  var mapPinMainElement = document.querySelector('.map__pin--main');


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
    mapFiltersElement.classList.toggle('ad-form--disabled');

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
  var onClickPin = function () {
    managesActivityPage();
    setValueAdress();
  };

  // Обработчик нажатия на пин
  var onMouseDownPin = function (evt) {
    var mapWidthElem = mapElement.offsetWidth;

    var Coordinate = function (x, y) {
      this.x = x;
      this.y = y;
    };

    Coordinate.prototype.setX = function (x) {
      this.x = x;
    };

    Coordinate.prototype.setY = function (y) {
      this.y = y;
    };

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      if (moveEvt.clientX < mapWidthElem && moveEvt.clientX > 0) {
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';
      }
      if (moveEvt.clientY > 130 && moveEvt.clientY < 630) {
        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var pinsElements = mapPinsElement.querySelectorAll('.map__pin');

      if (dragged && pinsElements.length === 1) {
        onClickPin();
        mapPinMainElement.removeEventListener('click', onClickPin);
      } else if (dragged && pinsElements.length > 1) {
        setValueAdress();
        mapPinMainElement.removeEventListener('click', onClickPin);
      } else {
        mapPinMainElement.addEventListener('click', onClickPin);
        mapPinMainElement.style = 'left: 570px; top: 375px;';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  mapPinMainElement.addEventListener('mousedown', onMouseDownPin);

  window.backend.load(onLoadSuccess);
})();
