new WOW().init();


(function ($) {
	"use strict";
		
	$(window).on('load', function () {
		if ($('#preloader').length) {
		  $('#preloader').delay(100).fadeOut('slow', function () {
			$(this).remove();
		  });
		}
	  });
	
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function() {
		if( ! $('#mainNav').hasClass('navbar-reduce')) {
		  $('#mainNav').addClass('navbar-reduce');
		}
	  })

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-close').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	})

	
	
    // SMOOTHSCROLL
    $(function() {
		$('.def-nav a, #home a').on('click', function(event) {
		  var $anchor = $(this);
			$('html, body').stop().animate({
			  scrollTop: $($anchor.attr('href')).offset().top-49
			}, 2000);
			  event.preventDefault();
		});
	  });  
  

	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(3500, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(3500, "easeInOutExpo");
		}
	});

    $('#testimonial-carousel').owlCarousel({
		loop: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeInUp',
		autoplay: true,
		margin: 30,
		responsive: {
			0: {  
				items: 1,
			},
			769: {
				items: 2,
			},
			992: {
				items: 3, 
			}
		}
	});

	
	
})(jQuery);