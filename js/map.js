'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var pinActive = mapPins.querySelector('.map__pin--active');
  var adTemplate = document.querySelector('template').content;
  var popup = adTemplate.querySelector('.map__card').cloneNode(true);
  var popupClose = popup.querySelector('.popup__close');

  var adsSet = [];
  adsSet = window.data.getSet();

  function onMouseupActivate() {
    map.classList.remove('map--faded');
    mapPinMain.removeEventListener('mouseup', onMouseupActivate);
    window.pin.renderPins(adsSet);
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
      window.data.isEnterEvent(evt, onPinClick);
    }
  });

  function onPopupEscPress(evt) {
    window.data.isEscEvent(evt, closePopup);
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
    window.data.isEnterEvent(evt, closePopup);
  });
})();
