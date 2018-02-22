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

var map = document.querySelector('.map');

function makeOnePin(onePin) {
  var pin = document.createElement('button');
  pin.id = onePin.id;
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

var mapPins = map.querySelector('.map__pins');

function renderPins() {
  var fragmentPin = document.createDocumentFragment();
  for (i = 0; i < adsSet.length; i++) {
    fragmentPin.appendChild(makeOnePin(adsSet[i]));
  }
  mapPins.appendChild(fragmentPin);
}

var adTemplate = document.querySelector('template').content;
var popup = adTemplate.querySelector('.map__card').cloneNode(true);

function popupOneAd(oneAd) {
  popup.querySelector('.popup__avatar').src = oneAd.author.avatar;
  popup.querySelector('h3').textContent = oneAd.offer.title;
  popup.querySelector('article p').textContent = oneAd.offer.address;
  popup.querySelector('.popup__price').textContent = oneAd.offer.price + ' \u20bd / ночь';
  var typeRu = '';
  if (oneAd.offer.type === 'flat') {
    typeRu = 'Квартира';
  } else if (oneAd.offer.type === 'bungalo') {
    typeRu = 'Бунгало';
  } else {
    typeRu = 'Дом';
  }
  popup.querySelector('h4').textContent = typeRu;
  popup.querySelector('h4 + p').textContent = oneAd.offer.rooms + ' для ' + oneAd.offer.guests + ' гостей';
  popup.querySelectorAll('article p')[3].textContent = 'Заезд после ' + oneAd.offer.checkin + ', ' + 'выезд до ' + oneAd.offer.checkout;

  var fragment = document.createDocumentFragment();

  function removeNodes(parent, node) {
    var child = parent.querySelector(node);
    while (child) {
      parent.removeChild(child);
      child = parent.querySelector(node);
    }
  }
  var popupFeatures = popup.querySelector('.popup__features');
  removeNodes(popupFeatures, 'li');
  for (i = 0; i < oneAd.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('feature');
    li.classList.add('feature--' + oneAd.offer.features[i]);
    fragment.appendChild(li);
  }
  popupFeatures.appendChild(fragment);

  popup.querySelector('ul + p').textContent = oneAd.offer.description;

  var popupPhotos = popup.querySelector('.popup__pictures');
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

var mapPinMain = map.querySelector('.map__pin--main');
var notice = document.querySelector('.notice');
var noticeForm = notice.querySelector('.notice__form');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var pinActive = mapPins.querySelector('.map__pin--active');
var popupClose = popup.querySelector('.popup__close');

function onMouseupActivate() {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  var fieldsets = noticeForm.children;
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  renderPins();
}
mapPinMain.addEventListener('mouseup', onMouseupActivate);

function onPinClick(evt) {
  mapPinMain.removeEventListener('mouseup', onMouseupActivate);
  var target = evt.target.tagName === 'IMG' ? evt.target.parentNode : evt.target;
  if (pinActive) {
    pinActive.classList.remove('map__pin--active');
  }
  if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
    target.classList.add('map__pin--active');
    pinActive = target;
    var adNumber = target.id;
    popupOneAd(adsSet[adNumber]);
    map.insertBefore(popup, mapFiltersContainer);
    popup.classList.remove('hidden');
  }
}
map.addEventListener('click', onPinClick);

map.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && !mapPinMain) {
    onPinClick();
  }
});

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}
map.addEventListener('keydown', onPopupEscPress);

function closePopup() {
  pinActive.classList.remove('map__pin--active');
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

function onPopupClick() {
  closePopup();
}

popupClose.addEventListener('click', onPopupClick);
popupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

noticeForm.querySelector('#address').value = '200,400';

var timein = noticeForm.querySelector('#timein');
var timeout = noticeForm.querySelector('#timeout');
var typeSelect = noticeForm.querySelector('#type');
var priceSelect = noticeForm.querySelector('#price');
var roomNumber = noticeForm.querySelector('#room_number');
var capacityGuests = noticeForm.querySelector('#capacity');

function onChangeTimeIn() {
  timein.value = timeout.value;
}
timeout.addEventListener('change', onChangeTimeIn);

function onChangeTimeOut() {
  timeout.value = timein.value;
}
timein.addEventListener('change', onChangeTimeOut);

var minPriceVariety = ['1000', '0', '5000', '10000'];

function onChangeMinPrice() {
  priceSelect.min = minPriceVariety[typeSelect.options.selectedIndex];
}
typeSelect.addEventListener('change', onChangeMinPrice);

function correlateGuestsToRooms() {
  var selectRooms = roomNumber.selectedIndex;
  for (i = 0; i < capacityGuests.options.length; i++) {
    capacityGuests.options[i].removeAttribute('hidden');
  }
  if (selectRooms === 0) { // 1 комната
    capacityGuests.options[0].setAttribute('hidden', 'hidden');
    capacityGuests.options[1].setAttribute('hidden', 'hidden');
    capacityGuests.options[3].setAttribute('hidden', 'hidden');
  }
  if (selectRooms === 1) { // 2 комнаты
    capacityGuests.options[0].setAttribute('hidden', 'hidden');
    capacityGuests.options[3].setAttribute('hidden', 'hidden');
  }
  if (selectRooms === 2) { // 3 комнаты
    capacityGuests.options[3].setAttribute('hidden', 'hidden');
  }
  if (selectRooms === 3) { // 100 комнат
    capacityGuests.options[0].setAttribute('hidden', 'hidden');
    capacityGuests.options[1].setAttribute('hidden', 'hidden');
    capacityGuests.options[2].setAttribute('hidden', 'hidden');
  }
}

function onChangeGuests() {
  correlateGuestsToRooms();
  capacityGuests.value = roomNumber.value;
}
roomNumber.addEventListener('change', onChangeGuests);
