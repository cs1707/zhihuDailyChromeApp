function DetailCtrl($scope, $routeParams, Zhihu, $sce, $filter, $q){

	Zhihu.getDetailNews($routeParams.newsId)
		.then(function(data){
			Zhihu.getBlobImg(data.image)
				.then(function(blob){
					data.image = blob;
				})
			return data;
		})
		.then(function(data){
			var parser = new DOMParser();
			var html = parser.parseFromString(data.body, "text/html");
			var imgs = html.getElementsByTagName("img");
			var a = html.getElementsByTagName("a");
			$.each(a, function(){
				this.target = "_blank";
			})
			var promises = [];
			$.each(imgs, function(){
				var self = this;
				var promise = Zhihu.getBlobImg(this.src);

				promise.then(function(blob){
						self.src = blob;
					})
				promises.push(promise);
			})
			$q.all(promises)
				.then(function(){
					data.body = html.body.innerHTML;
				});
				
			return data;
		})
		.then(function(data){
			$scope.data= data;
			$scope.getTrustHtml = function(){
				return $sce.trustAsHtml($scope.data.body)
			}
		})
}
