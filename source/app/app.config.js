(function(){
  'use strict';

  angular.module('app')
    .config(config)
    .run(run);

  function config($stateProvider, $compileProvider, $urlRouterProvider, $sceDelegateProvider, $provide) {
    // Prevent Angular from sniffing for the history API
    // since it's not supported in packaged apps.
    $provide.decorator('$window', function($delegate) {
      Object.defineProperty($delegate, 'history', {get: function(){
          return null;
        }
      });
      return $delegate;
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('app', {
      abstract: true,
      templateUrl: 'app/layout/ui-view.html'
    })
    .state('app.list', {
      url: '/',
      views: {
        'list@app': {
          controller: 'listController',
          templateUrl: 'app/layout/list.html'
        }
      },
      sticky: true,
      deepStateRedirect: true
    })
    .state('app.detail', {
      url: '/news/:id/:themeId',
      views: {
        'detail@app': {
          controller: 'detailController',
          templateUrl: 'app/layout/detail.html'
        }
      }
    })
    .state('app.theme', {
      url: '/theme/:themeId',
      views: {
        'theme@app': {
          controller: 'themeController',
          templateUrl: 'app/layout/theme.html'
        }
      },
      sticky: true,
      deepStateRedirect: true
    });

    $compileProvider
      .imgSrcSanitizationWhitelist(/^\s*(https?|http|file|tel|blob):/)
      .aHrefSanitizationWhitelist(/^\s*(https?|file|tel|blob|chrome-extension):/);

    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://**']);
  }

  function run($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', function(){
      if($stateParams.themeId) {
        $rootScope.$historyUrl = '#/theme/' + $stateParams.themeId;
      } else {
        $rootScope.$historyUrl = '#/';
      }
    });
  }
})();
