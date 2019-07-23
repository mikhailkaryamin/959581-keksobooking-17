'use strict';

(function () {
  var activeFilters = [];
  var filteredPins = [];

  // Обрезает массив до нужной длины
  var filterMaxNumberPins = function (data) {
    return data.slice(0, window.constatns.MAX_NUMBER_PINS);
  };

  // Получаем массив активных фильтров
  var getActiveFilters = function (filterValue, filterName) {
    var name = filterValue;
    var value = filterName;

    // Если feature, тогда меняем местами валью и нейм
    if (filterName === 'features') {
      name = filterName;
      value = filterValue;
    }

    if (activeFilters.indexOf(value) === -1) {
      activeFilters.push(value);
    } else if (name === 'any' || name === 'features') {
      activeFilters.splice(activeFilters.indexOf(value), 1);
    }
  };

  // Фильтр по удобства
  var filterFeatures = function (features, filterName) {
    var feature;
    if (!(features.indexOf(filterName) === -1)) {
      feature = filterName;
    }
    return feature;
  };

  // Фильтр по цене
  var filterPrice = function (price) {
    var priceRange;

    if (price >= window.constatns.PricePerNight.TEN_THOUSAND && price <= window.constatns.PricePerNight.FIFTY_THOUSAND) {
      priceRange = 'middle';
    } else if (price < window.constatns.PricePerNight.TEN_THOUSAND) {
      priceRange = 'low';
    } else {
      priceRange = 'high';
    }

    return priceRange;
  };

  // Записывает состояние фильтров
  var statusFilters = {
    'housing-type': 'any',
    'housing-numberRooms': 'any',
    'housing-guests': 'any',
    'housing-price': 'any',
    'wifi': false,
    'dishwasher': false,
    'parking': false,
    'washer': false,
    'elevator': false,
    'conditioner': false
  };

  // Фильтр пинов
  var filterPinsMap = function (filter) {
    filteredPins = filteredPins.filter(function (el) {
      var dataFilter = {
        'housing-type': el.offer.type,
        'housing-rooms': el.offer.rooms.toString(),
        'housing-guests': el.offer.guests.toString(),
        'housing-price': filterPrice(el.offer.price.toString()),
        'wifi': filterFeatures(el.offer.features, filter),
        'dishwasher': filterFeatures(el.offer.features, filter),
        'parking': filterFeatures(el.offer.features, filter),
        'washer': filterFeatures(el.offer.features, filter),
        'elevator': filterFeatures(el.offer.features, filter),
        'conditioner': filterFeatures(el.offer.features, filter)
      };

      return dataFilter[filter] === statusFilters[filter];
    });
  };

  // Получаем отфильтрованный список пинов
  var getFilteredList = function (filterValue, filterName) {
    filteredPins = window.pinsDescription;

    // Записывает активные фильтры
    getActiveFilters(filterValue, filterName);

    // Записывает состояние фильтров
    if (filterName !== 'features') {
      statusFilters[filterName] = filterValue;
    } else {
      statusFilters[filterValue] = statusFilters[filterValue] ? false : filterValue;
    }

    // Фильтрует по активным фильтра
    activeFilters.forEach(filterPinsMap);

    if (filteredPins.length > window.constatns.MAX_NUMBER_PINS) {
      filteredPins = filterMaxNumberPins(filteredPins);
    }

    return filteredPins;
  };

  window.filterPins = {
    getFilteredList: getFilteredList,
    filterMaxNumberPins: filterMaxNumberPins
  };
})();
