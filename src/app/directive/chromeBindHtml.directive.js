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

          // 将图片的src 替换为 blob-src
          var imgReg = /<img\s+[^>]*>/gi;
          var replacedStr = value.replace(imgReg, function(match){
            return match.replace(/\ssrc(?=(\s*=))/i, ' blob-src');
          });

          var html = elem.html(replacedStr);
          $(html).find('img')
            .each(function(){
              // 编译 blob-src
              $compile(this)(scope);
            })
            .end()
            .find('a')
            .attr('target', '_blank')
            .removeAttr('rel');
            // 在mac下rel标签会导致chrome崩溃
       });
      }
    });

})();
