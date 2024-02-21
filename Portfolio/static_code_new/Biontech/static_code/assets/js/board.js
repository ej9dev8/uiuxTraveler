
var Board = {
	moreView : function() {
		var x = document.getElementById("moreView");
		if (x.style.display == "none" ) {
			 x.style.display = "block";
		} else {
		    x.style.display = "none";
		}
	},
		
	view : function(idx) {
		$('input[name=rb_idx]').val(idx);
		$('#reviewForm').submit();
	},
	
	view2 : function(type) {
		if(type=='prev'){
			$('#form_prev').submit();
		}
		if(type=='next'){
			$('#form_next').submit();
		}
	},
	
	typeProduct : function() {
		var x = document.getElementById("moreView");
		if($('#type option:selected').val() == 1) {
			$('#product').removeClass('hidden');
			x.style.display = "block";
		} else {
			$('#product').addClass('hidden');
			$('input:radio[name=p_idx]').removeAttr('checked');
			x.style.display = "none";
		}
	},
	
	writeBoard : function(type) {
		if(loginCheck() == true) {
			if(type=='qna_nonecustomer'){
				location.href = 'qnaWrite.do';
			}else{
				location.href = type + 'Write.do';
			}
		} else {
			if(type=='qna_nonecustomer'){
				location.href = 'qnaWrite.do';
			}else{
				location.href = 'login_form.do?url='+ type + 'Write.do';
			}
		}
	},
	
	updateBoard : function(type) {
		if($('#title').val() == '') {
			alert('제목을 입력해 주세요');
			return false;
		}
		
		if($('#content').val() == '') {
			alert('내용을 입력해 주세요');
			return false;
		}
		
		if(type == 'Qna') {
			if($('#type option:selected').val() == '') {
				alert('유형을 선택해 주세요.');
				return false;
			}
			
			if($('#type option:selected').val() == '상품') {
				if($('input[name=p_idx]').is(':checked') == false) {
					alert('상품을 선택해 주세요');
					return false;
				}
			}
		}
		
		var formData = new FormData($('#boardForm')[0]);
		$.ajax({
			url : 'update'+type+'Board.ajax',
			type : 'post',
			data :  formData,
			contentType : false,
			processData: false
		}).done(function(data) {
			alert(data.result);
			if(data.result.indexOf('오류')==-1){
				$('#'+type).val(data.idx);
				$('#boardForm').submit();
			}
		});
	},
	
	insertBoard : function(type) {		
		if($('#title').val() == '') {
			alert('제목을 입력해 주세요');
			return false;
		}
		
		if($('#content').val() == '') {
			alert('내용을 입력해 주세요');
			return false;
		}
		
		
		if(type == 'Qna') {
			if($('#type option:selected').val() == '') {
				alert('유형을 선택해 주세요.');
				return false;
			}
			
			if($('#type option:selected').val() == '상품') {
				if($('input[name=p_idx]').is(':checked') == false) {
					alert('상품을 선택해 주세요');
					return false;
				}
			}
			
			if($('input[id=open]:checked').val() == '') {
				alert('공개여부를 선택해 주세요	.');
				return false;
			}
		}


		if(type=='qna'){
			$('#'+type).val(obj.idx);
		}
		var formData = new FormData($('#boardForm')[0]);
		$.ajax({
			url : 'insert'+type+'Board.ajax',
			type : 'post',
			data :  formData,
			contentType : false,
			processData: false
		}).done(function(data) {
			alert(data.result);
			if(data.result.indexOf('오류')==-1){
				$('#'+type).val(data.idx);
				$('#boardForm').submit();
			}
		});
	},
	
	deleteBoard : function(idx, type) {
		$.ajax({
			url : 'delete'+type+'Board.ajax',
			type : 'post',
			data : {
				'idx' : idx
			}
		}).done(function(data) {
			if(data == 'true') {
				alert('게시물 삭제 완료');
				var url = type.toLowerCase();
				location.href= url + 'List.do';
			} else {
				alert(data);
			}
		});
	},
	
	checkProduct : function(obj){
		var p_idx = $(obj).val();
		var select = $(obj).attr("id");
		select = select.replace('check_','');
		$("input[name=rb_p_idx]").val(p_idx);
		$('#moreView').hide();
		console.log(select);
		$('#productSelect').html($('#selectProductName_'+select).html());
	}
}