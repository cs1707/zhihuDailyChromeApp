(function(){
  'use strict';

  angular.module('app')
    .filter('zhihuDate', function(){
      return function(input) {
        return input && input.substring(0, 4) + '-' + input.substring(4, 6) + '-' + input.substring(6, 8);
      };
    });
})();
