var Join = {
	openMember : function(evt, cityName) {	
		//회원 구분
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("member-tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("member-tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		document.getElementById(cityName).style.display = "block";
		evt.currentTarget.className += " active";
		
		$('#m_type').val(cityName);
	},
	
	openPersTab : function(event, persTabName) {
		//사업자 구분
		var i, businesstabcontent, businesstablinks;
		businesstabcontent = document.getElementsByClassName("businesstabcontent");
		for (i = 0; i < businesstabcontent.length; i++) {
		  businesstabcontent[i].style.display = "none";
		}
		businesstablinks = document.getElementsByClassName("businesstablinks");
		for (i = 0; i < businesstablinks.length; i++) {
		  businesstablinks[i].className = businesstablinks[i].className.replace(" active", "");
		}
		document.getElementById(persTabName).style.display = "block";
		event.currentTarget.className += " active";
		
		$('#m_type').val(persTabName);
	},
	
	checkOnly : function(chk) {
		if($('#m_birth').val() =='') {
			alert('생년월일을 입력해 주세요.');
			return false;
		}
		
		//체크박스 중복체크 방지
		var obj = document.getElementsByName("birthChk");
		for(var i=0; i<obj.length; i++){
			if(obj[i] != chk){
				obj[i].checked = false;
			}
		}
	},
	
	idCheck : function(state) {
		var idJ = /^[a-z0-9]{4,16}$/; //아이디 정규식
		if (idJ.test($('#m_id').val()) == false) {
			alert("아이디는 영문 소문자, 숫자 조합 6 ~ 16자만 사용 가능합니다.");
			$('#m_id').focus();
			return false;
		}
		
		if($('#m_id').val() == '') {
			alert("아이디는 영문 소문자, 숫자 조합 6 ~ 16자만 사용 가능합니다.");
			$('#m_id').focus();
			return false;
		}
		
		$.ajax({
			url : 'idCheck.ajax',
			type : 'post',
			data : $('#joinForm').serialize()
		}).done(function(data) {
			if (data == 'true') {
				if (state == 'check') {
					alert('사용 가능한 아이디입니다.')
				}
			} else if (data == 'dup') {
				alert('이미 사용중이거나 탈퇴한 아이디입니다.')
				return 'false';
			} else if (data == 'false') {
				alert('잠시 후 다시 시도해 주세요.');
				return 'false';
			}
		});
	},
	
	businessCheck : function(state) {
		if($('#m_business_name').val() == '') {
			alert('법인명을 입력해 주세요.');
			return false;
		}
		
		var business = $('#businessNumber1').val() + $('#businessNumber2').val();
		if(business == '') {
			alert('법인번호를 입력해 주세요.');
			return false;
		}
		
		var m_business_num = $('#businessNumber1').val() + '-' + $('#businessNumber2').val();
		$('#m_business_num').val(m_business_num);
		$.ajax({
			url : 'businessCheck.ajax',
			type : 'post',
			data : $('#joinForm').serialize()
		}).done(function(data) {
			if (data == 'true') {
				if (state == 'check') {
					alert('사용 가능한 법인번호입니다')
				}
			} else if (data == 'dup') {
				alert('이미 사용중이거나 탈퇴한 법인번호입니다.')
				return 'false';
			} else if (data == 'false') {
				alert('잠시 후 다시 시도해 주세요.');
				return 'false';
			}
		});
	},
	
	foreignerCheck : function(state) {
		if($('#m_foreigner_num').val() == '') {
			alert('외국인 등록번호를 입력해주세요.');
			return false;
		}
		
		$.ajax({
			url : 'foreignerCheck.ajax',
			type : 'post',
			data : $('#joinForm').serialize()
		}).done(function(data) {
			if (data == 'true') {
				if (state == 'check') {
					alert('사용 가능한 외국인 등록번호입니다')
				}
			} else if (data == 'dup') {
				alert('이미 사용중이거나 탈퇴한 외국인 등록번호입니다.')
				return 'false';
			} else if (data == 'false') {
				alert('잠시 후 다시 시도해 주세요.');
				return 'false';
			}
		});
	},
	
	signUp : function() {
		var idJ = /^[a-z0-9]{4,16}$/; //아이디 정규식
		var pwJ = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,16}$/; //비밀번호 정규식
		var mailJ = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 검사 정규식
		var spcJ = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
		var numJ = /[0-9]/; // 숫자
		
//		if($('#r_top_id').length){
//			if($('#r_top_id').val()==''){
//				alert('추천인 ID를 입력해주세요.');
//				return false;
//			}
//		}
		
		if($('#m_type').val() == '외국인') {
			if($('#m_country').val() == '') {
				alert('국적을 선택해 주세요.');
				return false;
			}
			
			if($('input:checkbox[name=agreeForeigner]').is(':checked') == false) {
				alert('고유식별정보 처리에 동의해주세요.');
				return false;
			}
			
			if(Join.foreignerCheck('join') == 'false') {
				return false;
			}
		}
		
		if($('#m_type').val() == '법인사업자') {
			if(Join.businessCheck('join') == 'false') {
				return false;
			}
		}
		
		if(Join.idCheck('join') == false) {
			return false;
		}
		if (pwJ.test($('#m_pw').val()) == false) {
			alert("비밀번호는 영문 대소문자/숫자/특수문자 중 3가지 이상 (10 ~ 16자) 조합해서 사용해 주세요.");
			return false;
		}
		if ($('#m_pw').val() != $('#pwCheck').val()) {
			alert("비밀번호가 일치하지 않습니다.");
			return false;
		}
		if($('input[name=m_name').val() == '') {
			alert('이름을 입력해 주세요.');
			return false;
		}
		if (spcJ.test($('input[name=m_name]').val()) == true || numJ.test($('input[name=m_name]').val()) == true) {
			alert("한글과 영문 대 소문자를 사용하세요.");
			return false;
		}
		var m_email = $('#email1').val() + '@' + $('#email2').val();
		$('#m_email').val(m_email);
		if (mailJ.test($('input[name=m_email]').val()) == false) {
			alert("이메일 형식이 아닙니다.");
			return false;
		}
		
		if ($('input:checkbox[id="email_agree"]').is(":checked") == true) {
			$('#m_agree_email').val('Y');
		} else {
			$('#m_agree_email').val('N');
		}
		
		var m_tel1 = $('#tel1_1').val() + '-' + $('#tel1_2').val() + '-' + $('#tel1_3').val();
		var m_tel2 = $('#tel2_1').val() + '-' + $('#tel2_2').val() + '-' + $('#tel2_3').val();
		$('#m_tel1').val(m_tel1);
		$('#m_tel2').val(m_tel2);
		if ($('input[name=m_phone]').val() == '') {
			alert('휴대폰번호를 입력해 주세요.');
			return false;
		}
		if ($('#m_post').val() == '' || $('#m_addr1').val() == '' || $('#m_addr2').val() == '' || $('#m_addr3').val() == '') {
			alert('주소를 입력해 주세요.');
			return false;
		}
		if($('input:checkbox[id=agreeOne]').is(':checked') == false) {
			alert('이용약관 동의에 체크해주세요.');
			return false;
		}
		if($('input:checkbox[id=agreeTwo]').is(':checked') == false) {
			alert('개인정보 수집 및 이용 동의에 체크해주세요.');
			return false;
		}

		var data = new FormData($('#joinForm')[0]);
		if($('#r_top_id').length){
			data.append('r_top_id',$('input[name=r_top_id]').val());
			data.append('resller',$('input[name=resller]').val());
		}
		console.log(data)
		$.ajax({
			url : 'insertMember.ajax',
			data : data,
			type : 'post',
			contentType : false,
			processData : false,
			success : function(data) {
				if (data == 'true') {
					alert('회원가입 완료');
					location.href = 'login_form.do';
				} else if (data == 'false') {
					alert('잠시 후 다시 시도해주세요.');
				} else if (data == 'email') {
					alert('이미 가입된 이메일 주소입니다');
					$('#email1').focus();
				}
			},
			error : function(jqXHR, exception, er) {
				alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
			}
		});
	}
	
}		


