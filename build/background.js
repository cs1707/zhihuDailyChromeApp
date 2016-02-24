(function(){
  'use strict';

  var index = 'index.html';

  chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create(index, {
      bounds: {
        'width': 1200,
        'height': 700
      },
      state: 'maximized'
    });
  });

})();
