(function(){
  'use strict';

  angular.module('app')
    .config(config)
    .run(run);

  function config($stateProvider, $compileProvider, $urlRouterProvider, $sceDelegateProvider, $provide) {
    // Prevent Angular from sniffing for the history API
    // since it's not supported in packaged apps.
    $provide.decorator('$window', function($delegate) {
      $delegate.history = null;
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

  function run($rootScope, $state, $previousState, $stickyState, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$previousState = $previousState;
    $rootScope.reload = function(){
      $state.transitionTo($state.current, $stateParams, {
        reload: $state.current.name,
        inherit: false,
        notify: true
      });
    }
  }
})();
