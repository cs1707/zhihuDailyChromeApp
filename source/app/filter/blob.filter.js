(function(){
  'use strict';
  // it doesn't work

  angular.module('app')
    .filter('blob', function(zhihu){
      filterFunc.$stateful = true;

      return filterFunc;

      function filterFunc(input) {
        return zhihu.getBlobUrl(input);
      }

    });
})();