var Orders = {
	selectOrders : function(time) {
		var date1_1 = '';
		var date1_2 = '';
		if(time==''){
			date1_1 = $('#date1_1').val();
			date1_2 = $('#date1_2').val();
		}
		var enc = encodeURI('orderList.do?time='+time+'&date1_1='+date1_1+'&date1_2='+date1_2+'&page1=1');
		$("#body").load(enc);
	},
	
	moveOrders : function(page) {
		var enc = encodeURI('orderList.do?page1='+page);
		$("#body").load(enc);
	},
	
	selectCancel : function(time) {
		var date2_1 = $('#date2_1').val();
		var date2_2 = $('#date2_2').val();
		var enc = encodeURI('orderList.do?time='+time+'&date2_1='+date2_1+'&date2_2='+date2_2+'&page1=1&view=cancel');
		$("#body").load(enc);
	},
	
	moveCancel : function(page) {
		var enc = encodeURI('orderList.do?page2='+page);
		$("#body").load(enc);
	},
	
	view : function(idx) {
		$('#form_'+idx).submit();
	}
}

var Product = {
	deleteWishList : function(idx) {
		$('#tr_'+idx).remove();
		$.ajax({
			url : 'deleteWishList.ajax',
			data : {
				"p_idx" : idx
			},
			type : 'post',
			success : function(data) {
				if (data != 'true') {
					alert(data);
				} 
			},
			error : function(jqXHR, exception, er) {
				alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
			}
		});
	},
	
	deleteWishListSelect : function() {
		var idx = '';
		
		$('input:checkbox[name=select_wish]').each(function() {
			if(this.checked == true) {
				
				idx += this.value + ',';
			}
		});
		if(idx==''){
			alert("선택된 상품이 없습니다.");
			return false
		}
		idx = idx.substr(0, idx.length-1);
		
		$.ajax({
			url : 'deleteWishList.ajax',
			data : {
				"p_idx" : idx
			},
			type : 'post',
			success : function(data) {
				if (data != 'true') {
					alert(data);
				}
				location.reload();
			},
			error : function(jqXHR, exception, er) {
				alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
			}
		});
	},
	
	cartOrder : function(type) {
		var p_idx = '';
		var cnt = '';
		
		if(type == 'select') {
			$('input:checkbox[name=select_wish]:checked').each(function() {
				p_idx += this.value + '/';
				cnt += 1 + '/';
			});	
		} else {
			$('input:checkbox[name=select_wish]').each(function() {
				p_idx += this.value + '/';
				cnt += 1 + '/';
			});
		}
		
		if(p_idx == '') {
			alert('선택하신 상품이 없습니다.')
			return false;
		} else {
			p_idx = p_idx.slice(0, -1);
			cnt = cnt.slice(0, -1);
		}
		
		if(loginCheck() == true) {
			location.href = 'orderForm.do?p_idx='+p_idx+'&cnt='+cnt;
		} else {
			var enc = encodeURIComponent('?p_idx='+p_idx+'&cnt='+cnt);
			location.href = 'login_form.do?url=orderFormNonMem.do' + enc;
		}
	},

}

