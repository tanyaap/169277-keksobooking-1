'use strict';

var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

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
  var oneAdFeatures = [];
  var randomLength = getRandomItemInRange(0, arr.length);
  for (var i = 0; i < randomLength; i++) {
    oneAdFeatures[i] = getUniqueRandomElement(arr);
  }
  return oneAdFeatures;
}

var adsSet = [];

for (var i = 0; i < 8; i++) {
  var adsX = getRandomItemInRange(300, 900);
  var adsY = getRandomItemInRange(150, 500);
  var oneSet = {
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

function makeOnePin(onePin) {
  var pin = document.createElement('button');
  pin.className = 'map__pin';
  pin.style.left = onePin.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = onePin.location.y + PIN_HEIGHT + 'px';
  var pinImage = document.createElement('img');
  pinImage.src = onePin.author.avatar;
  pinImage.width = PIN_WIDTH;
  pinImage.height = PIN_HEIGHT;
  pinImage.draggable = false;
  pin.appendChild(pinImage);
  return pin;
}

function renderPins() {
  var mapPins = map.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();
  for (i = 0; i < adsSet.length; i++) {
    fragmentPin.appendChild(makeOnePin(adsSet[i]));
  }
  mapPins.appendChild(fragmentPin);
}
renderPins();

var adTemplate = document.querySelector('template').content;
var adFromSet = adTemplate.cloneNode(true);

function popupOneAd(oneAd) {
  adFromSet.querySelector('.popup__avatar').src = oneAd.author.avatar;
  adFromSet.querySelector('h3').textContent = oneAd.offer.title;
  adFromSet.querySelector('article p').textContent = oneAd.offer.address;
  adFromSet.querySelector('.popup__price').textContent = oneAd.offer.price + ' \u20bd / ночь';
  var typeRu = '';
  if (oneAd.offer.type === 'flat') {
    typeRu = 'Квартира';
  } else if (oneAd.offer.type === 'bungalo') {
    typeRu = 'Бунгало';
  } else {
    typeRu = 'Дом';
  }
  adFromSet.querySelector('h4').textContent = typeRu;
  adFromSet.querySelector('h4 + p').textContent = oneAd.offer.rooms + ' для ' + oneAd.offer.guests + ' гостей';
  adFromSet.querySelectorAll('article p')[3].textContent = 'Заезд после ' + oneAd.offer.checkin + ', ' + 'выезд до ' + oneAd.offer.checkout;

  var fragment = document.createDocumentFragment();

  function removeNodes(parent, node) {
    var child = parent.querySelector(node);
    while (child) {
      parent.removeChild(child);
      child = parent.querySelector(node);
    }
  }
  var popupFeatures = adFromSet.querySelector('.popup__features');
  removeNodes(popupFeatures, 'li');
  for (i = 0; i < oneAd.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('feature');
    li.classList.add('feature--' + oneAd.offer.features[i]);
    fragment.appendChild(li);
  }
  popupFeatures.appendChild(fragment);

  adFromSet.querySelector('ul + p').textContent = oneAd.offer.description;

  var popupPhotos = adFromSet.querySelector('.popup__pictures');
  removeNodes(popupPhotos, 'li');
  for (i = 0; i < oneAd.offer.photos.length; i++) {
    li = document.createElement('li');
    var liImg = document.createElement('img');
    liImg.src = oneAd.offer.photos[i];
    liImg.width = 50;
    liImg.height = 50;
    li.appendChild(liImg);
    fragment.appendChild(li);
  }
  popupPhotos.textContent = '';
  popupPhotos.appendChild(fragment);
}

popupOneAd(adsSet[0]);

var mapFiltersContainer = map.querySelector('.map__filters-container');
map.insertBefore(adFromSet, mapFiltersContainer);
