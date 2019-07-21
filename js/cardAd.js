'use strict';

(function () {
  var mapElement = document.querySelector('.map');

  // Словарь типа жилья на русский язык
  var houseType = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // Словарь класс удобстава
  var classFeature = {
    'wifi': '.popup__feature--wifi',
    'dishwasher': '.popup__feature--dishwasher',
    'parking': '.popup__feature--parking',
    'washer': '.popup__feature--washer',
    'elevator': '.popup__feature--elevator',
    'conditioner': '.popup__feature--conditioner'
  };

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
    cardAdElement.querySelector('.popup__type').textContent = houseType[dataAd.offer.type];
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

  // Получаем список удобств
  var getFeaturesList = function (featuresList, popupFeatures) {
    var newFeaturesList = [];

    featuresList.forEach(function (elFeature) {

      var featureClass = classFeature[elFeature];

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

  // Получаем нужное обьявление
  var getCardAdData = function (altImg) {
    var mapPinIndex = window.pinsDescription.map(function (e) {
      return e.offer.title;
    }).indexOf(altImg);

    return window.pinsDescription[mapPinIndex];
  };

  // Удаляет карточку объявления
  var removeCardAd = function () {
    var cardAdElement = mapElement.querySelector('.map__card');

    if (cardAdElement) {
      cardAdElement.remove();
    }
  };

  // Вставляет карточку обьявления
  var addCardAd = function (dataAd) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(createCardAd(dataAd));

    mapElement.appendChild(fragment);
  };

  window.cardAd = {
    addCardAd: addCardAd,
    removeCardAd: removeCardAd,
    getCardAdData: getCardAdData
  };
})();
