'use strict';

window.constatns = (function () {
  return {
    SERVER_CODE_OK: 200,
    SERVER_TIMEOUT: 10000,

    MAX_NUMBER_PINS: 5,

    WIDTH_PIN: 50,
    HEIGHT_PIN: 70,

    ESC_KEYCODE: 27,

    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    STARTING_COORD_HORIZONTALY: '570px',
    STARTING_COORD_VERTICAL: '375px',

    MaxNumberGuest: {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      ONE_HUNDRED: 100
    },

    PricePerNight: {
      ZERO: 0,
      ONE_THOUSAND: 1000,
      FIVE_THOUSAND: 5000,
      TEN_THOUSAND: 10000,
      FIFTY_THOUSAND: 50000
    }
  };
})();
