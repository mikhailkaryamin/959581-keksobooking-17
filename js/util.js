'use strict';

window.util = (function () {

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.constatns.ESC_KEYCODE) {
        action();
      }
    }
  };
})();

