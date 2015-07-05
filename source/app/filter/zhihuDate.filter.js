(function(){
  'use strict';

  angular.module('app')
    .filter('zhihuDate', function($filter){

      return function(input, param) {
        if(!input) {
          return;
        }
        var reg = /^(\d{4})(\d{2})(\d{2})$/;
        var date = new Date(input.replace(reg, '$1/$2/$3'));
        return $filter('date')(date, param);
      };
    });
})();
