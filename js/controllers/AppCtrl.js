function AppCtrl($scope, Zhihu, scroller) {

	Zhihu.getLatestNews()
		.then(formatNews)
		.then(formatTopStories)
		.then(function(data){
			var today = new Date();
			$scope.date = today.valueOf();
			$scope.myInterval = 5000;
			$scope.news = data.news;
			$scope.top_stories = data.top_stories;
			$scope.previousNews = Zhihu.previousNews;
			$scope.getPreviousNews = function(){
				Zhihu.getPreviousNews()
					.then(formatNews)
					.then(function(data){
						Zhihu.previousNews.push(data);
					})
			}
		})

		$scope.$on("$routeChangeStart", function(){
			Zhihu.pos = $(window).scrollTop();
		})

		var x = 0;
		var y = Zhihu.pos;
		var duration = 1000;
		scroller.scrollTo(x, y, duration);

	

	function formatNews(data){
		$.each(data.news, function(index, value){
			Zhihu.getBlobImg(value.thumbnail)
				.then(function(data){
					value.thumbnail = data;
				})
			})
		return data;
	}
	function formatTopStories(data){
		$.each(data.top_stories, function(index, value){
			Zhihu.getBlobImg(value.image)
				.then(function(data){
					value.image = data;
				})
			})
		return data;
	}	
}



