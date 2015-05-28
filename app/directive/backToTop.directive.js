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
          $container.off('scroll', scrollListener);
        });

        function scrollListener(e) {
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
    });

})();
