(function(){
  'use strict';

  angular.module('app')
    .config(config)
    .run(function($rootScope){
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        var $list = $('#zhihu-list');
        var $detail = $('#zhihu-detail');
        // console.log($list, $detail);
        if(toState.name == 'list') {
          $rootScope.isListShow = true;
          // $rootScope.isDetailShow =false;
          // $detail.fadeOut();
        } else if(toState.name == 'list.detail') {
          $rootScope.isListShow = false;
          // $rootScope.isDetailShow = true;
        }
      });
    });

  function config($stateProvider, $compileProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/app',
        template: 'hello'
      })
      .state('list', {
        url: '/',
        controller: 'listController',
        templateUrl: 'app/layout/list.html'
      })
      .state('list.detail', {
        url: '^/news/:id',
        controller: 'detailController',
        templateUrl: 'app/layout/detail.html'
      });

    $compileProvider
      .imgSrcSanitizationWhitelist(/^\s*(https?|http|file|tel|blob):/)
      .aHrefSanitizationWhitelist(/^\s*(https?|file|tel|blob|chrome-extension):/);
  }
})();
