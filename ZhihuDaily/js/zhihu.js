$(function() {
	reload();
})
	
function addImg(img_elm, uri) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', uri, true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
		img_elm.attr("src", window.webkitURL.createObjectURL(this.response));
	};
	xhr.send();
}

function brandClick(bar_top) {
	if($("#answer").is(":visible")) {
		$("#navbar a").one("click", function() {
			$("#first-page").show();
			$("#answer").fadeOut();
			$(window).scrollTop(bar_top);
			return false;
		})
	} 
}

function addClickEvent() {
	var bar_top = $(window).scrollTop();
	
	$(this).addClass("visited");
	
	var href = $(this).attr("href");
	$.getJSON(href, function(data) {
		// 加载图片信息
		$("#answer .img-wrap h1").text(data["title"]);
		$("#answer .img-wrap span").text("图片：" + data["image_source"]);
		$("#answer .img-wrap img").attr("src", data["image"]);

		// 加载内容
		$("#content-inner").html(data["body"]);

		// 获取图片
		$("#answer img").each(function() {
			var img_elm = $(this);
			var img_url = $(this).attr("src");
			addImg(img_elm, img_url);
		})

		// 修改下超链接
		$(".view-more a").each( function(){
			$(this).attr("target", "_blank");
		})

		
		$("#first-page").hide();
		$(window).scrollTop(0);

		$("#answer").fadeIn(2000);



		brandClick(bar_top);
	})
	
	return false;
}
function reload() {
	$.getJSON("http://news.at.zhihu.com/api/1.2/news/latest", function(data) {
		// 添加日期
		
		var date = data["date"];
		var year = date.slice(0, 4);
		var month = date.slice(4, 6);
		var day = date.slice(6, 8);


		$(".datestamp").text(year + "年" + month + "月" + day + "日");
		
		
		$.each(data["news"], function(index, news) {
			// 添加标题列表
			var img_elm = $("<img>");
			var url = news["thumbnail"];
			addImg(img_elm, url);
			var list_group_item = $('<a target="_blank" href="' + news["url"] + '" target="_blank" class="list-group-item"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3>' + news["title"] + '</h3></a>');
			list_group_item.bind("click", addClickEvent);

			list_group_item.prepend(img_elm);
			$(".list-group").append(list_group_item);


			// 添加轮播图片
			if (index < 5) {
				var carousel_item = $('<div class="item"></div>');
				$("#inner").append(carousel_item);

				var img_crsl_elm = $('<img>');
				var img_crsl_elm_url = news["image"];
				addImg(img_crsl_elm, img_crsl_elm_url);

				carousel_item.append(img_crsl_elm);
				var crsl_caption = $('<div class="carousel-caption"></div>');
				
				var crsl_caption_a = $('<a href="' + news["url"] + '" >' +  '<h1 class="head-title">' + news["title"] + '</h1>' + '</a>');
				

				crsl_caption.append(crsl_caption_a);
				carousel_item.append(crsl_caption);
				crsl_caption_a.bind("click", addClickEvent);
				$("#inner").append(carousel_item);
			}
		})
		$("#inner div:first").addClass("active");

		$(window).scroll(function() {
		
			if (($(document).height() <= ($(window).height() + $(window).scrollTop())) && $("#first-page").is(":visible")) {
				//
				var date_url = String(year) + String(month) + String(day);
				var url = "http://news.at.zhihu.com/api/1.2/news/before/" + date_url;

				var date = new Date(year + "-" + month + "-" + day);
				day = date.getDate() - 1;
				date.setDate(day);
				year = date.getFullYear();
				month = date.getMonth() + 1;
				if (month < 10) {
					month = "0" + String(month);
				}
				day = date.getDate();
				if (day < 10) {
					day = "0" + String(day);
				}
				
				$.getJSON(url, function(data) {
					// body...
					var main_div = $('<div class="main"></div>');
					var list_group_elm = $('<div class="list-group"></div>')
					var h2_elm = $('<h2 class="datestamp"></h2>');
					h2_elm.text(year + "年" + month + "月" + day + "日");
					
					main_div.append(h2_elm);
					main_div.append(list_group_elm);

					$.each(data["news"], function(index, news) {
					// 添加标题列表
						var img_elm = $("<img>");
						var url = news["thumbnail"];
						addImg(img_elm, url);
						var list_group_item = $('<a target="_blank" href="' + news["url"] + '" target="_blank" class="list-group-item"><span class="glyphicon glyphicon-chevron-right pull-right"></span><h3>' + news["title"] + '</h3></a>');
							list_group_item.bind("click", addClickEvent);
						list_group_item.prepend(img_elm);

						
						list_group_elm.append(list_group_item);
					})
					$("#first-page").append(main_div);
				})
			}
		})
	}).fail(function() {
		$("#navbar a").one("click", function() {
			reload();
			return false;
		})
	})	
}

