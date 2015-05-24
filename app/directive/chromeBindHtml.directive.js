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

      var parser = new DOMParser();

      return directive;

      function linkFunc(scope, elem, attr) {
        scope.$watch('chromeBindHtml', function(value) {
          if(!value) {
            return;
          }
          // 正则的目的是防止angular编译时遇到{{}}出错。
          var dom = parser.parseFromString(value.replace(/\{\{/g, '[['), 'text/html');
          $(dom)
            .find('img')
            .each(function(){
              var $this = $(this);
              $this.attr('blob-src', $this.attr('src'))
                .removeAttr('src');
            })
            .end()
            .find('a')
            .attr('target', '_blank')
            .removeAttr('rel');
            // rel 属性会导致chrome 崩溃

          var compiledHtml = $compile(dom.body)(scope);
          elem.replaceWith(compiledHtml);
       });
      }
    });

})();