var Member = {
		deleteAddressList : function() {
			var idx = '';
			
			$('input:checkbox[name=select_check]').each(function() {
				if(this.checked == true) {
					$('#tr_'+this.value).remove();
					idx += this.value + ',';
				}
			});
			
			if(idx==''){
				alert("배송지를 선택해주세요.");
				return false;
			}
			
			idx = idx.substr(0, idx.length-1);
			
			$.ajax({
				url : 'deleteAddressList.ajax',
				data : {
					"al_idx" : idx
				},
				type : 'post',
				success : function(data) {
					if (data == 'true') {
						alert('삭제 완료');
					} else if(data == 'false') {
						alert('잠시 후 다시 시도해 주세요.')
					}
				},
				error : function(jqXHR, exception, er) {
					alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
				}
			});
		},
		
		updateAddressList : function() {
			var spcJ = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
			var numJ = /[0-9]/; // 숫자
			
			if($('#al_title').val() == '') {
				alert('배송지명을 입력해 주세요.');
				return false;
			}
			
			if($('#al_name').val() == '') {
				alert('이름을 입력해 주세요.');
				return false;
			}
			
			if (spcJ.test($('input[name=m_name]').val()) == true || numJ.test($('input[name=m_name]').val()) == true) {
				alert("한글과 영문 대 소문자를 사용하세요.");
				return false;
			}
			
			var al_tel = $('#al_tel1').val() + '-' + $('#al_tel2').val() + '-' + $('#al_tel3').val();
			$('#al_tel').val(al_tel);
			if ($('#al_tel').val() == '') {
				alert('휴대폰번호를 입력해 주세요.');
				return false;
			}
			
			if ($('#al_post').val() == '' || $('#al_addr1').val() == '' || $('#al_addr2').val() == '' || $('#al_addr3').val() == '') {
				alert('주소를 입력해 주세요.');
				return false;
			}
			
			var data = new FormData($('#alForm')[0]);
			$.ajax({
				url : 'updateAddressList.ajax',
				data : data,
				type : 'post',
				contentType : false,
				processData : false,
				success : function(data) {
					if (data == 'true') {
						alert('배송지 수정 완료');
						location.href='addressList.do';
					} else if (data == 'false') {
						alert('잠시 후 다시 시도해주세요.');
					} 
				},
				error : function(jqXHR, exception, er) {
					alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
				}
			});
		},
			
		insertAddressList : function() {
			var spcJ = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
			var numJ = /[0-9]/; // 숫자
			
			if($('#al_title').val() == '') {
				alert('배송지명을 입력해 주세요.');
				return false;
			}
			
			if($('#al_name').val() == '') {
				alert('이름을 입력해 주세요.');
				return false;
			}
			
			if (spcJ.test($('input[name=m_name]').val()) == true || numJ.test($('input[name=m_name]').val()) == true) {
				alert("한글과 영문 대 소문자를 사용하세요.");
				return false;
			}
			
			var al_tel = $('#al_tel1').val() + '-' + $('#al_tel2').val() + '-' + $('#al_tel3').val();
			$('#al_tel').val(al_tel);
			if ($('#al_tel').val() == '') {
				alert('휴대폰번호를 입력해 주세요.');
				return false;
			}
			
			if ($('#al_post').val() == '' || $('#al_addr1').val() == '' || $('#al_addr2').val() == '' || $('#al_addr3').val() == '') {
				alert('주소를 입력해 주세요.');
				return false;
			}
			
			var data = new FormData($('#alForm')[0]);
			$.ajax({
				url : 'insertAddressList.ajax',
				data : data,
				type : 'post',
				contentType : false,
				processData : false,
				success : function(data) {
					if (data == 'true') {
						alert('배송지 등록 완료');
						location.href="addressList.do";
					} else if (data == 'false') {
						alert('잠시 후 다시 시도해주세요.');
					} else if (data = 'cnt') {
						alert('최대 10개 까지의 배송지를 등록할 수 있습니다.')
					}
				},
				error : function(jqXHR, exception, er) {
					alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
				}
			});
		},
		
		signOut : function() {
			if(confirm("정말로 삭제하시겠습니까?")==true){
				$.ajax({
					url : 'signOut.ajax',
					success : function(data) {
						if (data == 'true') {
							alert('그동안 린백을 사용해 주셔서 감사합니다.');
							location.href='logout.do';
						} else if (data == 'false') {
							alert('잠시 후 다시 시도해주세요.');
						}
					},
					error : function(jqXHR, exception, er) {
						alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
					}
				});
			}
		},
		
		updateMember : function() {
			var idJ = /^[a-z0-9]{4,16}$/; //아이디 정규식
			var pwJ = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,16}$/; //비밀번호 정규식
			var mailJ = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 검사 정규식
			var spcJ = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
			var numJ = /[0-9]/; // 숫자
			
			if (pwJ.test($('#m_pw').val()) == false) {
				alert("비밀번호는 영문 대소문자/숫자/특수문자 중 2가지 이상 (10 ~ 16자) 조합해서 사용해 주세요.");
				return false;
			}

			if ($('#m_pw').val() != $('#pwCheck').val()) {
				alert("비밀번호가 일치하지 않습니다.");
				return false;
			}

			if($('input[name=m_name').val() == '') {
				alert('이름을 입력해 주세요.');
				return false;
			}
			
			if (spcJ.test($('input[name=m_name]').val()) == true || numJ.test($('input[name=m_name]').val()) == true) {
				alert("한글과 영문 대 소문자를 사용하세요.");
				return false;
			}

			var m_email = $('#email1').val() + '@' + $('#email2').val();
			$('#m_email').val(m_email);
			if (mailJ.test($('input[name=m_email]').val()) == false) {
				$("#mail_caution").text("이메일 형식이 아닙니다.");
				return false;
			}
			
			if ($('input:checkbox[id="email_agree"]').is(":checked") == true) {
				$('#m_agree_email').val('Y');
			} else {
				$('#m_agree_email').val('N');
			}
			
			
			var m_tel1 = $('#tel1_1').val() + '-' + $('#tel1_2').val() + '-' + $('#tel1_3').val();
			var m_tel2 = $('#tel2_1').val() + '-' + $('#tel2_2').val() + '-' + $('#tel2_3').val();
			$('#m_tel1').val(m_tel1);
			$('#m_tel2').val(m_tel2);
			if ($('input[name=m_phone]').val() == '') {
				alert('휴대폰번호를 입력해 주세요.');
				return false;
			}
			
			if ($('#m_post').val() == '' || $('#m_addr1').val() == '' || $('#m_addr2').val() == '' || $('#m_addr3').val() == '') {
				alert('주소를 입력해 주세요.');
				return false;
			}
			
//			if ($('input[name=m_birth]').val() == '' && $('input:checkbox[name="m_birth_type"]:checked').val() == '') {
//				alert('생년월일을 입력해 주세요.');
//				return false;
//			}

			

//			if ($('input:checkbox[id="smsChk"]').is(":checked") == true) {
//				$('#m_agree_sms').val('Y');
//			} else {
//				$('#m_agree_sms').val('N');
//			}

			var data = new FormData($('#alForm')[0]);
			$.ajax({
				url : 'updateMember.ajax',
				data : data,
				type : 'post',
				contentType : false,
				processData : false,
				success : function(data) {
					if (data == 'true') {
						alert('회원 정보 수정 완료.');
						location.reload();
					} else if (data == 'false') {
						alert('잠시 후 다시 시도해주세요.');
					}
				},
				error : function(jqXHR, exception, er) {
					alert("errorType: " + jqXHR + " status: " + exception + " errorMsg:" + er);
				}
			});
		}
	}
