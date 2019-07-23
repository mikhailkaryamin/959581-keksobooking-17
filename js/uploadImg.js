'use strict';

(function () {
  var imageChooserAdImgElement = document.querySelector('.ad-form__input');
  var uploadPreviewAdImgElement = document.querySelector('.ad-form__photo');
  var imageChooserAvatarElement = document.querySelector('.ad-form-header__input');
  var uploadPreviewAvatarElement = document.querySelector('.ad-form-header__preview');
  var imgAvatarPreviewElement = uploadPreviewAvatarElement.querySelector('img');

  var checkValidityTypeImg = function (file) {
    var fileName = file.name.toLowerCase();

    return window.constatns.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  imageChooserAdImgElement.addEventListener('change', function () {
    var file = imageChooserAdImgElement.files[0];

    if (checkValidityTypeImg(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var imgPreviewElement = document.createElement('img');
        imgPreviewElement.classList.add('ad-form__photo');
        uploadPreviewAdImgElement.insertAdjacentElement('afterbegin', imgPreviewElement);
        imgPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  imageChooserAvatarElement.addEventListener('change', function () {
    var file = imageChooserAvatarElement.files[0];

    if (checkValidityTypeImg(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgAvatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
