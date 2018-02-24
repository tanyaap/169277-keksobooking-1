'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  function requestCommon(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = requestCommon(onLoad, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = requestCommon(onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style.zIndex = 100;
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.backgroundColor = '#dd1f1f';
      node.style.border = '2px solid #fff';
      node.style.fontWeight = 'bold';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '28px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
