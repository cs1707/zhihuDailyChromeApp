(function(){
  'use strict';

  angular.module('app')
    .controller('listController', listController);

    function listController($scope, zhihu, $filter, zhihuList) {

      getLatest();

      function getLatest() {
        zhihu.getLatest()
        .then(function(data){
          $scope.list = [data];
          zhihuList.main = data.stories.map(function(story){
            return story.id;
          });
          $scope.getOldNews = getOldNews(data.date);
        });
      }

      function getOldNews(date) {
        var reg = /^(\d{4})(\d{2})(\d{2})$/;
        var today = new Date(date.replace(reg, '$1/$2/$3'));
        var currentDay = today.valueOf();
        var pendingFlag = false;
        return function() {
          if(pendingFlag) {
            return false;
          }
          pendingFlag = true;
          return zhihu.getBefore($filter('date')(currentDay, 'yyyyMMdd'))
            .then(function(data){
              if(!data || !data.date) {
                return false;
              }
              $scope.list.push(data);
              data.stories.forEach(function(story){
                zhihuList.main.push(story.id);
              });
              currentDay -= 86400000;
            })
            .finally(function(){
              pendingFlag = false;
            });
        };
      }
    }
})();
