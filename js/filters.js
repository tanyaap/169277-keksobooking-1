'use strict';

(function () {
  var LOWEST_PRICE = 10000;
  var HIGHEST_PRICE = 50000;
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');

  function filterAdType(arrAds, val) {
    var typeChoice = arrAds.filter(function (it) {
      return it.offer.type === val;
    });
    return typeChoice;
  }

  function filterAdPrice(arrAds, val) {
    var priceRangeChoice = arrAds.filter(function (it) {
      var price = parseInt(it.offer.price, 10);
      var priceType = 'any';
      if (price >= LOWEST_PRICE && price <= HIGHEST_PRICE) {
        priceType = 'middle';
      } else if (price > HIGHEST_PRICE) {
        priceType = 'high';
      } else {
        priceType = 'low';
      }
      return priceType === val;
    });
    return priceRangeChoice;
  }

  function filterAdRoom(arrAds, val) {
    var roomsChoice = arrAds.filter(function (it) {
      return it.offer.rooms.toString() === val;
    });
    return roomsChoice;
  }

  function filterAdGuests(arrAds, val) {
    var guestsChoice = arrAds.filter(function (it) {
      return it.offer.guests.toString() === val;
    });
    return guestsChoice;
  }

  function filterAdFeatures(arrAds) {
    var featuresChecked = filtersForm.querySelectorAll('#housing-features [type="checkbox"]:checked');
    var featuresChoice = arrAds;
    [].forEach.call(featuresChecked, function (item) {
      featuresChoice = featuresChoice.filter(function (it) {
        return it.offer.features.indexOf(item.value) >= 0;
      });
    });
    return featuresChoice;
  }

  window.filters = function (arrAds) {
    var filteredArray = arrAds;
    if (housingType.value !== 'any') {
      filteredArray = filterAdType(filteredArray, housingType.value);
    }
    if (housingPrice.value !== 'any') {
      filteredArray = filterAdPrice(filteredArray, housingPrice.value);
    }
    if (housingRooms.value !== 'any') {
      filteredArray = filterAdRoom(filteredArray, housingRooms.value);
    }
    if (housingGuests.value !== 'any') {
      filteredArray = filterAdGuests(filteredArray, housingGuests.value);
    }
    filteredArray = filterAdFeatures(filteredArray);
    return filteredArray;
  };
})();
