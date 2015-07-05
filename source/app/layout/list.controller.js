(function(){
  'use strict';

  angular.module('app')
    .controller('listController', listController);

    function listController($scope, zhihu, $filter) {

      getLatest();

      function getLatest() {
        zhihu.getLatest()
        .then(function(data){
          $scope.list = [data];
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
          zhihu.getBefore($filter('date')(currentDay, 'yyyyMMdd'))
            .then(function(data){
              $scope.list.push(data);
              currentDay -= 86400000;
            })
            .finally(function(){
              pendingFlag = false;
            });
        };
      }
    }
})();
