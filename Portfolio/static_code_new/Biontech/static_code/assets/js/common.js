/* ==================================
	input event
==================================== */
//숫자만 return
function onlyNum(str) {
	var value = str + '';
	while (value.includes(',')) {
		value = value.replace(',');
	}
	value = value.replace(/[^0-9]/gi, '')
	return Number(value) + '';
}

function setComma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function unComma(str) {
	str = String(str);
	return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat(obj) {
	obj.value = setComma(unComma(obj.value));
}

// 숫자만 입력 onkeydown
function numKeyDown() {
	var key = Number(event.which);
	if (event.shiftKey || key < 48 || (key > 57 && key < 96) || key > 105) {
		if (key == 8 || key == 35 || key == 36 || key == 37 || key == 39 || key == 46) {
		} else {
			event.preventDefault();
			event.returnValue = false;
		}
	}
}
// 숫자+콤마(한글제거) onkeyUp
function numCommaKeyUp() {
	var tar = $(event.target);
	$(tar).val(setComma(onlyNum($(tar).val())));
}

// 음수+콤마(한글제거) onkeyUp
function minusNumCommaKeyUp() {
	var tar = $(event.target);
	var str = tar.val();
	str = str.replace('[^0-9]', '');
	$(tar).val('-' + setComma(str));
}

// 숫자(한글제거) onkeyUp
function numKeyUp() {
	var tar = $(event.target);
	$(tar).val(onlyNum($(tar).val()));
}

//숫자(한글제거) 양수만 onkeyUp 
function numKeyPlusUp() {
	var tar = $(event.target);
	if(tar.val()==0){
		tar.val(1);
	}
	$(tar).val(onlyNum($(tar).val()));
	
}


// 전화번호 포맷, onkeyup="$(this).val(phoneFormat($(this).val()));"
function phoneFormat(num) {
	num = num.replace(/[^0-9]/gi, '');
	var formatNum;
	if (num.indexOf('02') == 0) {
		if (num.length < 3) {
			formatNum = num;
		} else if (num.length > 6) {
			formatNum = num.replace(/(02)(\d{1,4})(\d{4,})/, '$1-$2-$3');
		} else {
			formatNum = num.replace(/(02)(\d{0,})/, '$1-$2');
		}
	} else if (num.length < 3) {
		formatNum = num;
	} else if (num.length > 7) {
		if (num.indexOf('1') == 0) {
			formatNum = num.replace(/(\d{4})(\d{1,})/, '$1-$2');
		} else {
			formatNum = num.replace(/(\d{3})(\d{1,4})(\d{4,})/, '$1-$2-$3');
		}
	} else {
		formatNum = num.replace(/(\d{3})(\d{1,})/, '$1-$2');
	}
	return formatNum;
}
// 사업자번호 (매개변수 col==해당input name값)
function checkCompanyID(col) {
	var str = $('input[name=' + col + ']').val();
	str = str.replace(/[^0-9]/g, '');
	var tmp = '';
	if (str.length < 4) {
		tmp = str;
	} else if (str.length < 6) {
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3);
	} else {
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 2);
		tmp += '-';
		tmp += str.substr(5, 5);
	}
	return $('input[name=' + col + ']').val(tmp);
}

//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function selectAddress(string) {
    new daum.Postcode({
        oncomplete: function(data) {
        	var addr = data.sido + ' ' + data.sigungu;
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById(string+'post').value = data.zonecode; // 우편번호
            document.getElementById(string+"addr1").value = data.jibunAddress; // 지번
            document.getElementById(string+"addr2").value = data.roadAddress; // 도로명
//            document.getElementById(string+"addr").value = addr; // 전산용 주소
        }
    }).open();
}

function loginCheck() {
	var ses_chk = true;
	$.ajax({
		url : "checkLoginSession.ajax",
		async: false,
		success : function(data) {
			console.log(data)
			if (data == "fail") { // 로그인 세션값 없음
				ses_chk = false;
			}
		},
		error : function(data, status, er) {
			alert("error: " + data + " status: " + status + " er:" + er);
		}
	});
	
	return ses_chk;
}

$(document).ready(function() {
	var file = $('#file');
	
	file.on('change', function(){
		if(window.FileReader) {
			var filename = $(this)[0].files[0].name;
		} else {
			var file=$(this).val().split('/').pop().split('\\').pop();
		}
		
		$(this).siblings('#file_name').text(filename);
	})
});



function openURL(url){
	cw = screen.availWidth;
	ch = screen.availHeight;

	sw=700;    //띄울 창의 넓이
	sh=600;    //띄울 창의 높이

	ml = (cw - sw) / 2;
	mt = (ch - sh) / 2;
	window.open(url+".do", url, 'width=' + sw + ',height=' + sh + ',top=' + mt+ ',left=' + ml + ',resizable=no, scrollbars=yes');
}

/* ===================================
레이어 팝업
====================================== */
if($('.layerModal').length > 0){
$('body').append('<div class="overlayBg"></div>');
}
var overlay = $('.overlayBg');
overlay.hide();
function openModal(obj){
var layer = $(obj);
overlay.show();
layer.show();
$('html, body').css({'overflow':'hidden'});

return false;
}

//모달창 닫기
function closeModal(obj){
var layer = $(obj);
overlay.hide();
layer.hide();
$('html, body').css({'overflow':'auto'});

return false;
}


//쿠키설정
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//쿠키생성
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
//탑 배너 하루종일 닫기
function topCloseToday(){
	if($("input[name='top_today_close']").is(":checked") ==true){
		setCookie("close_banner","Y",1);
	}else{
		setCookie("close_banner","Y",0);
	}
}

// 팝업 하루종일 닫기
function popupTodayClose(){
	if($("input[name='layerCheck1']").is(":checked") ==true){
		setCookie("close_popup","Y",1);
	}else{
		setCookie("close_popup","Y",0);
	}
}

//탑 배너 닫기
function topBannerclose(){
	if(screen.availWidth <= 991){
		setCookie("close_banner","Y",1);
	}
	$("#topBanner").css("display", "none");
	$(".main-banner-sec").css({top:"0px"});
	$("body").css({'padding-top':"0px"});
}