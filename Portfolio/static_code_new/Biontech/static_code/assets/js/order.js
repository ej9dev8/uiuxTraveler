var Cart = {
	cartOrdersNomem : function(p_idx) {
		var cnt=$('#cnt_'+p_idx).val();
		if(loginCheck() == true) {
			location.href = 'orderForm.do?p_idx='+p_idx+'&cnt='+cnt;
		} else {
			var enc = '?p_idx='+p_idx+'&cnt='+cnt;
			location.href = 'orderFormNonMem.do' + enc;
		}
	},
	
	cartOrdersMem : function(bk_idx,p_idx) {
		var cnt=$('#cnt_'+bk_idx).val();
		if(loginCheck() == true) {
			location.href = 'orderForm.do?p_idx='+p_idx+'&cnt='+cnt;
		} else {
			var enc = '?p_idx='+p_idx+'&cnt='+cnt;
			location.href = 'orderFormNonMem.do' + enc;
		}
	},
	
	cartOrdersMobileNomem : function(p_idx) {
		var cnt=$('#cnt_mobile'+p_idx).val();
		if(loginCheck() == true) {
			location.href = 'orderForm.do?p_idx='+p_idx+'&cnt='+cnt;
		} else {
			var enc = '?p_idx='+p_idx+'&cnt='+cnt;
			location.href = 'orderFormNonMem.do' + enc;
		}
	},
	
	cartOrdersMobileMom : function(bk_idx,p_idx) {
		var cnt=$('#cnt_mobile'+bk_idx).val();
		if(loginCheck() == true) {
			location.href = 'orderForm.do?p_idx='+p_idx+'&cnt='+cnt;
		} else {
			var enc = '?p_idx='+p_idx+'&cnt='+cnt;
			location.href = 'orderFormNonMem.do' + enc;
		}
	},
	
	cartOrderNomem : function(type) {
		var p_idx = '';
		var cnt = '';
		
		if(type == 'select') {
			$('input:checkbox[name=select_check]:checked').each(function() {
				p_idx += this.value + '/';
				cnt += $('#cnt_'+this.value).val() + '/';
			});	
		} else {
			$('input:checkbox[name=select_check]').each(function() {
				p_idx += this.value + '/';
				cnt += $('#cnt_'+this.value).val() + '/';
			});
		}
		
		if(p_idx == '') {
			alert('선택하신 상품이 없습니다.')
			return false;
		} else {
			p_idx = p_idx.slice(0, -1);
			cnt = cnt.slice(0, -1);
		}
		
		
		var enc = 'p_idx='+p_idx+'&cnt='+cnt;
		location.href = 'orderFormNonMem.do?' + enc;
		
	},
	
	cartOrderNomemMobile : function(type){
		var p_idx = '';
		var cnt = '';
		
		if(type == 'select') {
			$('input:checkbox[name=select_check]:checked').each(function() {
				p_idx += this.value + '/';
				cnt += $('#cnt_mobile'+this.value).val() + '/';
			});	
		} else {
			$('input:checkbox[name=select_check]').each(function() {
				p_idx += this.value + '/';
				cnt += $('#cnt_mobile'+this.value).val() + '/';
			});
		}
		
		if(p_idx == '') {
			alert('선택하신 상품이 없습니다.')
			return false;
		} else {
			p_idx = p_idx.slice(0, -1);
			cnt = cnt.slice(0, -1);
		}
		
		
		var enc = 'p_idx='+p_idx+'&cnt='+cnt;
		location.href = 'orderFormNonMem.do?' + enc;
	},
	
	cartOrder : function(type) {
		var bk_idx = '';
		var cnt = '';
		
		if(type == 'select') {
			$('input:checkbox[name=select_check]:checked').each(function() {
				bk_idx += this.value + '/';
				cnt += $('#cnt_'+this.value).val() + '/';
			});	
		} else {
			$('input:checkbox[name=select_check]').each(function() {
				bk_idx += this.value + '/';
				cnt += $('#cnt_'+this.value).val() + '/';
			});
		}
		
		if(bk_idx == '') {
			alert('선택하신 상품이 없습니다.')
			return false;
		} else {
			bk_idx = bk_idx.slice(0, -1);
			cnt = cnt.slice(0, -1);
		}
		
		if(loginCheck() == true) {
			location.href = 'basketForm.do?bk_idx='+bk_idx+'&cnt='+cnt;
		} else {
			alert("로그인 후 이용해주세요.");
			location.href="login_form.do";
		}
	},
	
	cartOrderMobile : function(type) {
		var bk_idx = '';
		var cnt = '';
		
		if(type == 'select') {
			$('input:checkbox[name=select_check]:checked').each(function() {
				bk_idx += this.value + '/';
				cnt += $('#cnt_mobile'+this.value).val() + '/';
			});	
		} else {
			$('input:checkbox[name=select_check]').each(function() {
				bk_idx += this.value + '/';
				cnt += $('#cnt_mobile'+this.value).val() + '/';
			});
		}
		
		if(bk_idx == '') {
			alert('선택하신 상품이 없습니다.')
			return false;
		} else {
			bk_idx = bk_idx.slice(0, -1);
			cnt = cnt.slice(0, -1);
		}
		
		if(loginCheck() == true) {
			location.href = 'basketForm.do?bk_idx='+bk_idx+'&cnt='+cnt;
		} else {
			alert("로그인 후 이용해주세요.");
			location.href="login_form.do";
		}
	},
	
	addCnt : function(state, idx) {
		var cnt = $('#cnt_'+idx).val();
		if(state == 'plus') {
			$('#cnt_'+idx).val(parseInt(cnt) + 1);
		} else {
			if(parseInt(cnt) > 1){
				$('#cnt_'+idx).val(parseInt(cnt) - 1);
			}
		}
		Cart.productCal(idx);
	},
	
	productCal : function(idx) {
		var price = $('#p_sale_'+idx).val();
		var discount = $('#product_discount_'+idx).val();
		var cnt = $('#cnt_'+idx).val();
		var mil = $('#mil_'+idx).val();
//		if(discount != 0){
//			price = discount;
//		}
		$('#price_'+idx).text(setComma(parseInt(price) * parseInt(cnt)));
		$('#mileage_'+idx).text(setComma(parseInt(mil) * parseInt(cnt)));
		var delivery = $('#product_delivery_'+idx).val();
		var delivery_free = $('#product_delivery_free_'+idx).val();
		if(parseInt(delivery_free) > price * cnt) {
			$('#delivery_'+idx).text(setComma(delivery));
		} else {
			$('#delivery_'+idx).text(0);
		}
		
		Cart.totalCal();
	},
	
	totalCal : function() {
		var total_price = 0;
		var total_delivery = 0;
		var total_discount = 0;
		var total_payment = 0;
		var total_coupon = 0;
		var total_mileage = 0;
		$.each($('tr.tr_class'),function(key,val){
			
			var cnt = $(this).children('td').children('p').children('input.cnt').val();
			
			var price = $(this).children('td').children('input.price').val();
			var chk = $(this).children('td').children('p').children('label').children('input.chk-boby').prop('checked');
			if(chk==true){
				total_price += parseInt(price) * parseInt(cnt);
			}

			
		});
		var discount = $('input[name=cop_discount]').val();
		var mileage = $('#o_use_mileage').val();
		if(discount == undefined){
			discount=0;
		}
		if(mileage == undefined){
			mileage=0;
		}
		total_coupon += parseInt(discount);
		total_mileage += parseInt(mileage);
		total_discount += (parseInt(discount)+parseInt(mileage));
		total_payment = parseInt(total_price) + parseInt(total_delivery) - parseInt(total_discount);
		$('input[name=total_price]').val(parseInt(total_price)-total_coupon);
		$('#total_price').text(setComma(total_price));
		$('#last_price').text(setComma(total_price));
		$('#total_coupon').text(setComma(total_coupon));
		$('#total_delivery').text(setComma(total_delivery));
		$('#last_delivery').text(setComma(total_delivery));
		$('#total_mileage').text(setComma(total_mileage));
		$('#total_discount').text(setComma(total_discount));
		$('#last_discount').text(setComma(total_discount));
		
		$('#total_payment').text(setComma(total_payment));
		$('#last_payment').text(setComma(total_payment));
	},
	
	totalCalOrder : function() {
		var total_price = 0;
		var total_delivery = 0;
		var total_discount = 0;
		var total_payment = 0;
		var total_coupon = 0;
		var total_mileage = 0;
		$.each($('tr.tr_class'),function(key,val){
			
			var cnt = $(this).children('td').children('p').children('input.cnt').val();
			var price = $(this).children('td').children('input.price').val();
			total_price += parseInt(price) * parseInt(cnt);
			
		});
		var discount = $('input[name=cop_discount]').val();
		var mileage = $('#o_use_mileage').val();
		if(discount == undefined){
			discount=0;
		}
		if(mileage == undefined){
			mileage=0;
		}
		total_coupon += parseInt(discount);
		total_mileage += parseInt(mileage);
		total_discount += (parseInt(discount)+parseInt(mileage));
		total_payment = parseInt(total_price) + parseInt(total_delivery) - parseInt(total_discount);
		$('input[name=total_price]').val(parseInt(total_price)-total_coupon);
		$('#total_price').text(setComma(total_price));
		$('#last_price').text(setComma(total_price));
		$('#total_coupon').text(setComma(total_coupon));
		$('#total_delivery').text(setComma(total_delivery));
		$('#last_delivery').text(setComma(total_delivery));
		$('#total_mileage').text(setComma(total_mileage));
		$('#total_discount').text(setComma(total_discount));
		$('#last_discount').text(setComma(total_discount));
		
		$('#total_payment').text(setComma(total_payment));
		$('#last_payment').text(setComma(total_payment));
	},
	
	addCnt_mobile : function(state, idx) {
		var cnt = $('#cnt_mobile'+idx).val();
		if(state == 'plus') {
			$('#cnt_mobile'+idx).val(parseInt(cnt) + 1);
		} else {
			if(parseInt(cnt) > 1){
				$('#cnt_mobile'+idx).val(parseInt(cnt) - 1);
			}
		}
		Cart.mobileProductCal(idx);
	},
	
	mobileProductCal : function(idx) {
		var price = $('#p_sale_'+idx).val();
		var discount = $('#product_discount_'+idx).val();
		var cnt = $('#cnt_mobile'+idx).val();
		$('#price_mobile'+idx).text(setComma(parseInt(price) * parseInt(cnt)));
		var delivery = $('#product_delivery_'+idx).val();
		var delivery_free = $('#product_delivery_free_'+idx).val();
		if(parseInt(delivery_free) > price * cnt) {
			$('#delivery_'+idx).text(setComma(delivery));
		} else {
			$('#delivery_'+idx).text(0);
		}
		
		Cart.mobileTotalCal();
	},
	
	mobileTotalCal : function() {
		var total_price = 0;
		var total_delivery = 0;
		var total_discount = 0;
		var total_payment = 0;
		var total_coupon = 0;
		var total_mileage = 0;
		$.each($('tr.tr_class'),function(key,val){
			
			var cnt = $(this).children('td').children('div').children('div').children('p').children('input.cnt').val();
			
			var price = $(this).children('td').children('input.price').val();
			var chk = $(this).children('td').children('p').children('label').children('input.chk-boby').prop('checked');
			if(chk==true){
				total_price += parseInt(price) * parseInt(cnt);
			}

			
		});
		var discount = $('input[name=cop_discount]').val();
		var mileage = $('#o_use_mileage').val();
		if(discount == undefined){
			discount=0;
		}
		if(mileage == undefined){
			mileage=0;
		}
		total_coupon += parseInt(discount);
		total_mileage += parseInt(mileage);
		total_discount += (parseInt(discount)+parseInt(mileage));
		total_payment = parseInt(total_price) + parseInt(total_delivery) - parseInt(total_discount);
		$('input[name=total_price]').val(parseInt(total_price)-total_coupon);
		$('#total_price').text(setComma(total_price));
		$('#last_price').text(setComma(total_price));
		$('#total_coupon').text(setComma(total_coupon));
		$('#total_delivery').text(setComma(total_delivery));
		$('#last_delivery').text(setComma(total_delivery));
		$('#total_mileage').text(setComma(total_mileage));
		$('#total_discount').text(setComma(total_discount));
		$('#last_discount').text(setComma(total_discount));
		
		$('#total_payment').text(setComma(total_payment));
		$('#last_payment').text(setComma(total_payment));
	}
}


