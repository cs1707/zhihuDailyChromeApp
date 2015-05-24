(function(){
  'use strict';

  angular.module('app')
    .directive('chromeWebview', function(zhihu){
      // fix webview scroll bug
      var directive = {
        restrict: 'A',
        link: linkFunc
      };

      return directive;

      function linkFunc(scope, elem, attr) {
        elem.on('loadstart', function(){
          elem.toggleClass('overflow-auto');
        })
        elem.on('loadstop', function(){
          setTimeout(function(){
            elem.toggleClass('overflow-auto');
          }, 500);
        });
      }
    });
})();
