var Product = {
	insertBasket : function(p_idx) {
		$.ajax({
			url : 'insertBasket.ajax',
			type : 'post',
			data : {
				'p_idx' : p_idx,
				'p_num' : $('#cnt').val(),
				'option' : $('select[name=option]').val()
			}
		}).done(function(data) {
			alert(data);
		});
	},
	
	addCnt : function(state) {
		var cnt = $('#cnt').val();
		if(state == 'plus') {
			$('#cnt').val(parseInt(cnt) + 1);
		} else {
			if(parseInt(cnt) > 1){
				$('#cnt').val(parseInt(cnt) - 1);
			}
		}
		
		Product.productCal();
	},
	
	productCal : function() {
		var price = $('#price').val() * $('#cnt').val();
		
		
		$('#sell_price').text(setComma(price));
		$('#sell_price').append('<span class="cost-won line-height-22">원</span>');
		$('#total_price').text(setComma(price) + ' 원');
	},
	
	productOrder : function(p_idx) {
		var cnt = $('#cnt').val();
		if(loginCheck() == true) {
			location.href = 'orderForm.do?p_idx='+p_idx+'&cnt='+cnt;
		} else {
			var enc = encodeURIComponent('?p_idx='+p_idx+'&cnt='+cnt);
			location.href = 'orderFormNonMem.do?p_idx='+p_idx+'&cnt='+cnt;
		}
	},
	
	insertWishList : function(p_idx) {
		if(loginCheck() == true) {
			$.ajax({
				url : "insertWishList.ajax",
				data : {
					'p_idx' : p_idx
				},
				success : function(data) {
					alert(data);
				},
				error : function(data, status, er) {
					alert("error: " + data + " status: " + status + " er:" + er);
				}
			});
		} else {
			location.href = 'login_form.do?url=basket.do';
		}
	}
}