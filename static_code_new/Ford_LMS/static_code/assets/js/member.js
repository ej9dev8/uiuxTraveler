//회원가입
function validation(){
	var id = document.getElementById('id');
	var idChecked = document.getElementById('idChecked');
	var name = document.getElementById('name');
	var pw = document.getElementById('pw');
	var pwCheck = document.getElementById('pwCheck');
	var hp1 = document.getElementById('hp1');
	var hp2 = document.getElementById('hp2');
	var hp3 = document.getElementById('hp3');
	var email1 = document.getElementById('email1');
	var email2 = document.getElementById('email2');
	var address1 = document.getElementById('address1');
	var address2 = document.getElementById('address2');
	var address3 = document.getElementById('address3');
	
	if(id.value==""){
		alert("아이디를 입력해주십시오.");
		id.focus();
		return false;
	}
	for(i=0;i<pw.value.length;i++){//비밀번호에 숫자 들어가는지 확인
		var str = pw.value.charAt(i);
		if(str >= 48 || str <= 57){
			i_2 = 1;
		}
	}
	if(pw.value==""){
		alert("비밀번호를 입력해주십시오.");
		pw.focus();
		return false;
	}
	if(i_2 != 1){
		alert("비밀번호에는 숫자가 포함되어야 합니다.");
		pw.focus();
		return false;
	}
	
	if(pw.value.length < 4){
		alert("비밀번호는 4자리 이상이어야 합니다.");
		pw.focus();
		return false;
	}

	if(pwCheck.value==""){
		alert("비밀번호 확인란에 비밀번호를 입력해주십시오.");
		pwCheck.focus();
		return false;
	}

	if(!pw.value==pwCheck.value){
		alert("비밀번호가 일치하지 않습니다. 비밀번호 확인란을 다시 확인해 주십시오.");
		pwCheck.focus();
		return false;
	}
	if(name.value==""){
		alert("이름을 입력해주십시오.");
		name.focus();
		return false;
	}	
	var i;
	var i_1;
	var i_2;
	for(i=0;i<name.value.length;i++){//이름에 숫자 들어가는지 확인
		var str_1 = name.value.charAt(i);
		if(str_1 >= 48 || str_1 <= 57){
			i_1 = 1;
		}
	}
	var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; 
	if(special_pattern.test(name.value) || i_1 == 1 || name.value.length<2){ 
		alert("이름을 다시 확인해주십시오.");
		name.focus();
		return false;
	}
	if(hp2.value==""){
		alert("휴대폰 번호의 두번째 자리가 입력되지 않았습니다.");
		hp2.focus();
		return false;
	}
	if(hp3.value==""){
		alert("휴대폰 번호의 세번째 자리가 입력되지 않았습니다.");
		hp3.focus();
		return false;
	}
	if (hp2.length < 4 || hp3.length < 4) {
		alert("휴대폰 번호를 정확히 입력해주십시오.");
		return false;
	}
	if(email1.value==""){
		alert("이메일 아이디를 입력해 주십시오.");
		email1.focus();
		return false;
	}
	if(email2.value==""){
		alert("이메일주소를 보기에서 선택하시거나, 직접 입력해주십시오.");
		email1.focus();
		return false;
	}
	if(address1.value=""){
		alert("우편번호를 입력해주십시오.");
		address1.focus();
		return false;
	}
	if(address2.value=""){
		alert("기본주소를 입력해주십시오.");
		address2.focus();
		return false;
	}
	if(address3.value.length==0){
		alert("주소를 입력해주십시오.");
		address3.focus();
		return false;
	}
	if(hp1.value==null || hp1.value==""){
		hp1.value = "010";
	}
	document.getElementById("hp4").value = hp2.value;
	document.getElementById("hp5").value = hp3.value;
	document.getElementById("addr3").value = address3.value;
	
	document.member_form.action="./memberJoin.do";
	document.member_form.submit();
	return true;
}

//아이디확인
function checkId(){
	$('#idCheck').css({display:'block'});
	var param=getParams('member_form');
	var setting={
		url:"idCheck.do",
		data: param
	};
	$.ajax(setting)
	.done(function(data){
		if(data.includes('yes')){
			document.getElementById("idCheck").innerHTML="사용 가능한 아이디입니다.";	
		}
		if(data.includes('no')){
			document.getElementById("idCheck").innerHTML="이미 사용 중이거나, 조건에 맞지 않는 아이디입니다.";
		}
	});
}

//휴대폰 첫번째 옵션
function hpFirstChange(val){
	document.getElementById("hp1").value = val;
}

//이메일주소 옵션
function emailAddrChange(val){
	if(val == '직접입력'){
		$("#email2").val("");
		$("#email2").focus();
		$("#email2").removeAttr("readonly");
	}else{
		$("#email2").val(val);
		$("#email2").attr("readonly", "readonly");
	}
}

//회원로그인
function loginWork(flag){
	var id = $("#m_id_"+flag).val().trim();
	var pass = $("#m_pw_"+flag).val().trim();
	if(id == ""){
		alert("아이디를 입력해주세요");
		$("#m_id_"+flag).focus();
		return ;
	}
	if(pass == ""){
		alert("로그인 되었습니다."); //(이전)비밀번호를 입력해주세요
		$("#m_pw_"+flag).focus();
		return ;
	} else {
		//패스워드 암호화
		var shaPw = hex_sha512($("#m_pw_"+flag).val()).toString();
		$("#m_pw_"+flag).val(shaPw);
	}
	
	if(flag == "m") {
		document.loginForm_m.action="login.do";
		document.loginForm_m.submit();
	} else {
		document.loginForm.action="login.do";
		document.loginForm.submit();
	}
	
	//return true;
}

