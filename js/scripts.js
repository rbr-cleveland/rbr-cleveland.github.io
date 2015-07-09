//Page Preloader
jQuery(window).load(function() { 
	jQuery("#loader").delay(500).fadeOut(); 
	jQuery(".mask").delay(1000).fadeOut("slow");
});

jQuery(document).ready(function(){

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
	
	//Sticky Navigation		
	
	jQuery("#navigation").sticky({topSpacing:1});
	
	//Leaving Page Fade Out
    jQuery('a.external').click(function(){

        if( jQuery('.mask').length > 0 ){

            var url = jQuery(this).attr('href');

			jQuery('.mask').fadeIn(250, function(){
				document.location.href = url;
			});
		
			jQuery("#loader").fadeIn("slow");

            return false;
        }

 	});

});
	  
//Back To Top
jQuery(function() {
	jQuery('a#back-top').click(function () {
		jQuery('html, body').stop().animate({
				scrollTop: 0
			}, 1500,'easeInOutExpo');
		});
});
//Navigation Scrolling
jQuery(function() {
	jQuery('.nav a, .nav li a, #home-center a, a.move').bind('click',function(event){
		var $anchor = jQuery(this);
		
		jQuery('html, body').stop().animate({
		scrollTop: jQuery($anchor.attr('href')).offset().top -44
		}, 1500,'easeInOutExpo');
		
		event.preventDefault();
	});
});
	 
