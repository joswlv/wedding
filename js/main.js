;(function () {
	
	'use strict';

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	var shuffleSpecialThanks = function() {
		var items = $("#fh5co-special-thanks").find(".item");
		items = shuffle(items);
		$("#special-thanks-items").html(items)
	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			gaEvent('common', 'click', 'go_to_top');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var goToMap = function() {

		$('.js-gomap').on('click', function(event){
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $("#map").offset().top
			}, 500, 'easeInOutExpo');

			gaEvent('map', 'click', 'go_to_map');

			return false;
		});
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	//PhotoSwipe
	var initGallery = function() {
		var gallery0 = {
			"#gallery_1": [
				{
					src: 'images/gallery_1.jpg',
					w: 3265,
					h: 4898
				}
			]
		};

		var gallery1 = {
			"#gallery_2": [
				{
					src: 'images/gallery_2.jpg',
					w: 3237,
					h: 5007
				}
			]
		};

		var gallery2 = {
			"#gallery_3": [
				{
					src: 'images/gallery_3.jpg',
					w: 3249,
					h: 4923
				}
			]
		};

		var gallery3 = {
			"#gallery_4": [
				{
					src: 'images/gallery_4.jpg',
					w: 3265,
					h: 4898
				}
			]
		};

		var gallery4 = {
			"#gallery_5": [
				{
					src: 'images/gallery_5.jpg',
					w: 3265,
					h: 4898
				}
			]
		};

		var gallery5 = {
			"#gallery_6": [
				{
					src: 'images/gallery_6.jpg',
					w: 3142,
					h: 5092
				}
			]
		};

		var galleryList = [gallery0, gallery1, gallery2, gallery3, gallery4, gallery5];

		for(var i = 0; i < galleryList.length; i++) {
			var gallery = galleryList[i];
			var galleryId = Object.keys(gallery)[0];
			$(galleryId).on("click", {items : gallery[galleryId]}, function(e) {
				e.preventDefault();

				// build items array
				var items = e.data.items;

				openPhotoSwipeView(items);

				gaEvent('gallery', 'click', e.currentTarget.id);

				return false;
			});

		}
	};

	function openPhotoSwipeView(items) {
		var pswpElement = document.querySelectorAll('.pswp')[0];

		// define options (if needed)
		var options = {
			// optionName: 'option value'
			// for example:
			index: 0 // start at first slide
		};

		// Initializes and opens PhotoSwipe
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();

	}

	var initKakaoMap = function() {
		var HOME_PATH = window.HOME_PATH || '.';

		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    		mapOption = { 
			center: new kakao.maps.LatLng(37.5261600757218, 127.042301232111), // 지도의 중심좌표
			level: 4 // 지도의 확대 레벨
		};

		var map = new kakao.maps.Map(mapContainer, mapOption); 

		var imageSrc = HOME_PATH + '/images/heart_marker_coral.png',
			imageSize = new kakao.maps.Size(50, 69),
			imageOption = {offset: new kakao.maps.Point(27, 69)};
		
		var parkingImgSrc = HOME_PATH + '/images/parking_icon.png',
			parkingImgSize = new kakao.maps.Size(30,38),
			parkingImgOption = {offset: new kakao.maps.Point(27, 38)};

		var parkingMarkerImg = new kakao.maps.MarkerImage(parkingImgSrc, parkingImgSize, parkingImgOption),
			parkingMarkerPosition = new kakao.maps.LatLng(37.5249298061868, 127.045793906426);
			
		var hallMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
			hallMarkerPosition = new kakao.maps.LatLng(37.5261600757218, 127.042301232111);

		var parkingMarker = new kakao.maps.Marker({
			position: parkingMarkerPosition,
			image: parkingMarkerImg
		});

		var hallMarker = new kakao.maps.Marker({
			position: hallMarkerPosition, 
			image: hallMarkerImage 
		});
		
		parkingMarker.setMap(map);
		hallMarker.setMap(map);

		// var markers = [
		// 	{
		// 		position: hallMarkerPosition,
		// 		image: hallMarkerImage
		// 	},
		// 	{
		// 		position: parkingMarkerPosition, 
		// 		image: parkingMarkerImg,
		// 		text: '셔틀버스운행'
		// 	}
		// ];
		
		// var staticMapContainer  = document.getElementById('map'),
		// 	staticMapOption = { 
		// 		center: hallMarkerPosition,
		// 		level: 4,
		// 		marker: markers
		// 	};    
		
		// var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
	};

	var initCountDown = function() {
		var d = new Date('2019-09-29T12:00:00');// Jan is 0, Dec is 11

		var onEnd = function() {
			$('.simply-countdown').hide();
			$('.just-married').show();
		};

		simplyCountdown('.simply-countdown-one', {
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			day: d.getDate(),
			hours: d.getHours(),
			minutes: d.getMinutes(),
			enableUtc: true,
			onEnd: onEnd
		});
	};

	var addTimelinePopupEvent = function() {
		$(".photo-viewer").on("click", function (e) {
			e.preventDefault();

			var image = $(this).attr('data-image');
			var width = $(this).attr('data-width');
			var height = $(this).attr('data-height');

			var items = [{
				src: image,
				w: width,
				h: height
			}];


			openPhotoSwipeView(items);

			var split = image.split("/");
			var fileName = split[split.length - 1];

			gaEvent('photoviewer', 'click', fileName);

			return false;
		});
	};

	function gaEvent(category, action, label) {
		ga('send', 'event', {
			eventCategory: category,
			eventAction: action,
			eventLabel: label
		});
	}

	
	$(function(){
		parallax();
		contentWayPoint();
		dropdown();
		shuffleSpecialThanks();
		testimonialCarousel();
		goToTop();
		goToMap();
		loaderPage();
		counter();
		counterWayPoint();
		initGallery();
		initKakaoMap();
		initCountDown();
		addTimelinePopupEvent();
	});


}());