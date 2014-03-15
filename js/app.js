var app = angular.module("app", ["ngRoute", "service", "ngSanitize", "ui.bootstrap", "infinite-scroll", "duScroll"]);

app.config(function($routeProvider, $compileProvider){
	$routeProvider
		.when("/",{
			templateUrl: "templates/app.html",
			controller: AppCtrl
		})
		.when("/news/:newsId",{
			templateUrl: "templates/detail.html",
			controller: DetailCtrl
		})

 	 $compileProvider
 	 	.imgSrcSanitizationWhitelist(/^\s*(https?|file|tel|blob):/)
 	 	.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|blob|chrome-extension):/);
})



