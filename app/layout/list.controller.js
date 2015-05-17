(function(){
  'use strict';

  angular.module('app')
    .controller('listController', listController);

    function listController($scope, zhihu, $filter) {

      getLatest();
      $scope.getOldNews = getOldNews();

      function getLatest() {
        zhihu.getLatest()
        .then(function(data){
          $scope.list = data;
        });
      }

      function getOldNews() {
        var today = new Date();
        var currentDay = today.valueOf();
        $scope.oldNews = [];
        return function() {
          zhihu.getBefore($filter('date')(currentDay, 'yyyyMMdd'))
            .then(function(data){
              $scope.oldNews.push(data);
            });
          currentDay -= 86400000;
        }
      }
    }
})();
