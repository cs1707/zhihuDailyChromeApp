(function(){
  'use strict';

  angular.module('app')
    .config(config)
    .run(run);

  function config($stateProvider, $compileProvider, $urlRouterProvider, $sceDelegateProvider) {
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
      url: '/news/:id',
      views: {
        'detail@app': {
          controller: 'detailController',
          templateUrl: 'app/layout/detail.html'
        }
      }
    })
    .state('app.theme', {
      url: '/theme/:id',
      views: {
        'theme@app': {
          controller: 'themeController',
          templateUrl: 'app/layout/theme.html'
        }
      },
      sticky: true,
      deepStateRedirect: true
    })

    $compileProvider
      .imgSrcSanitizationWhitelist(/^\s*(https?|http|file|tel|blob):/)
      .aHrefSanitizationWhitelist(/^\s*(https?|file|tel|blob|chrome-extension):/);

    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://**']);
  }

  function run($rootScope, $state, $previousState) {
    $rootScope.$state = $state;
    $rootScope.$previousState = $previousState;
  }
})();
