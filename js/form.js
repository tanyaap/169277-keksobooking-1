'use strict';

(function () {
  var MIN_PRICE_VARIETY = ['1000', '0', '5000', '10000'];

  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var typeSelect = noticeForm.querySelector('#type');
  var priceSelect = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacityGuests = noticeForm.querySelector('#capacity');
  var address = noticeForm.querySelector('#address');
  var submit = noticeForm.querySelector('.form__submit');

  window.form = {
    onMouseupFormActivate: function () {
      noticeForm.classList.remove('notice__form--disabled');
      var fieldsets = noticeForm.children;
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
      }
    }
  };

  function onChangeTimeIn() {
    timein.value = timeout.value;
  }
  timeout.addEventListener('change', onChangeTimeIn);

  function onChangeTimeOut() {
    timeout.value = timein.value;
  }
  timein.addEventListener('change', onChangeTimeOut);

  function onChangeMinPrice() {
    priceSelect.min = MIN_PRICE_VARIETY[typeSelect.options.selectedIndex];
  }
  typeSelect.addEventListener('change', onChangeMinPrice);

  function correlateGuestsToRooms() {
    var selectRooms = roomNumber.selectedIndex;
    for (var i = 0; i < capacityGuests.options.length; i++) {
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

  address.value = address.value ? address.value : '200,400';

  function formValidity(evt) {
    var stopSubmit = false;
    if ((parseInt(priceSelect.value, 10) < MIN_PRICE_VARIETY [typeSelect.selectedIndex])) {
      priceSelect.style.border = '2px solid #ff0000';
      stopSubmit = true;
    } else {
      priceSelect.style.border = '';
    }
    if (roomNumber.selectedIndex === 0) { // 1 комната
      if (capacityGuests.value !== '1') {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (roomNumber.selectedIndex === 1) { // 2 комнаты
      if ((capacityGuests.value !== '1') || (capacityGuests.value !== '2')) {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (roomNumber.selectedIndex === 2) { // 3 комнаты
      if (capacityGuests.value === '0') {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (roomNumber.selectedIndex === 3) { // 100 комнат
      if (capacityGuests.value !== '0') {
        capacityGuests.style.border = '2px solid #ff0000';
        stopSubmit = true;
      } else {
        capacityGuests.style.border = '';
      }
    }
    if (stopSubmit) {
      evt.preventDefault();
    }
  }
  submit.addEventListener('click', formValidity);
})();
