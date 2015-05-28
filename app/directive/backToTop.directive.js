(function(){
  'use strict';

  angular.module('app')
    .directive('backToTop', function(){
      var directive = {
        restrict: 'EA',
        link: linkFunc
      };

      return directive;

      function linkFunc(scope, elem, attr) {
        var $container = attr.backToTop ? $(attr.backToTop) : $(window);
        $container.on('scroll', scrollListener);
        $(elem).hide().on('click', scrollToTop);
        scope.$on('$destroy', function(){
          $container.off('scroll', throttleScroll);
        });

        function throttleScroll() {
          throttle(scrollListener);
        }

        function scrollListener() {
          if ($container.scrollTop() > $container.height()) {
            $(elem).fadeIn();
          } else {
            $(elem).fadeOut();
          }
        }

        function scrollToTop() {
          $container.animate({
            scrollTop: 0
          }, 800);
        }
      }

      function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function(){
          method.call(context);
        }, 3000);
      }
    });

})();
