angular.module("service", ["ngRoute"])
	.service("Zhihu", function($q, $http, $filter){
		var latestNewsUrl = "http://news-at.zhihu.com/api/2/news/latest";
		var previousNewsUrl = "http://news.at.zhihu.com/api/2/news/before/"; // + DateParam
		var detailNewsUrl = "http://news.at.zhihu.com/api/2/news/"   // + newsId
		var dayCount = 0;
		this.previousNews = [];
		this.pos = 0;

		this.getLatestNews = function() {
			var d = $q.defer();
			$http({
				method: "GET",
				url: latestNewsUrl,
				cache: true
			}).success(function(data){
				d.resolve(data);
			}).error(function(error){
				d.reject(error);
			});

			return d.promise;
		}

		this.getBlobImg = function(imgUrl){
			var d = $q.defer();
			$http({
				method: "GET",
				url: imgUrl,
				responseType: 'blob',
			}).success(function(blob){
				data = window.URL.createObjectURL(blob);
				d.resolve(data);
			}).error(function(error){
				d.reject(error);
			})

			return d.promise;
		}

		this.getDetailNews = function(newsId){
			var d = $q.defer();
			$http({
				method: "GET",
				url: detailNewsUrl + newsId
			}).success(function(data){
				d.resolve(data);
			}).error(function(error){
				d.reject(error);
			})

			return d.promise;
		}

		this.getPreviousNews = function() {
			var d = $q.defer();
			var today = new Date();
			var Millis = today.valueOf() - dayCount * 86400000;
			var dayParam = $filter('date')(Millis, "yyyyMMdd");
			$http({
				method: "GET",
				url: previousNewsUrl + dayParam,
				cache: true
			}).success(function(data){
				dayCount++;
				data.date = $filter('date')(Millis - 86400000, "yyyy年MM月dd日");
				d.resolve(data);
			}).error(function(error){
				d.reject(error);
			});

			return d.promise;
		}

	})