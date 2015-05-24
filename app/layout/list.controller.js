(function(){
  'use strict';

  angular.module('app')
    .controller('listController', listController);

    function listController($scope, zhihu, $filter) {

      getLatest();

      function getLatest() {
        zhihu.getLatest()
        .then(function(data){
          $scope.list = data;
          $scope.getOldNews = getOldNews(data.date);
        });
      }

      function getOldNews(date) {
        var reg = /^(\d{4})(\d{2})(\d{2})$/;
        var today = new Date(date.replace(reg, '$1/$2/$3'));
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