//비회원 주문조회
function non_memberFunc(){
	var order_name = document.getElementById("order_name");
	var order_num = document.getElementById("order_num");
	if(order_name.value==''){
		alert("주문자명을 입력해주십시오.");
		return false;
	}
	if(order_num.value==''){
		alert("주문번호를 입력해주십시오.");
		return false;
	}
	document.non_memberForm.action="./rental_inquiry.do";
	document.non_memberForm.submit();
	return true;
}

//렌탈신청
function rental_apply(s){
	if(s=='login_first'){ //로그인을 함
		var id = document.getElementById("id");
		var pass = document.getElementById("pass");
		if(id.value==''){
			alert("아이디를 입력해주십시오.");
			return false;
		}
		if(pass.value==''){
			alert("비밀번호를 입력해주십시오.");
			return false;
		}
		document.loginForm.action="index.do";
		document.loginForm.submit();
		return true;
	}else{//비회원주문
		document.rentalForm.action="rental_noMember.do";
		document.rentalForm.submit();
		return true;
	}			
}

//회원정보수정 - 비밀번호 확인
function passWord(){
	var pass = $('#user-pass');
	if(pass.val() == ""){
		alert('비밀번호를 입력해주세요.');
	}else{
		var shaPw = hex_sha512(pass.val()).toString();
		$("#pw").val(shaPw);
		var param=getParams('password_form');
		var setting={
			url:"pwCheck_modify.do",
			data: param
		};
		$.ajax(setting)
		.done(function(data){
			if(data.includes('yes')){
				location.href = "memberModifyForm.do";
			}
			if(data.includes('no')){
				alert("비밀번호가 일치하지 않습니다.");
			}
		});
	}
}

//비밀번호 변경
function pwChange(){
	var change_pw = document.getElementById("new_pw");
	var change_pw_confirm = document.getElementById("new_pw_confirm");
	var pw_now = document.getElementById("pw");
	
	if(pw_now.value==''){
		alert('안전한 비밀번호 수정을 위해 현재 비밀번호를 입력해주십시오.');
		pw_now.focus();
		return false;
	}
	var i=0;
	if(change_pw.value==''){
		alert('변경하실 비밀번호를 입력해주십시오.');
		change_pw.focus();
		return false;
	}
	if(change_pw_confirm.value==''){
		alert('변경하실 비밀번호를 확인해주십시오.');
		change_pw_confirm.focus();
		return false;
	}
	for(var i_1=0;i_1<change_pw.value.length;i_1++){
		var str = change_pw.value.charAt(i_1);
		if(str >= 48 || str <= 57){
			i = 1; //비밀번호에 숫자 들어가는지 확인
		}
	}	
	if(i != 1){
		alert("비밀번호에는 숫자가 포함되어야 합니다.");
		change_pw.focus();
		return false;
	}
	if(change_pw.value.length < 4){
		alert("비밀번호는 4자리 이상이어야 합니다.");
		change_pw.focus();
		return false;
	} 
	if(change_pw.value != change_pw_confirm.value){
		alert("비밀번호를 다시 확인해 주십시오.");
		change_pw_confirm.focus();
		return false;
	}
	
	var shaPw = hex_sha512(pw_now.value).toString();
	$("#pw").val(shaPw);
	var shaPw2 = hex_sha512(change_pw.value).toString();
	$("#new_pw").val(shaPw2);
	
	var param=getParams('memberModifyForm');
	var setting={
		url:"pwCheck_modify.do",
		data: param
	};
	$.ajax(setting)
	.done(function(data){
		if(data.includes('yes')){
			document.memberModifyForm.action="./pw_update.do?";
			document.memberModifyForm.submit();	
		}
		if(data.includes('no')){
			alert("현재 비밀번호를 다시 확인해주십시오.");
		}
	});
	
	return true; 
}

//회원수정 action
function memberUpdate(){
	var hp1 = document.getElementById("hp1");
	var hp2 = document.getElementById("hp2");
	var hp3 = document.getElementById("hp3");
	
	var address1 = document.getElementById("address1");
	var address2 = document.getElementById("address2");
	var address3 = document.getElementById("address3");
	
	document.memberModifyForm.action="./memberUpdate.do";
	document.memberModifyForm.submit();
}

//회원탈퇴
function memberDelete(){
	if(confirm("회원 탈퇴를 하시겠습니까?") == true) {
		document.memberModifyForm.action="./memberDelete.do";
		document.memberModifyForm.submit();
	}
	return true;
}

//다음 우편번호 API
function postCode(obj){
	new daum.Postcode({
        oncomplete: function(data) {
            var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== ''){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }
           
            var jibun = "";
            if(data.jibunAddress == ''){
            	jibun=data.autoJibunAddress;
            }else{
            	jibun=data.jibunAddress;
            }
            
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            var $stand = $(obj).parent('.addr-btn');
            var $num = $stand.siblings('.addr-num').find('input');
            $num.val(data.zonecode) //5자리 새우편번호 사용
            var $basic = $stand.siblings('.addr-basic').find('input');
            $basic.val(fullRoadAddr); // 기본주소: 도로명으로 표기
      
            // 정보수정 - 새 주소
            document.getElementById('address1').value= data.zonecode;
			document.getElementById('address2').value= fullRoadAddr;
			
        }
	}).open();
	document.getElementById('address3').focus(); // 나머지 주소
}
//아이디비밀번호 찾기
function memberSearch(){
	var SW = screen.availWidth;
	var SH = screen.availHeight;
	
	var width = 480;
	var height = 600;
	
	var left = (SW-width)/2;
	var top = (SH-height)/2;
	
	window.open('login_sch.do','loginSearch', 'width='+width+', height='+height+', left='+left+', top='+top+', toolbar=no, scrollbars=yes, resizable=yes');
}



