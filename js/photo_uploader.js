'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('.upload #avatar');
  var previewAvatar = document.querySelector('.notice__preview img');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
