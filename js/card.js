'use strict';

(function () {
  window.card = {
    popupOneAd: function (popup, oneAd) {
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
      for (var i = 0; i < oneAd.offer.features.length; i++) {
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
  };
})();
