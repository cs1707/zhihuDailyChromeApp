(function(){
  'use strict';

  angular.module('app')
    .controller('detailController', detailController);

    function detailController($scope, $q, zhihu, $stateParams, $state, zhihuList) {
      getDetail();

      function getDetail() {
        zhihu.getDetail($stateParams.id)
          .then(function(data){
            $scope.detail = data;
          })
          .then(function(){
            if($scope.detail.recommenders) {
              return zhihu.getRecommenders($stateParams.id);
            } else {
              $q.reject();
            }
          })
          .then(function(recommendersDetail){
            $scope.detail.recommendersDetail = recommendersDetail;
          });
      }
    }
})();
