(function(){
  'use strict';

  angular.module('app')
    .directive('zhihuThemes', function(zhihu){
      var directive = {
        restrict: 'A',
        templateUrl: 'app/directive/zhihuThemes.html',
        link: linkFunc
      };

      return directive;

      function linkFunc(scope, elem, attr) {
        zhihu.getThemes()
          .then(function(data){
            scope.themes = data;
          });
      }

    });

})();
