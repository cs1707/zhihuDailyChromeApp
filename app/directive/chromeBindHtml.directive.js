(function(){
  'use strict';

  angular.module('app')
    .directive('chromeBindHtml', function($compile){
      var directive = {
        restrict: 'A',
        scope: {
          chromeBindHtml: '='
        },
        link: linkFunc
      };

      return directive;

      function linkFunc(scope, elem, attr) {
        scope.$watch('chromeBindHtml', function(value) {
          if(!value) {
            return;
          }
          var html = $compile(angular.element(value.replace(/src/g, 'blob-src')))(scope);
          html.find('a').attr('target', '_blank').removeAttr('rel');
          elem.append(html);
       });
      }
    });

})();
