//Page Preloader
jQuery(window).load(function() {
	jQuery("#loader").delay(500).fadeOut();
	jQuery(".mask").delay(1000).fadeOut("slow");
});

jQuery(document).ready(function(){

	$('#navigation-1').localScroll();

	if( jQuery('#maximage-external').length > 0 ){

		jQuery('#maximage-external').maximage({
            cycleOptions: {
				fx: 'fade',
	            speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
	            timeout: 6000,
	            prev: '#arrow_left',
	            next: '#arrow_right',
	            pause: 1,
            },
		});

	}

  $('.navbar-collapse .nav a').on('click', function(){
    $(".navbar-collapse").collapse('hide'); //bootstrap 3.x by Richard
  });

	$('#accordion').on('show.bs.collapse', function (e) {
 			$(e.target.previousElementSibling).find('span.fa').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
	});
	$('#accordion').on('hide.bs.collapse', function (e) {
			$(e.target.previousElementSibling).find('span.fa').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
	});


	//Sticky Navigation
	//
	// // jQuery("#navigation").sticky({topSpacing:1});
	//
	// //Leaving Page Fade Out
  //   jQuery('a.external').click(function(){
	//
  //       if( jQuery('.mask').length > 0 ){
	//
  //           var url = jQuery(this).attr('href');
	//
	// 		jQuery('.mask').fadeIn(250, function(){
	// 			document.location.href = url;
	// 		});
	//
	// 		jQuery("#loader").fadeIn("slow");
	//
  //           return false;
  //       }
	//
 // 	});

});

//Back To Top
jQuery(function() {
	jQuery('a#back-top').click(function () {
		jQuery('html, body').stop().animate({
				scrollTop: 0
			}, 1500,'easeInOutExpo');
		});
});
// //Navigation Scrolling
// jQuery(function() {
// 	jQuery('.nav a, .nav li a, #home-center a, a.move').bind('click',function(event){
// 		var $anchor = jQuery(this);

// 		jQuery('html, body').stop().animate({
// 		scrollTop: jQuery($anchor.attr('href')).offset().top -44
// 		}, 1500,'easeInOutExpo');

// 		event.preventDefault();
// 	});
// });

// //PrettyPhoto
// jQuery(function(){
// 	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
// 			  opacity: 0.5,
// 			  social_tools: "",
// 			  deeplinking: false
// 	});
// });
//Parallax
jQuery(window).bind('load', function () {
	parallaxInit();
});
function parallaxInit() {
    jQuery('.parallax').each(function(){
        jQuery(this).parallax("30%", 0.1);
    });
}

// //Navigation Dropdown
// jQuery('.nav a.collapse_menu1').click(function () { jQuery(".nav-collapse").collapse("hide") });
jQuery('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });


// Tabs
jQuery(".tab_container").hide(); //Hide all content
jQuery("ul.tabs li:first").addClass("tab-active").show(); //Activate first tab
jQuery(".tab_container:first").show(); //Show first tab content

jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("tab-active"); //Remove any "active" class
		jQuery(this).addClass("tab-active"); //Add "active" class to selected tab
		jQuery(".tab_container").hide(); //Hide all tab content
		var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active content
		return false;
});
// Toggle
jQuery(".toggle_container").hide();
jQuery("span.toggle-title").click(function(){
		jQuery(this).toggleClass("toggle-active").next().slideToggle("normal");
		return false;
});
jQuery(document).ready(function(){
		//Elements Fading
		jQuery('.element_from_top').each(function () {
			jQuery(this).appear(function() {
			  jQuery(this).delay(150).animate({opacity:1,top:"0px"},1000);
			});
		});

		jQuery('.element_from_bottom').each(function () {
			jQuery(this).appear(function() {
			  jQuery(this).delay(150).animate({opacity:1,bottom:"0px"},1000);
			});
		});


		jQuery('.element_from_left').each(function () {
			jQuery(this).appear(function() {
			  jQuery(this).delay(150).animate({opacity:1,left:"0px"},1000);
			});
		});


		jQuery('.element_from_right').each(function () {
			jQuery(this).appear(function() {
			  jQuery(this).delay(150).animate({opacity:1,right:"0px"},1000);
			});
		});

		jQuery('.element_fade_in').each(function () {
			jQuery(this).appear(function() {
			  jQuery(this).delay(150).animate({opacity:1,right:"0px"},1000);
			});
		});
		//Animated Progress Bars
		jQuery('.bar li').each(function () {
			jQuery(this).appear(function() {
			  jQuery(this).animate({opacity:1,left:"0px"},1200);
			  var b = jQuery(this).find("span").attr("data-width");
			  jQuery(this).find("span").animate({
				width: b + "%"
			  }, 1700, "easeOutCirc");
			});
		});
		//Animated Counters
		jQuery('.counters').each(function () {
			jQuery(".timer .count").appear(function() {
			var counter = jQuery(this).html();
			jQuery(this).countTo({
				from: 0,
				to: counter,
				speed: 2000,
				refreshInterval: 60,
				});
			});
		});

		//Fading Out AlertBox
		jQuery('.shortcode_alertbox').find('.box_close').click(function(){
			jQuery(this).parents('.alertboxes').animate({opacity:0},300).animate({height:"0px"});
		});
});
