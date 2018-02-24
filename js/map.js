'use strict';

(function () {
  var MAIN_PIN_WIDTH = 40;
  var MAIN_PIN_HEIGHT = 44;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var pinActive = mapPins.querySelector('.map__pin--active');
  var adTemplate = document.querySelector('template').content;
  var popup = adTemplate.querySelector('.map__card').cloneNode(true);
  var popupClose = popup.querySelector('.popup__close');
  var pinMainX = mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2;
  var pinMainY = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
  var limits = {
    'top': 150 - MAIN_PIN_HEIGHT,
    'bottom': 700 - MAIN_PIN_HEIGHT,
    'left': 50 - MAIN_PIN_WIDTH / 2,
    'right': 1200 - MAIN_PIN_WIDTH / 2,
  };

  var adsSet = [];
  function successHandler(data) {
    adsSet = data;
    for (var i = 0; i < adsSet.length; i++) {
      adsSet[i].id = i;
    }
    window.pin.renderPins(adsSet);
  }

  function onMouseupActivate() {
    map.classList.remove('map--faded');
    mapPinMain.removeEventListener('mouseup', onMouseupActivate);
    window.backend.load(successHandler, window.backend.errorHandler);
    window.form.onMouseupFormActivate();
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
      window.card.popupOneAd(popup, adsSet[adNumber]);
      map.insertBefore(popup, mapFiltersContainer);
      popup.classList.remove('hidden');
    }
  }
  map.addEventListener('click', onPinClick);

  map.addEventListener('keydown', function (evt) {
    if (!mapPinMain) {
      window.util.isEnterEvent(evt, onPinClick);
    }
  });

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePopup);
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
    window.util.isEnterEvent(evt, closePopup);
  });

  var address = document.querySelector('#address');
  address.value = 'x: ' + pinMainX + ', y: ' + pinMainY;
  var startCoords = {
    'x': null,
    'y': null,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    pinMainX = mapPinMain.offsetLeft - shift.x;
    pinMainY = mapPinMain.offsetTop - shift.y;
    if (pinMainX > limits.right) {
      pinMainX = limits.right;
    } else if (pinMainX < limits.left) {
      pinMainX = limits.left;
    }
    if (pinMainY > limits.bottom) {
      pinMainY = limits.bottom;
    } else if (pinMainY < limits.top) {
      pinMainY = limits.top;
    }
    mapPinMain.style.left = pinMainX + 'px';
    mapPinMain.style.top = pinMainY + 'px';
    address.value = 'x: ' + (pinMainX + MAIN_PIN_WIDTH / 2) + ', y: ' + (pinMainY + MAIN_PIN_HEIGHT);
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  function onHandlerDrag(evt) {
    evt.preventDefault();
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  mapPinMain.addEventListener('mousedown', onHandlerDrag);
})();
