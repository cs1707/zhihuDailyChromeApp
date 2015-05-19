(function(){
  'use strict';

  angular.module('app')
    .filter('zhihuDate', function($filter){
      return function(input, param) {
        if(!input) {
          return;
        }
        var date = input.substring(0, 4) + '-' + input.substring(4, 6) + '-' + input.substring(6, 8);
        return $filter('date')(date, param);
      };
    });
})();
