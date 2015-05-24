(function(){
  'use strict';

  angular.module('app')
    .controller('themeController', controller);

    function controller($scope, zhihu, $stateParams) {
      getTheme($stateParams.id);

      function getTheme(id){
        zhihu.getTheme(id)
          .then(function(data){
            $scope.theme = data;
            $scope.getOldTheme = getOldTheme(id, data.stories[data.stories.length - 1].id);
          });
      }

      function getOldTheme(id, beforeId) {
        var pendingFlag = false;
        var terminalFlag = false;
        $scope.oldTheme = {
          stories: []
        };

        return function(){
          if(pendingFlag || terminalFlag) {
            return false;
          }
          pendingFlag = true;
          zhihu.getThemeBefore(id, beforeId)
            .then(function(data){
              if(!data.stories.length) {
                // no more news
                terminalFlag = true;
                return false;
              }
              data.stories.forEach(function(item){
                $scope.oldTheme.stories.push(item);
              });
              beforeId = data.stories[data.stories.length - 1].id;
            })
            .finally(function(){
              pendingFlag = false;
            });
        }
      };
    }
})();
