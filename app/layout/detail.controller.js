(function(){
  'use strict';

  angular.module('app')
    .controller('detailController', detailController);

    function detailController($scope, zhihu, $stateParams) {
      zhihu.getDetail($stateParams.id)
        .then(function(data){
          $scope.detail = data;
        });
    }
})();
