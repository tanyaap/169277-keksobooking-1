'use strict';

(function () {
  var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  function getRandomElement(arr) {
    var arrRandomItem = Math.floor(Math.random() * arr.length);
    return arr[arrRandomItem];
  }

  function getUniqueRandomElement(arr) {
    var uniqueRandomItem = Math.floor(Math.random() * arr.length);
    var randomItem = arr[uniqueRandomItem];
    arr.splice(uniqueRandomItem, 1);
    return randomItem;
  }

  function getRandomItemInRange(min, max) {
    var randomItemInRange = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomItemInRange;
  }

  function getRandomArray(arr) {
    var arrCopy = arr.slice();
    var oneAdFeatures = [];
    var randomLength = getRandomItemInRange(1, arrCopy.length);
    for (var i = 0; i < randomLength; i++) {
      oneAdFeatures[i] = getUniqueRandomElement(arrCopy);
    }
    return oneAdFeatures;
  }

  window.data = {
    getSet: function () {
      var adsSet = [];
      for (var i = 0; i < 8; i++) {
        var adsX = getRandomItemInRange(300, 900);
        var adsY = getRandomItemInRange(150, 500);
        var oneSet = {
          'id': i,
          'author': {
            'avatar': 'img/avatars/user' + '0' + getUniqueRandomElement(AVATARS) + '.png',
          },
          'offer': {
            'title': getUniqueRandomElement(TITLES),
            'address': adsX + ', ' + adsY,
            'price': getRandomItemInRange(1000, 1000000),
            'type': getRandomElement(TYPES),
            'rooms': getRandomItemInRange(1, 5),
            'guests': getRandomItemInRange(1, 30),
            'checkin': getRandomElement(CHECKINS),
            'checkout': getRandomElement(CHECKOUTS),
            'features': getRandomArray(FEATURES),
            'description': '',
            'photos': getRandomArray(PHOTOS),
          },
          'location': {
            'x': adsX,
            'y': adsY,
          }
        };
        adsSet[i] = oneSet;
      }
      return adsSet;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
