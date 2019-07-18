'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  // Создаем карточку объявления
  var createCardAd = function (dataAd) {
    var cardElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');
    var cardAdElement = cardElement.cloneNode(true);

    cardAdElement.querySelector('.popup__avatar').src = dataAd.author.avatar;
    cardAdElement.querySelector('.popup__title').textContent = dataAd.offer.title;
    cardAdElement.querySelector('.popup__text--address').textContent = dataAd.offer.address;
    cardAdElement.querySelector('.popup__text--price').textContent = dataAd.offer.price + '₽/ночь';
    cardAdElement.querySelector('.popup__type').textContent = translateTypeOfHousing(dataAd.offer.type);
    cardAdElement.querySelector('.popup__text--capacity').textContent = dataAd.offer.rooms + ' комнаты для ' + dataAd.offer.guests;
    cardAdElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataAd.offer.checkin + ', выезд до ' + dataAd.offer.checkout;
    cardAdElement.querySelector('.popup__description').textContent = dataAd.offer.description;

    // Добавляем фотографии обьявления
    var listPhotosAd = getListPhotosAd(dataAd.offer.photos);
    cardAdElement.querySelector('.popup__photo').remove();
    cardAdElement.querySelector('.popup__photos').appendChild(listPhotosAd);

    // Добавляем удобства
    var popupFeatures = cardAdElement.querySelectorAll('.popup__feature');
    var featuresList = dataAd.offer.features;
    popupFeatures.forEach(function (el) {
      el.remove();
    });
    var featureList = getFragmentFeaturesList(getFeaturesList(featuresList, popupFeatures));
    cardAdElement.querySelector('.popup__features').appendChild(featureList);
    return cardAdElement;
  };

  // Переводим тип жилья на русский язык
  var translateTypeOfHousing = function (typeOfHousingEnglish) {
    var typeOfHousingRussian;
    switch (typeOfHousingEnglish) {
      case 'bungalo':
        typeOfHousingRussian = 'Бунгало';
        break;
      case 'flat':
        typeOfHousingRussian = 'Квартира';
        break;
      case 'house':
        typeOfHousingRussian = 'Дом';
        break;
      case 'palace':
        typeOfHousingRussian = 'Дворец';
        break;
      default:
        break;
    }

    return typeOfHousingRussian;
  };

  // Фото карточки
  var renderPhotosCardElement = function (photoSrc) {
    var popupPhotosElement = document.querySelector('#card')
    .content
    .querySelector('.popup__photo');
    var photosElement = popupPhotosElement.cloneNode(true);

    photosElement.src = photoSrc;
    return photosElement;
  };

  // Получаем фрагмент списка фотографий
  var getListPhotosAd = function (photosList) {
    var fragment = document.createDocumentFragment();

    photosList.forEach(function (el) {
      fragment.appendChild(renderPhotosCardElement(el));
    });

    return fragment;
  };


  // Получаем класс удобстава
  var getClassFeature = function (feature) {
    var featureClass;

    switch (feature) {
      case 'wifi':
        featureClass = '.popup__feature--wifi';
        break;
      case 'dishwasher':
        featureClass = '.popup__feature--dishwasher';
        break;
      case 'parking':
        featureClass = '.popup__feature--parking';
        break;
      case 'washer':
        featureClass = '.popup__feature--washer';
        break;
      case 'elevator':
        featureClass = '.popup__feature--elevator';
        break;
      case 'conditioner':
        featureClass = '.popup__feature--conditioner';
        break;
      default:
        break;
    }

    return featureClass;
  };

  // Получаем список удобств
  var getFeaturesList = function (featuresList, popupFeatures) {
    var newFeaturesList = [];

    featuresList.forEach(function (elFeature) {

      var featureClass = getClassFeature(elFeature);

      popupFeatures.forEach(function (elClass) {
        if (elClass.matches(featureClass)) {
          newFeaturesList.push(elClass);
        }
      });
    });

    return newFeaturesList;
  };

  // Получаем фрагмент списка удобств
  var getFragmentFeaturesList = function (featuresList) {
    var fragment = document.createDocumentFragment();

    featuresList.forEach(function (el) {
      fragment.appendChild(el);
    });

    return fragment;
  };

  // Вставляет карточку обьявления
  var addCardAd = function (dataAd) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(createCardAd(dataAd));

    mapElement.appendChild(fragment);
  };

  window.pinDescription = {
    addCardAd: addCardAd
  };
})();
