(function(){
  'use strict';

  angular.module('app')
    .controller('themeController', controller);

    function controller($scope, zhihu, $stateParams, zhihuList) {
      $scope.themeId = $stateParams.themeId;
      getTheme($stateParams.themeId);

      function getTheme(id){
        zhihu.getTheme(id)
          .then(function(data){
            $scope.theme = data;
            zhihuList.theme[id] = data.stories.map(function(story){
              return story.id;
            });
            $scope.getOldTheme = getOldTheme(id, data.stories[data.stories.length - 1].id);
          });
      }

      function getOldTheme(id, beforeId) {
        var pendingFlag = false;
        var terminalFlag = false;

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
                $scope.theme.stories.push(item);
                zhihuList.theme[id].push(item.id);
              });
              beforeId = data.stories[data.stories.length - 1].id;
            })
            .finally(function(){
              pendingFlag = false;
            });
        };
      }
    }
})();
