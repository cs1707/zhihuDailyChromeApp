(function(){
  'use strict';

  angular.module('app')
    .filter('blob', function(zhihu){
      filterFunc.$stateful = true;

      return filterFunc;

      function filterFunc(input) {
        return zhihu.getBlobUrl(input);
          // .then(function(blobUrl){
          //   console.log(blobUrl);
          //   return blobUrl;
          // });
      }

    });
})();
