function isIES(){
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){ // If Internet Explorer, return version number
        return true;
    }else{ // If another browser, return 0
        return false;
    }
}
/*==============================
ready
================================*/ 
$(document).ready(function(){
	$window = $(window).width();
	$minheight = $(window).height();
	flag = false;
	
	Common.toggleMenu();
	Common.categorySort();
	//플로팅메뉴
	if($('.floating_menu').length > 0){
		Common.floatingMenu();
	}
	
	Common.categorayBtn();
	Common.allCategorayBtn();
});

/*==============================
load
================================*/ 
$(window).load(function(){
	
	if (isIES()){
		setTimeout(function(){
			Common.headerSlide();
		},300);
	}else{
		Common.headerSlide();
	}	

});

var Common = {
	categorayBtn : function(){
		//전체카테고리
		$('#gnbBtn').click(function(){
			if($(this).hasClass('open') == true){
				$(this).removeClass('open');
				$('.category-wrap').css({'display':'none'});
				$('.sort-filter-area').css({'display':'none'});
			}else{
				$(this).addClass('open');
				$('.category-wrap').css({'display':'block'});
				$('.sort-link-area > li > a').removeClass('active').css({'background-color':'#2D96CD','color':'#fff','border-color':'rgba(255,255,255,.1)'});
				
				var setting = {
			        mode:'vertical',
			        speed: 300,
			        auto: false,
			        autoControls: false,
			        infiniteLoop: true,  
			        controls: true,
			        autoHover: false,
			        pager: false,			
				}
				
				if(!flag){
					flag = true;
					categorySlide = $('.category-slide').bxSlider(setting);
			    }
				
			}//else		
		});	
	},
	allCategorayBtn : function(){
		//ALL 전체카테고리
		$('#gnbBtnAll').click(function(){
			if($(this).hasClass('open') == true){
				$(this).removeClass('open');
				$('.all-category-wrap').css({'display':'none'});
			}else{
				$(this).addClass('open');
				$('.all-category-wrap').css({'display':'block'});
			}//else		
		});	
	},
	allCategorayClose : function(){
		$('#gnbBtnAll').removeClass('open');
		$('.all-category-wrap').css({'display':'none'});
	},
	//헤더 제품 슬라이드
	headerSlide : function(){
		var slider=$('.header-slider').bxSlider({
    		auto: true,
    		mode: 'horizontal', 
    		moveSlides: 1,
    		slideWidth: 190,
    		minSlides: 1,
    		maxSlides: 1,
    		infiniteLoop: true,  
    		speed: 500, 
    		pager : false,
    		controls : true,
    		onSliderLoad: function(){
    			$(".header-slider").css({"visibility":"visible",'opacity':'1'});
    		}
    	});
	},
	//서브메뉴 호버 이벤트
	categorySort : function(){
		//카테고리 호버	
		$(document).on('mouseenter','.sort-link-area > li',function(){
			var sub = $(this).children('.sort-filter-area');
			
			if(sub.length > 0){
				$('.category-sort .bx-viewport').addClass('important');
			}else{
				$('.category-sort .bx-viewport').removeClass('important');
			}
			
			$('.sort-link-area > li > a').removeClass('active').css({'background-color':'#2D96CD','color':'#fff','border-color':'rgba(255,255,255,.1)'});
			$(this).children('a').addClass('active').css({'background-color':'#EEE','color':'#102B4E'});
			
			$('.sort-filter-area').css({display:'none'});
			sub.css({display:'block'});
		});
		
		$(document).on('mouseleave','.sort-link-area > li',function(){
			var sub = $(this).children('.sort-filter-area');
			
			$('.category-sort .bx-viewport').removeClass('important');

			$('.sort-link-area > li > a').removeClass('active').css({'background-color':'#2D96CD','color':'#fff','border-color':'rgba(255,255,255,.1)'});
			$('.sort-filter-area').css({display:'none'});
		});
	},
	//toggle submenu
	toggleMenu : function(){
		$(document).on('click','.toggle',function(){
			var $this = $(this);
			var $sortFilter = $this.next('.sort-filter-area');
			
			if($this.hasClass('open') == true){
				$this.removeClass('open');
				$sortFilter.css({'display':'none'});

				$('.sort-link-area > li > a').removeClass('active');
			}else{
				$('.toggle').removeClass('open');
				$('.sort-filter-area').css({'display':'none'});
				
				$this.addClass('open');
				$this.parent('a').addClass('active');
				$sortFilter.css({'display':'block'});					
			}
		});
	},
	//카테고리 열기	
	openGnbBtn : function(){
		$('.category-wrap, .mo-utile-menu').css({'display':'block'});
		$('html, body').css({"position":"fixed","width":"100%","overflow-y":"hidden"});
	},
	//카테고리 닫기
	closeGnbBtn : function(){
		$('.category-wrap, .mo-utile-menu').css({'display':'none'});
		$('html, body').css({"position":"static","overflow-y":"auto"});		
	},
	//카테고리 여백 닫기
	closeArea : function(){

		if($('#gnbBtn').hasClass('open') == true){
			$('#gnbBtn').removeClass('open');
			$('.category-wrap').css({'display':'none'});
			$('.sort-filter-area').css({'display':'none'});
			$('html, body').css({"position":"static","overflow-y":"auto"});
		}else{}
	},
	floatingMenu : function(){
		$(window).scroll(function(){
			var scrollY = $(this).scrollTop();
			var menuY = $('section:first').offset().top;
			
			if(scrollY > menuY){
				$('.floating_menu').addClass('fix');
			}else{
				$('.floating_menu').removeClass('fix');
			}
		});	
	},
	screenTop : function(){
		$('html, body').stop().animate({'scrollTop':'0'},600);
	}
}
/*==============================
layerModal
================================*/ 
if($('.layerModal').length > 0){
	$('body').append('<div class="overlayBg"></div>');
}
var overlay = $('.overlayBg');
overlay.hide();
//overlay.show();

