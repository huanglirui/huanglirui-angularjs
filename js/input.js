(function ($){
			
	//发送数据得到数据后进行数据的对比
	function getCheck (inputValue, url){

		//储存后台返回的数据
		var data = null;  
		var promise = $.ajax({
			url: url,
			data: {data: inputValue}
		});
		
		promise.done(function (response){
			//请求成功
			data = response;
		}) 
		.fail(function (error){
			//请求失败
			console.log(error);
		});

		//返回后台返回的数据
		return data;  

	};

	//解析URL中的数据
	function parseUrlData(str){
		var dataArr = [];
		  if (str.indexOf("?") != -1){
		  		dataArr = str.substr(str.indexOf("?")+1).split("&"); 
		  };
		  return dataArr;
	};

	
	var checkNum = '';  //验证码
	var bankNumInput = $('.bankNum');  //输入银行卡的input
	var phoneNumInput = $('.number');  //输入手机号的input
	var chenkBtn = $('.button');  //获取验证码的按钮

	//通过手机号得到验证码，然后与用户输入的验证码就行对比
	chenkBtn.on('click', function (){

		if (!phoneNumInput.siblings()){
			var number = phoneNumInput.val();
			//得到验证码
			checkNum = getCheck(number, 'https://disney.payeco.com/disney/sms')；
		};
		
	});

	//通过银行卡号得到相应的银行
	bankNumInput.on('blur', function (){

		//如果银行卡号没有错误，在进行银行类型的获取
		//没有em元素说明就没有错误，因为错误提示是依靠em来提示的
		if (!$(this).siblings()){
			var bankCardNum = $(this).val();
			//得到银行类型
			var bankType = getCheck(bankCardNum, 'https://disney.payeco.com/disney/sms')；
			//把银行类型添加到输入银行卡的input后面
			bankNumInput.append($('<em>' + bankType + '<em>'));
		};

	});

	//验证码输入完毕之后对验证码进行校验
	$('.compareCheckNum').on('blur', function (){

		var emNode =  null;
		var $this = $(this);
		var inputCheckNum = $this.val();
		if (inputCheckNum === checkNum){
			//用户输入的验证码正确，以前提示的错误移除
			if (emNode){
				emNode.remove();
			};
		}else{
			//用户输入的验证码错误
			emNode = $('<em class=""></em>');
			emNode.html('验证码错误');
			$this.parent().append(emNode);
		};

	});


})(jQuery)