//PrettyPhoto
jQuery(function(){
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			  opacity: 0.5,
			  social_tools: "",
			  deeplinking: false
	});
});		
//Parallax	
jQuery(window).bind('load', function () {
	parallaxInit();						  
});
function parallaxInit() {
    jQuery('.parallax').each(function(){
        jQuery(this).parallax("30%", 0.1);
    });
}
//BxSlider
jQuery(document).ready(function(){
		
		var onMobile = false;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }
        var fullwidth_slider_auto  = true;
        var fullwidth_slider_speed = 1000;
        if( typeof FullwidthSliderOptions != 'undefined' ){
            fullwidth_slider_auto   = FullwidthSliderOptions.slider_auto;
            fullwidth_slider_speed  = FullwidthSliderOptions.slider_speed;
        }
		jQuery('.fullwidth-slider').bxSlider({
			mode: "fade",
			speed: 1000,
			pager: false,
            auto: fullwidth_slider_auto,
            pause: fullwidth_slider_speed,
			
			onSlideBefore: function(jQueryslideElement) {
				(jQueryslideElement).find('.slide-caption').fadeOut().animate({top:'100px'},{queue:false, easing: 'easeOutQuad', duration: 550});
				(jQueryslideElement).find('.slide-caption').hide().animate({top:'-100px'});
			},
			onSlideAfter: function(jQueryslideElement) {
				(jQueryslideElement).find('.slide-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'easeOutQuad', duration: 450});
			},
			
		});
		
		jQuery('.bx-wrapper .bx-controls-direction a').attr('data-500','top:83%; opacity: 0;').attr('data-start','top:50%; opacity: 1;');
		
		
		if( ( onMobile === false ) && ( jQuery('.parallax-slider').length ) ) {
		
			skrollr.init({
				edgeStrategy: 'set',
				smoothScrolling: false,
				forceHeight: false
			});
			
		}	
		
		
		
	    
		jQuery('.twitter-slider').bxSlider({
			controls: true, 
			pager: false,		
			auto:true,
			mode:'fade',
			pause: 3000,
		});
		
		
		jQuery('.clients-slider').bxSlider({
			pagerCustom: '#bx-pager',
			controls:false,
		});
		
		jQuery('.project-slider').bxSlider({
			controls: true, 
			pager: false,		
			auto:true,
			pause: 3000,
			preloadImages:'all',
		});
		
		jQuery('.blog-slider').bxSlider({
			controls: true, 
			pager: false,		
			auto:false,
			pause: 3000,
			preloadImages: 'visible',
            adaptiveHeight:true,
		});
        var text_slider_transition  = 'fade';
        var text_slider_speed       = 5000;
        if( typeof TextSliderOptions != 'undefined' ){
            text_slider_transition  = TextSliderOptions.slider_transition;
            text_slider_speed       = TextSliderOptions.slider_speed;
        }
		jQuery('.text-slide-vertical').bxSlider({
			controls: false,
			adaptiveHeight: true, 
			pager: false,		
			auto: true,
			mode: text_slider_transition,
			pause: text_slider_speed,
		});
        var page_title = jQuery('body');
        var block_intro = page_title.find('.block-intro');
        if( block_intro.length > 0 ) var block_intro_top = block_intro.offset().top;
        jQuery( window ).scroll(function() {
            var current_top = jQuery(document).scrollTop(); block_intro.css('top', (current_top*0.50)); block_intro.css('opacity', (1 - current_top/500));
        });
        ///// 1.2 /////
		if( jQuery('.our-team-new').length > 0 ){
		
			jQuery('.our-team-new').carouFredSel({
				width: '100%',
				height: 'auto',
				prev: '#prev3',
				next: '#next3',
				align: "center",
				scroll: 1,
				auto: false,
				visible: {
					min: 1,
					max: 5
				}
			});
		
		}
		if( jQuery('.new-service').length > 0 ){
		
			jQuery('.new-service').carouFredSel({
				width: '100%',
				height: 'auto',
				prev: '#prev1',
				next: '#next1',
				align: "center",
				scroll: 1,
				auto: false,
				visible: {
					min: 1,
					max: 5
				}
			});
		
		}
        // Radial Counters
        jQuery(".knob").knob({
            width: 140,
            height: 140,
            fgColor: '#222',
            inputColor: '#999',
            dynamicDraw: true,
            thickness: 0.15,
            tickColorizeValues: true,
            skin:'tron',
            readOnly:true,
        });
        jQuery(".knob").appear(function(e){
            var $this = jQuery(this);
            var myVal = $this.attr("rel");
            jQuery({value: 0}).animate({value: myVal}, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.val(Math.ceil(this.value)).trigger('change');
                }
            })
        });
        // Testimonial Sliders
        jQuery('.new-client-slider-image').flexslider({
            animation: "fade",
            directionNav:false,
            controlNav:false,
            smoothHeight: true,
            animationLoop:true,
            slideshowSpeed: 5000,
            slideToStart: 0,
        });
        jQuery('.new-client-slider-info').flexslider({
            animation: "slide",
            directionNav:true,
            controlsContainer:".new-client-nav",
            controlNav:false,
            smoothHeight: true,
            animationLoop:true,
            sync: ".new-client-slider-image",
            slideshowSpeed: 5000,
            slideToStart: 0,
        });
        // Contact Details Carousel
        var carousel = jQuery(".contact-details-slider");
		if( jQuery('.contact-details-slider').length > 0 ){
			jQuery('.contact-details-slider').carouFredSel({
				auto: false,
				width: '100%',
				height: 'variable',
				responsive: true,
				onCreate: function () {
					jQuery(window).on('resize', function () {
						carousel.parent().add(carousel).height(carousel.children().first().height());
					}).trigger('resize');
				},
				items: {
					height: 'auto',
				},
				scroll: {
					fx: 'scroll',
					onBefore: function( data ) {
						jQuery('.contact-icons-slider').trigger( 'slideTo', [ jQuery('.contact-icons-slider li[class='+ data.items.visible.attr( 'id' ) +']'), -1 ] );
					}
				}
			});
		}
		if( jQuery('.contact-icons-slider').length > 0 ){
		
			jQuery('.contact-icons-slider').carouFredSel({
				auto: false,
				items: {
					visible: 3,
					start: -1
				},
			});
		}

        jQuery('.contact-icons-slider li').click(function() {
            jQuery('.contact-details-slider').trigger( 'slideTo', [ jQuery('.contact-details-slider li[id='+ jQuery(this).attr( 'class' ) +']') ] );
            jQuery('.contact-icons-slider li').removeClass('active-icon');
            jQuery(this).addClass('active-icon');
        }).css( 'cursor', 'pointer' );

        jQuery('.hide-overlay').click(function() {
            jQuery(".map-overlay").toggleClass("overlay-hide");
            jQuery(".hide-overlay").toggleClass("show-overlay");
        });

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
        ///// end 1.2 /////
});  
//Navigation Dropdown
jQuery('.nav a.collapse_menu1').click(function () { jQuery(".nav-collapse").collapse("hide") });
jQuery('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
// Accordion
jQuery('dl.accordion dt').filter(':first-child').addClass('accordion-active');
jQuery('dd.accordion-content').filter(':nth-child(n+3)').addClass('hide');
	
jQuery('dl.accordion').on('click', 'dt', function() {
		jQuery(this)
			.addClass('accordion-active')
			.next()
				.slideDown(200)
				.siblings('dd.accordion-content')
					.slideUp(200)
			.prev()
				.removeClass('accordion-active');
});	
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
jQuery(window).load(function(){
	
	//Masonry Blog
	var $container = jQuery('.blog-posts-content');
	$container.isotope({
		masonry: { },
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false,
		},	
	});
	  
});	
jQuery(document).ready(function($){     
		
	// Portfolio Isotope
	var container = jQuery('#portfolio-wrap');	
		
	container.isotope({
			animationEngine : 'best-available',
		  	animationOptions: {
		     	duration: 200,
		     	queue: false
		   	},
			layoutMode: 'fitRows'
		});	
	jQuery('#filters a').click(function(){
			jQuery('#filters a').removeClass('active');
			jQuery(this).addClass('active');
			var selector = jQuery(this).attr('data-filter');
		  	container.isotope({ filter: selector });
	        setProjects();		
		  	return false;
		});
			
			
	function splitColumns() { 
			var winWidth = jQuery(window).width(), 
			columnNumb = 1;
            var portfolioColumns = 4;
            if( typeof PortfolioColumnsOptions != 'undefined' ){
                portfolioColumns = PortfolioColumnsOptions.columns_no;
            }
			if (winWidth > 1300) {
				columnNumb = portfolioColumns;
			} else if (winWidth > 1024) {
				columnNumb = 3;
            } else if (winWidth > 900) {
                columnNumb = 2;
			} else if (winWidth > 479) {
				columnNumb = 2;
			} else if (winWidth < 479) {
				columnNumb = 1;
			}
				
			return columnNumb;
	}		
			
	function setColumns() { 
			var winWidth = jQuery(window).width(), 
				columnNumb = splitColumns(), 
				postWidth = Math.floor(winWidth / columnNumb);
				
			container.find('.portfolio-item').each(function () { 
				jQuery(this).css( { 
					width : postWidth + 'px' 
				});
			});
	}		
			
	function setProjects() { 
		setColumns();
		container.isotope('reLayout');
	}		
			
	container.imagesLoaded(function () { 
		setColumns();
	});
			
		
	jQuery(window).bind('resize', function () { 
		setProjects();			
	});
});
//Expander Slider
function initBxModal() {
    jQuery('.project-slider').bxSlider({
		controls: true, 
		pager: false,		
		auto:true,
		pause: 3000,
		preloadImages:'all',
		adaptiveHeight:true,
		
	});
};
//FullScreen Slider
jQuery(function (){
    var fullscreen_slider_transition  = 'fade';
    var fullscreen_slider_speed       = 5000;
    if( typeof FullScreenSliderOptions != 'undefined' ){
        fullscreen_slider_transition  = FullScreenSliderOptions.slider_transition;
        fullscreen_slider_speed       = FullScreenSliderOptions.slider_speed;
    }
	jQuery('#fullscreen-slider').maximage({
		cycleOptions: {
			fx: fullscreen_slider_transition,
			speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
			timeout: fullscreen_slider_speed,
			prev: '#slider_left',
			next: '#slider_right',
			pause: 0,
			before: function(last,current){
				jQuery('.slide-content').fadeOut().animate({top:'100px'},{queue:false, easing: 'easeOutQuad', duration: 550});
				jQuery('.slide-content').fadeOut().animate({top:'-100px'});
			},
			after: function(last,current){
				jQuery('.slide-content').fadeIn().animate({top:'0'},{queue:false, easing: 'easeOutQuad', duration: 450});
			}	
			
			
					
		},
		
		
		
		onFirstImageLoaded: function(){
			jQuery('#cycle-loader').delay(800).hide();
			jQuery('#fullscreen-slider').delay(800).fadeIn('slow');
			jQuery('.slide-content').fadeIn().animate({top:'0'});
			jQuery('.slide-content a').bind('click',function(event){
				var jQueryanchor = jQuery(this);				
				jQuery('html, body').stop().animate({
				scrollTop: jQuery(jQueryanchor.attr('href')).offset().top -44
				}, 1500,'easeInOutExpo');				
				event.preventDefault();
				});			
		}
	});
	// Helper function to Fill and Center the HTML5 Video
	jQuery('video,object').maximage('maxcover');
	
	
	
	
	// To show it is dynamic html text
	
});
jQuery(window).load(function() {
	
	
	// Project Page Expander
	
	(function(){
	  
        var container = jQuery( "#project-page-holder" );
		var $items    = jQuery('#portfolio-wrap .open-project-link');
        index = $items.length;
		jQuery('#portfolio-wrap .open-project-link').click(function(){
	
		    if (jQuery(this).hasClass('active')){
		    }
            else{
                lastIndex = index;
		        index = jQuery(this).index();
		        $items.removeClass('active');
		        jQuery(this).addClass('active');
	
		        var myUrl = jQuery(this).find('.open-project').attr("href") + " .item-data";
	
		        jQuery('#project-page-data').animate({opacity:0}, 400,function(){
                    jQuery("#project-page-data").load(myUrl,function(e){
                        var jQueryhelper = jQuery('.helper');
					    var height = jQueryhelper.height();
					
					
					    jQuery('#project-page-data').css("min-height", height);
							
					    jQuery('.project-slider').css({'height' : ''});
					    jQuery('#maximage').css({'height' : ''});
						
					    jQuery('#maximage').maximage({
						            cycleOptions: {
							            fx: 'fade',
							            speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
							            timeout: 6000,
							            prev: '#arrow_left',
							            next: '#arrow_right',
							            pause: 1,
						            },
					    });
                        jQuery('#project-page-data').delay(400).animate({opacity:1}, 400);
				    }); // project page data load
		        }); //project page data
		    }
            jQuery('html, body').animate({ scrollTop: jQuery(".portfolio-bottom").offset().top -40}, 900);
            jQuery('#project-page-data').waitForImages({
                finished: function() {
                    //Project Page Open
                    jQuery('#project-page-holder').slideUp(600, function(){ jQuery('#project-page-data').css('visibility', 'visible');}).delay(1100).slideDown(1000,function(){
                        jQuery('#project-page-data').fadeIn('slow',function(){initBxModal();});
                        jQuery('.element_fade_in').each(function () {
                            jQuery(this).appear(function() {
                                jQuery(this).delay(100).animate({opacity:1,right:"0px"},1000);
                            });
                        });
                    });
                },
                waitForAll: true
            });
		    return false;
		  
		});
	
		//Project Page Close
		jQuery(document).on('click', '#project_close', function(event) {
		    jQuery('#project-page-data').animate({opacity:0}, 400,function(){
				
		        jQuery('#project-page-holder').delay(400).slideUp(400);
				
		    });
				
	        jQuery('html, body').delay(1000).animate({ scrollTop: jQuery(".portfolio-top").offset().top - 70}, 800);
		    $items.removeClass('active') ;
		  
		    return false;
				
		 });
	
	})();
});
jQuery(window).load(function() {
    if( jQuery("#all").length > 0 ){
        document.getElementById("all").click();
    }
    resizeNavigationMenu();
});
function resizeNavigationMenu(){
    jQuery('ul#nav.nav').find("li").each( function(){
        if( (jQuery(window).width() <= 1300) && (jQuery(window).width() >= 1000) ){
            if( (typeof jQuery(this).attr('data-threshold-margin-right') != 'undefined') && (jQuery(this).attr('data-threshold-margin-right') != '') ){
                var margin_right = jQuery(this).attr('data-threshold-margin-right') + 'px';
                jQuery(this).css('margin-right', margin_right);
            }
        }
        else{
            if( (typeof jQuery(this).attr('data-margin-right') != 'undefined') && (jQuery(this).attr('data-margin-right') != '') ){
                var margin_right = jQuery(this).attr('data-margin-right') + 'px';
                jQuery(this).css('margin-right', margin_right);
            }
        }
    });
}
jQuery( window ).resize(function() {
    resizeNavigationMenu();
});
// social sharing
var completed = 0;
if( jQuery('a.facebook-share').length > 0 || jQuery('a.twitter-share').length > 0 || jQuery('a.pinterest-share').length > 0) {
    ////facebook
    //load share count on load
    jQuery.getJSON("http://graph.facebook.com/?id="+ window.location +'&callback=?', function(data) {
        if((data.shares != 0) && (data.shares != undefined) && (data.shares != null)) {
            jQuery('.facebook-share a span.count, a.facebook-share span.count').html( data.shares );
        }
        else {
            jQuery('.facebook-share a span.count, a.facebook-share span.count').html( 0 );
        }
        completed++;
    });
    function facebookShare(){
        window.open( 'https://www.facebook.com/sharer/sharer.php?u='+window.location, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" )
        return false;
    }
    jQuery('.facebook-share').click(facebookShare);
    ////twitter
    //load tweet count on load
    jQuery.getJSON('http://urls.api.twitter.com/1/urls/count.json?url='+window.location+'&callback=?', function(data) {
        if((data.count != 0) && (data.count != undefined) && (data.count != null)) {
            jQuery('.twitter-share a span.count, a.twitter-share span.count').html( data.count );
        }
        else {
            jQuery('.twitter-share a span.count, a.twitter-share span.count').html( 0 );
        }
        completed++;
    });
    function twitterShare(){
        window.open( 'http://twitter.com/intent/tweet?text='+jQuery(".project-header h1 .text-large").text() +' '+window.location, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" )
        return false;
    }
    jQuery('.newave-social .twitter-share').click(twitterShare);
    ////pinterest
    //load pin count on load
    jQuery.getJSON('http://api.pinterest.com/v1/urls/count.json?url='+window.location+'&callback=?', function(data) {
        if((data.count != 0) && (data.count != undefined) && (data.count != null)) {
            jQuery('.pinterest-share a span.count, a.pinterest-share span.count').html( data.count );
        }
        else {
            jQuery('.pinterest-share a span.count, a.pinterest-share span.count').html( 0 );
        }
        completed++;
    });
    function pinterestShare(){
        var jQuerysharingImg = '';
        if ( (jQuery('#single-portfolio-featured-image').length > 0) && (jQuery('#single-portfolio-featured-image').attr('data-featured-img') != 'empty' )){
            jQuerysharingImg = jQuery('#single-portfolio-featured-image').attr('data-featured-img');
        }
        window.open( 'http://pinterest.com/pin/create/button/?url='+window.location+'&media='+jQuerysharingImg+'&description='+jQuery('.project-header h1 .text-large').text(), "pinterestWindow", "height=640,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" )
        return false;
    }
    jQuery('.newave-social .pinterest-share').click(pinterestShare);
}
//Collage Home Section
var page_title = jQuery('body');
var block_intro = page_title.find('#collage');
if( block_intro.length > 0 ) var block_intro_top = block_intro.offset().top;
jQuery( window ).scroll(function() {
    var current_top = jQuery(document).scrollTop(); var collage_height = jQuery(window).height(); block_intro.css('top', (current_top*0.50)); block_intro.css('opacity', (1 - current_top/collage_height*1.2));
});
jQuery.fn.bgscroll = jQuery.fn.bgScroll = function( options ) {
    if( !this.length ) return this;
    if( !options ) options = {};
    if( !window.scrollElements ) window.scrollElements = {};
    for( var i = 0; i < this.length; i++ ) {
        var allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var randomId = '';
        for( var l = 0; l < 5; l++ ) randomId += allowedChars.charAt( Math.floor( Math.random() * allowedChars.length ) );
        this[ i ].current = 0;
        this[ i ].scrollSpeed = options.scrollSpeed ? options.scrollSpeed : 70;
        this[ i ].direction = options.direction ? options.direction : 'h';
        window.scrollElements[ randomId ] = this[ i ];
        eval( 'window[randomId]=function(){var axis=0;var e=window.scrollElements.' + randomId + ';e.current += 1;if (e.direction == "h") axis = e.current + "px 0";else if (e.direction == "v") axis = "0 " + e.current + "px";else if (e.direction == "d") axis = e.current + "px " + e.current + "px";jQuery( e ).css("background-position", axis);}' );
        setInterval( 'window.' + randomId + '()', options.scrollSpeed ? options.scrollSpeed : 70 );
    }
    return this;
}
var scroll_speed = 5;
var scroll_direction = 'h';
if( typeof CollageBkndOptions != 'undefined' ){
    scroll_speed = CollageBkndOptions.scroll_speed;
    scroll_direction = CollageBkndOptions.scroll_direction;
}
jQuery('#collage').bgscroll({scrollSpeed:scroll_speed , direction:scroll_direction });
function animUp() {
    jQuery("#arrow").animate({
        top: "-3px"
    }, "slow", "swing", animDown);
}
function animDown() {
    jQuery("#arrow").animate({
        top: "3px"
    }, "slow", "swing", animUp);
}
jQuery(document).ready(function() {
    animUp();
});
