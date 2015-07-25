(function(){
  'use strict';

  angular.module('app')
    .directive('zhihuPage', function($rootScope, zhihu, zhihuList, $state, $stateParams, $filter){
      var directive = {
        restrict: 'EA',
        templateUrl: 'app/directive/page.html',
        link: linkFunc
      };
      return directive;

      function linkFunc(scope, elem, attr) {
        $rootScope.$on('$stateChangeSuccess', function(){

          if($state.current.name === 'app.detail') {
            var list, index;
            scope.themeId = $stateParams.themeId;
            if($stateParams.themeId) {
              list = zhihuList.theme[$stateParams.themeId];
            } else {
              list = zhihuList.main;
            }
            index = list.indexOf(+$stateParams.id);
            if(index !== -1) {
              scope.pre = list[index - 1];
              scope.next = list[index + 1];
            }
          } else {
            scope.pre = scope.next = null;
          }
        });
      }

    });

})();
