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
        maxNumberGuest = 1;
        stringError = 'Только для 1 гостя';
        break;
      case '2':
        maxNumberGuest = 2;
        stringError = 'Только для 1 или 2 гостей';
        break;
      case '3':
        maxNumberGuest = 3;
        stringError = 'Только для 1, 2 или 3 гостей';
        break;
      case '100':
        maxNumberGuest = 101;
        stringError = 'Не для гостей';
        break;
      default:
        break;
    }

    if (!(maxNumberGuest === 101)) {
      if (selectValueNumber > maxNumberGuest || !selectValueNumber) {
        errors.push(stringError);
      }
    }

    if (maxNumberGuest === 101) {
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

    return errors.length ? false : true;
  };

  window.validator = {
    checkValidity: checkValidity
  };
})();
