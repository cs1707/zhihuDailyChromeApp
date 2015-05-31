(function(){
  'use strict';

  angular.module('app')
    .directive('blobSrc', function(zhihu){
      var directive = {
        restrict: 'A',
        link: linkFunc
      };

      return directive;

      function linkFunc(scope, elem, attr) {
        attr.$observe('blobSrc', function(url){
          if(!url) {
            return;
          }
          zhihu.getBlobUrl(url)
            .then(function(blobUrl) {
              attr.$set('src', blobUrl);
            });
        });
      }
    });
})();
