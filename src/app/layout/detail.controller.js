(function(){
  'use strict';

  angular.module('app')
    .controller('detailController', detailController);

    function detailController($scope, zhihu, $stateParams, $state) {
      getDetail();
      $scope.reload = function(){
        $scope.detail = null;
        getDetail();
      }

      function getDetail() {
        zhihu.getDetail($stateParams.id)
          .then(function(data){
            $scope.detail = data;
            if(data.recommenders) {
              // not good
              zhihu.getRecommenders($stateParams.id)
                .then(function(recommendersDetail){
                  $scope.detail.recommendersDetail = recommendersDetail;
                });
            }
          });
      }
    }
})();