function openModal(layer){
	$(layer).show();
	overlay.show();
	$('html, body').css({"overflow-y":"hidden"});
	
	return false;
}

function closeModal(layer){
	$(layer).hide();
	overlay.hide();
	$('html, body').css({"overflow-y":"auto"});	
	
	return false;
}

/*==============================
Control
================================*/
//파라미터
function getParams(fname){
	var formObj=document.forms[fname];
	var flength=formObj.length;
	var param='';
	for(var i=0;i<flength;i++){
		if(formObj[i]==null||formObj[i].name==''){
			continue;
		}
		var val=formObj[i].value;
		val=encodeURIComponent(val);
		param+=formObj[i].name+'='+val+'&';
	}
	param=param.substr(0,param.length-1);
	return param;
}

//숫자만
function onlyNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ){ 
		return;
	}else{
		return false;
	}	
}

//char삭제
function noChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	var num = /[^0-9]/g;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ){ 
		return;
	}else{
		event.target.value = event.target.value.replace(num, "");
	}
}

//한글입력불가
$(".notHangul").keyup(function(event){
	if (!(event.keyCode >=37 && event.keyCode<=40)) {
		if(event.keyCode!=16 && event.keyCode!=50 && event.keyCode!=110){
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z0-9@.]/gi,''));
		}
    }
});

//한글만 가능
/*$(".onlyHangul").keyup(function(event){
    if (!(event.keyCode >=37 && event.keyCode<=40)) {
        var inputVal = $(this).val();
        $(this).val(inputVal.replace(/[a-z0-9]/gi,''));
    }
});*/

//쿠키가져오기
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

// 쿠키설정
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//휴대폰번호 하이픈
function autoHipenTel(obj) {
	var str = $(obj).val();
	str = str.replace(/[^0-9]/g, '');
	var tmp = '';
	if( str.length < 4){
		tmp = str;
	} else if(str.length <= 4){
		if(str.indexOf('02') == 0) {
			tmp += str.substr(0, 2);
			tmp += '-';
			tmp += str.substr(2);
		} else if(str.indexOf('010') == 0 || str.indexOf('070') == 0) {
			tmp += str.substr(0, 3);
			tmp += '-';
			tmp += str.substr(3);
		} else if(str.indexOf('031') == 0 || str.indexOf('032') == 0 || str.indexOf('033') == 0 || str.indexOf('051') == 0 || str.indexOf('052') == 0 || str.indexOf('053') == 0 || str.indexOf('054') == 0 || str.indexOf('055') == 0 || str.indexOf('041') == 0 || str.indexOf('042') == 0 || str.indexOf('043') == 0 || str.indexOf('044') == 0 || str.indexOf('061') == 0 || str.indexOf('062') == 0 || str.indexOf('063') == 0 || str.indexOf('064') == 0) {
			tmp += str.substr(0, 3);
			tmp += '-';
			tmp += str.substr(3);
		} else {
			tmp += str.substr(0, 4);
		}
	} else if(str.length <= 7){
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3);
	} else if(str.length == 8){
		tmp += str.substr(0, 4);
		tmp += '-';
		tmp += str.substr(4);
	} else if(str.length == 9){
		tmp += str.substr(0, 2);
		tmp += '-';
		tmp += str.substr(2, 3);
		tmp += '-';
		tmp += str.substr(5);
	} else if(str.length == 10){
		if(str.indexOf('02') == 0) {
			tmp += str.substr(0, 2);
			tmp += '-';
			tmp += str.substr(2, 4);
			tmp += '-';
			tmp += str.substr(6);
		} else {
			tmp += str.substr(0, 3);
			tmp += '-';
			tmp += str.substr(3, 3);
			tmp += '-';
			tmp += str.substr(6);
		}
	} else if(str.length == 12){ //인터넷 팩스번호
			tmp += str.substr(0, 4);
			tmp += '-';
			tmp += str.substr(4, 4);
			tmp += '-';
			tmp += str.substr(8);
		
	} else {				
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 4);
		tmp += '-';
		tmp += str.substr(7);
	}
	$(obj).val(tmp);
}
//간편상담신청
function applyCounsel(){
	var hp = $("#hp").val();
	if(hp == ''){
		alert("휴대폰 번호를 입력해 주십시오.");
		return false;
	}
	if(!$('#agree').is(':checked')) {
	   alert("개인정보 수집 및 이용에 동의해주십시오.");
	   $('#agree').focus();
	   return false;
	}
	
	document.counselForm.action="./counsel.do";
	document.counselForm.submit();
}

//약관내용 팝업
function termsPopup(page){
	var SW = screen.availWidth;
	var SH = screen.availHeight;
	
	var width = 530;
	var height = screen.height/2;
	
	var left = (SW-width)/2;
	var top = (SH-height)/2;
	
	window.open(page+'.do','terms1', 'width='+width+', height='+height+', left='+left+', top='+top+', toolbar=no, scrollbars=yes, resizable=yes');
}