$(function(){
	mainSlider();
});

function isIE(){
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){ // If Internet Explorer, return version number
        return true;
    }else{ // If another browser, return 0
        return false;
    }
}

$(document).ready(function(){
	flag = false;
	var setting = {
	    mode:'vertical',
	    speed: 300,
	    auto: false,
	    autoControls: false,
	    infiniteLoop: false,  
	    controls: true,
	    autoHover: false,
	    pager: false,			
	}
	
	if(!flag){
		flag = true;
		categorySlide = $('.category-slide').bxSlider(setting);
	}	
	
	//이벤트 배너슬라이드	
	$('.section-banner').bxSlider({
		mode :'vertical',
		auto: true,
		speed: 300, 
	    autoHover: false,  
		infiniteLoop: true,  
		pager : true,
		controls : false
	});
	
	//이벤트 배너슬라이드	
	$('.mo-section-banner').bxSlider({
		mode :'horizontal',
		auto: true,
		speed: 300, 
	    autoHover: false,  
		infiniteLoop: true,  
		pager : true,
		controls : false
	});
	
	$('.prod-list').imagesLoaded(function(){
		prodListSlider();	
	});
	// 브랜드 슬라이드
	$('.scroller').simplyScroll({});
});
/* ===================================
	load
====================================== */
$(window).load(function(){
	$('.prod-list').imagesLoaded(function(){
		prodListSlider();	
	});
});

if (isIE()){
	setTimeout(function(){
		$(document).imagesLoaded(function(){
			prodListSlider();		
			mainSlider();
		});
	},300);
}

function mainSlider(){
	// 메인 배너슬라이드	
	$('.main-slider').css({visibility:'visible',opacity:'1'});
	$('.main-slider').slick({
   		dots: true,
   		arrows: true,
   		infinite: true,
   		autoplay: true,
   		draggable: true,
   		speed: 300,
   		slidesToScroll: 1
   	});    
}

// 신상품 슬라이드
function prodListSlider(){
   	$('.prod-slider').not('.slick-initialized').slick({
   		dots: true,
   		arrows: true,
   		infinite: true,
   		speed: 600,
   		slidesToShow: 4,
   		slidesToScroll: 4,
   		responsive: [{
   			breakpoint: 1199,
   			settings: {
   				slidesToShow: 3,
   				slidesToScroll: 3
   			},
   		},
   		{
   			breakpoint: 991,
   			settings: {
   				slidesToShow: 2,
   				slidesToScroll: 2
   			},
   		},
   		{
   			breakpoint: 767,
   			settings: {
   				slidesToShow: 2,
   				slidesToScroll: 2
   			}, 
   		}]     
   	});     
}

//베스트 메뉴 클릭
function bestChange(idx) {
	//상품 불러오기
	$("#best_product_list").load("main_bestProductList.ajax?idx="+idx);
	
	//메뉴 active 변경
	$("ul.category-best > li").removeClass("active");
	$("#best_menu_"+idx).addClass("active");
}