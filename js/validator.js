'use strict';

(function () {
  var checkValidity = function (select) {
    var selectRoomNuberElement = document.querySelector('#room_number');
    var selectCapacityElement = document.querySelector('#capacity');

    var numberRooms = selectRoomNuberElement.value;
    var selectValueNumber = parseInt(select.value, 10);
    var errors = [];
    var maxNumberGuest;
    var stringError;

    switch (numberRooms) {
      case '1':
        maxNumberGuest = window.constatns.MaxNumberGuest.ONE;
        stringError = 'Только для 1 гостя';
        break;
      case '2':
        maxNumberGuest = window.constatns.MaxNumberGuest.TWO;
        stringError = 'Только для 1 или 2 гостей';
        break;
      case '3':
        maxNumberGuest = window.constatns.MaxNumberGuest.THREE;
        stringError = 'Только для 1, 2 или 3 гостей';
        break;
      case '100':
        maxNumberGuest = window.constatns.MaxNumberGuest.ONE_HUNDRED;
        stringError = 'Не для гостей';
        break;
      default:
        break;
    }

    if (!(maxNumberGuest === window.constatns.MaxNumberGuest.ONE_HUNDRED)) {
      if (selectValueNumber > maxNumberGuest || !selectValueNumber) {
        errors.push(stringError);
      }
    }

    if (maxNumberGuest === window.constatns.MaxNumberGuest.ONE_HUNDRED) {
      if (selectValueNumber) {
        errors.push(stringError);
      }
    }


    if (errors.length) {
      selectCapacityElement.classList.add('ad-error');
    } else {
      selectCapacityElement.classList.remove('ad-error');
    }

    select.setCustomValidity(errors.join('. '));

    return !errors.length;
  };

  window.validator = {
    checkValidity: checkValidity
  };
})();