var Order = {
	remove : function(p_idx) {
		$('#tr_'+p_idx).remove();
		Cart.totalCal();
	},
	
	remove_choice : function() {
		
		var p_idx = '';
		
		
		$('input:checkbox[name=select_check]:checked').each(function() {
			p_idx += this.value + ',';
		});	
		
		p_idx=p_idx.substring(0,p_idx.length-1);
		
		if(p_idx == '') {
			alert('선택하신 상품이 없습니다.')
			return false;
		} else {
			
			var p_idxs = p_idx.split(',');
			for(var i in p_idxs){
				$.ajax({
		    		  url:'deleteBasketSelect.ajax',
		    		  type:'post',
		    		  data:'p_idx='+p_idxs[i],
		    		  success:function(){
		    			  
		    		  }
		    	  })
			}
			location.reload();
		 
		}
		
	},
	
	deliveryInfo : function(state) {
		if(state == 'new') {
			$('#o_del_name').val('');
			$('#o_del_post').val('');
			$('#o_del_addr1').val('');
			$('#o_del_addr2').val('');
			$('#o_del_addr3').val('');
			$('#tel1_1').val('');
			$('#tel1_2').val('');
			$('#tel1_3').val('');
			$('#email1').val('');
			$('#email2').val('');
		} else {
			
			$('#o_del_name').val(name);
			$('#o_del_post').val(post);
			$('#o_del_addr1').val(addr1);
			$('#o_del_addr2').val(addr2);
			$('#o_del_addr3').val(addr3);
			$('#tel1_1').val(tel[0]);
			$('#tel1_2').val(tel[2]);
			$('#tel1_3').val(tel[3]);
			$('#email1').val(email[0]);
			$('#email2').val(email[1]);
		}
	},
	
	// 회원 주문하기
	orderApply : function() {
		var o_name = $('#o_name').val();
		if(o_name == ''){
			alert('신청고객을 입력해주세요.');
			return false;
		}
		
		if($('#phone1_1').val() == '' || $('#phone1_2').val() == '' || $('#phone1_3').val() == '') {
			alert('신청고객 휴대전화를 입력해 주세요.');
			return false;
		}
		
		var o_del_name = $('#o_del_name').val();
		if(o_del_name == '') {
			alert('받으시는 분을 입력해 주세요.');
			return false;
		}
		$('#buyername').val(o_del_name);
		
		if($('#o_del_post').val() == '' || $('#o_del_addr3').val() == '') {
			alert('주소를 입력해 주세요.');
			return false;
		}
		$('#o_del_addr').val($('#o_del_addr2').val() + ' ' + $('#o_del_addr3').val());
		
		if($('#tel1_1').val() == '' || $('#tel1_2').val() == '' || $('#tel1_3').val() == '') {
			alert('휴대전화를 입력해 주세요.');
			return false;
		}
		var tel1 = $('#tel1_1').val();
		var tel2 = $('#tel1_2').val();
		var tel3 = $('#tel1_3').val();
		var o_rec_tel_1 = tel1 + '-' + tel2 + '-' + tel3;
		$('#o_del_phone').val(o_rec_tel_1);
		$('#buyertel').val(o_rec_tel_1);
		
		var phone1 = $('#phone1_1').val();
		var phone2 = $('#phone1_2').val();
		var phone3 = $('#phone1_3').val();
		var o_phone = phone1 + '-' + phone2 + '-' + phone3;
		$('#o_phone').val(o_phone);
		
/*		var o_rec_email = $('#email1').val() + '@' + $('#email2').val();
		if(o_rec_email == '') {
			alert('이메일을 입력해 주세요');
			return false;
		}*/
		/*$('#o_del_email').val(o_del_email);
		$('#buyeremail').val(o_del_email);*/
		
		
		if($('#payAgree').is(':checked') == false) {
			alert('구매진행에 동의해 주세요.');
			return false;
		}
		var param = $('#orderForm').serialize();
		if($('#last_payment').html()=='0'){
			$.ajax({
				url:'zeroMoney.ajax',
				type:'post',
				data:param,
				success:function(res){
					alert(res.msg);
		           	location.replace(res.url);
				}
			})
		}else{
			$.ajax({
				url:'orderForm.ajax',
				type:'post',
				data:param,
				success:function(res){
					if(res.msg!=null){
						alert(res.msg)
					}else{
						if(res.browser == 'web'){
							$('input[name=req_tx]').val('pay');
							$('input[name=site_cd]').val(res.g_conf_site_cd);
							$('input[name=site_name]').val(res.g_conf_site_name);
							$('input[name=ordr_idxx]').val(res.request.ordr_idxx);
							$('input[name=pay_method]').val(res.request.pay_method);
							$('input[name=good_name]').val(res.request.good_name);
							$('input[name=good_mny]').val(res.request.good_mny);
							$('input[name=shop_user_id]').val(res.request.ordr_idxx);
							$('input[name=o_del_name]').val(res.request.o_del_name);
							$('input[name=module_type]').val(res.module_type);
							$('input[name=res_cd]').val('');
							$('input[name=res_msg]').val('');
							$('input[name=enc_info]').val('');
							$('input[name=enc_data]').val('');
							$('input[name=ret_pay_method]').val('');
							$('input[name=tran_cd]').val('');
							$('input[name=use_pay_method]').val('');
							$('input[name=ordr_chk]').val('');
							$('input[name=cash_yn]').val('');
							$('input[name=cash_tr_code]').val('');
							$('input[name=cash_id_info]').val('');
							$('input[name=good_expr]').val('0');
							
							jsf__pay(document.order_info);
						}else{
							$('input[name=req_tx]').val('pay');
							$('input[name=shop_name]').val(res.g_conf_site_name);
							$('input[name=site_cd]').val(res.g_conf_site_cd);
							$('input[name=ordr_idxx]').val(res.request.ordr_idxx);
							$('input[name=pay_method]').val(res.request.pay_method);
							$('input[name=ActionResult]').val(res.request.ActionResult);
							$('input[name=good_name]').val(res.request.good_name);
							$('input[name=Ret_URL]').val('kcpOrderMen.ajax');
							$('input[name=PayUrl]').val('kcpOrderMen.ajax');
							$('input[name=good_mny]').val(res.request.good_mny);
							$('input[name=currency]').val('410');
							$('input[name=shop_user_id]').val(res.m_id);
						}
						
					}
				}
			})
		}
	},
	
	// 비회원 주문하기
	orderNonMemApply : function() {
		$('#addPage').html('')
		var o_name = $('#o_name').val();
		if(o_name == ''){
			alert('신청고객을 입력해주세요.');
			return false;
		}
		
		if($('#phone1_1').val() == '' || $('#phone1_2').val() == '' || $('#phone1_3').val() == '') {
			alert('신청고객 휴대전화를 입력해 주세요.');
			return false;
		}
		
		var o_del_name = $('#o_del_name').val();
		if(o_del_name == '') {
			alert('받으시는 분을 입력해 주세요.');
			return false;
		}
		$('#buyername').val(o_del_name);
		
		if($('#o_del_post').val() == '' || $('#o_del_addr3').val() == '') {
			alert('주소를 입력해 주세요.');
			return false;
		}
		$('#o_del_addr').val($('#o_del_addr2').val() + ' ' + $('#o_del_addr3').val());
		
		if($('#tel1_1').val() == '' || $('#tel1_2').val() == '' || $('#tel1_3').val() == '') {
			alert('휴대전화를 입력해 주세요.');
			return false;
		}
		var tel1 = $('#tel1_1').val();
		var tel2 = $('#tel1_2').val();
		var tel3 = $('#tel1_3').val();
		var o_rec_tel_1 = tel1 + '-' + tel2 + '-' + tel3;
		$('#o_del_phone').val(o_rec_tel_1);
		$('#buyertel').val(o_rec_tel_1);
		
		var phone1 = $('#phone1_1').val();
		var phone2 = $('#phone1_2').val();
		var phone3 = $('#phone1_3').val();
		var o_phone = phone1 + '-' + phone2 + '-' + phone3;
		$('#o_phone').val(o_phone);
		
/*		var o_rec_email = $('#email1').val() + '@' + $('#email2').val();
		if(o_rec_email == '') {
			alert('이메일을 입력해 주세요');
			return false;
		}*/
/*		$('#o_del_email').val(o_del_email);
		$('#buyeremail').val(o_del_email);*/
		
		
		if($('#payAgree').is(':checked') == false) {
			alert('구매진행에 동의해 주세요.');
			return false;
		}
		
		
		var param = $('#orderForm').serialize();
		$.ajax({
			url:'orderForm.ajax',
			type:'post',
			data:param,
			success:function(res){
				if(res.msg!=null){
					alert(res.msg)
				}else{
					$('input[name=req_tx]').val('pay');
					$('input[name=site_cd]').val(res.g_conf_site_cd);
					$('input[name=site_name]').val(res.g_conf_site_name);
					$('input[name=ordr_idxx]').val(res.request.ordr_idxx);
					$('input[name=pay_method]').val(res.request.pay_method);
					$('input[name=good_name]').val(res.request.good_name);
					$('input[name=good_mny]').val(res.request.good_mny);
					$('input[name=shop_user_id]').val(res.request.ordr_idxx);
					$('input[name=o_del_name]').val(res.request.o_del_name);
					$('input[name=module_type]').val(res.module_type);
					$('input[name=res_cd]').val('');
					$('input[name=res_msg]').val('');
					$('input[name=enc_info]').val('');
					$('input[name=enc_data]').val('');
					$('input[name=ret_pay_method]').val('');
					$('input[name=tran_cd]').val('');
					$('input[name=use_pay_method]').val('');
					$('input[name=ordr_chk]').val('');
					$('input[name=cash_yn]').val('');
					$('input[name=cash_tr_code]').val('');
					$('input[name=cash_id_info]').val('');
					$('input[name=good_expr]').val('0');
					
					jsf__pay(document.order_info);
				}
			}
		})
		//$('#orderForm').submit();
		
	},
}