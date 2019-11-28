function firstPage() {
	var url = $("#pageUrl").val();
	url = url.replace("*pageNumber*", "1");
	window.location.href = url
}
function lastPage() {
	var dataCount = $("#dataCount").val();
	var url = $("#pageUrl").val();
	url = url.replace("*pageNumber*", dataCount);
	window.location.href = url
}
function pageDown() {
	var pageIndex = $("#pageIndex").val();
	var url = $("#pageUrl").val();
	pageIndex = parseInt(pageIndex) - 1;
	url = url.replace("*pageNumber*", pageIndex);
	window.location.href = url
}
function pageUp() {
	var pageIndex = $("#pageIndex").val();
	var url = $("#pageUrl").val();
	pageIndex = parseInt(pageIndex) + 1;
	url = url.replace("*pageNumber*", pageIndex);
	window.location.href = url
}
function skip() {
	var dataCount = $("#dataCount").val();
	var searchPageNum = $("#searchPageNum").val();
	var url = $("#pageUrl").val();
	var pattern = /^[1-9][0-9]*$/;
	if (pattern.test(searchPageNum)
			&& parseInt(searchPageNum) <= parseInt(dataCount)) {
		url = url.replace("*pageNumber*", searchPageNum);
		window.location.href = url
	} else {
		url = url.replace("*pageNumber*", "1");
		window.location.href = url
	}
}
function searchWord() {
	var kw = $("#keyWord").val();
	var url = "/get-search-page-*keyWord*-.html";
	url = url.replace("*keyWord*", kw);
	window.location.href = url
}
function saveComment() {
	var username = $("#author").val();
	var email = $("#email").val();
	var blog_url = $("#url").val();
	var comtent = $("#comment").val();
	var emailPatten = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	var comtentPatten = /[一-龥豈-鶴]/;
	if (username == null || username == "") {
		layer.msg("请输入您的名字!")
	} else {
		if (!emailPatten.test(email)) {
			layer.msg("请输入正确的邮箱,博主回复将通过邮箱通知您!")
		} else {
			if (!comtentPatten.test(comtent) || comtent == null
					|| comtent == "") {
				layer.msg("亲,请认真填写留言!")
			} else {
				$("#loadPage").css("display", "block");
				$
						.ajax({
							type : "post",
							url : "/insert-blog-comment.ajax",
							data : {
								username : username,
								email : email,
								blog_url : blog_url,
								comtent : comtent
							},
							dataType : "json",
							success : function(json) {
								if (json.error_code == 0) {
									$("#loadPage").css("display", "none");
									var time = new Date();
									var m = time.getMonth() + 1;
									var t = time.getFullYear() + "-" + m + "-"
											+ time.getDate() + " "
											+ time.getHours() + ":"
											+ time.getMinutes() + ":"
											+ time.getSeconds();
									var temp = "<li class='comment byuser comment-author-zhw2590582 bypostauthor even thread-even depth-1 clearfix' id='li-comment-22'>"
											+ "<div class='comment-block' id='comment-22'>"
											+ "<div class='author-img'><img src='img/blog/default-avatar.png' data-echo='img/blog/default-avatar.png' class='avatar avatar-100' height='100' width='100'></div>"
											+ "<div class='comment-body clearfix'>"
											+ "<div class='comment-name'>"
											+ "<span class='arrow left'></span>"
											+ "<cite class='fn'>"
											+ username
											+ "</cite><span class='fr'>刚刚发表</span>"
											+ "</div>"
											+ "<div class='comment-text'>"
											+ "<p>"
											+ json.resp_data
											+ "</p>"
											+ "</div><div class='comment-info clearfix'><span class='comment-date'>"
											+ "<a class='comment-time' href='javascript:void(0)'>"
											+ t
											+ "</a>"
											+ "</span>"
											+ "<span class='comment-edit'></span></div></div></div></li>";
									layer.msg("恭喜,留言成功!");
									$("#commentTarget").append(temp);
									$("#author").val("");
									$("#email").val("");
									$("#url").val("");
									$("#comment").val("")
								} else {
									if (parseInt(json) == -4) {
										window.location.href = "index.html"
									} else {
										$("#loadPage").css("display", "none");
										layer.msg(json.error_msg)
									}
								}
							}
						})
			}
		}
	}
}
function addApplyFriendLink() {
	var friendLink = $("#friendLink").val();
	var LinkName = $("#LinkName").val();
	var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
	if (!reg.test(friendLink)) {
		layer.msg("请输入正确的网站地址！");
		return false
	}
	if (LinkName == null || LinkName == "" || LinkName.length < 1
			|| LinkName.length > 10) {
		layer.msg("请输入正确的网站名称,长度在1-10！");
		return false
	}
	$.ajax({
		type : "post",
		url : "/addApplyFriendLink.ajax",
		data : {
			link : friendLink,
			name : LinkName
		},
		dataType : "json",
		success : function(json) {
			if (json.error_code == 0) {
				layer.msg("提交申请成功!");
				$("#friendLink").val("");
				$("#LinkName").val("");
				var $modal = $(".cd-user-modal");
				$modal.removeClass("is-visible")
			} else {
				layer.msg(json.error_msg)
			}
		}
	})
};

/** 搜索关键词手机端 **/
function searchWordPhone() {
	var kw = $("#keyWordPhone").val();
	var url = "/get-search-page-*keyWord*-.html";
	url = url.replace("*keyWord*", kw);
	window.location.href = url;
}

//重新获得验证码
function reloadImgCode() {
	$("#imgCode").attr('src', "/mgr/image_code.html?time=" + new Date().getTime());
}

//重新获得验证码
function reloadImgCodeLogin() {
	$("#imgCodeLogin").attr('src', "/mgr/image_code.html?time=" + new Date().getTime());
}

/** 检查邮箱正确性 **/
function checkEmail() {
	var re = /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// 获得邮箱
	var regEmail = $("#regEmail").val();
	if ($("#sendCode").html() == '发送验证码') {
		if (re.test(regEmail)) {
			$("#sendCode").css("color","#1a98fc");
			$("#sendCode").attr("disabled",false);
		} else {
			$("#sendCode").css("color","#bfbfbf");
			$("#sendCode").attr("disabled","disabled");
		}
	}
}

/** 发送邮箱验证码 **/
var countdown = 60;
function sendEmailCode() {
	// 发送验证码
	if (countdown == 60) {
		$.ajax({
			type : "post",
			async : false,
			url : "/user/sendemailcode.ajax",
			data : {
				email : $("#regEmail").val()
			},
			dataType : "json",
			success : function(json) {
				if (json.error_code == 0) {
					layer.msg("验证码发送成功!");
				} else {
					layer.msg(json.error_msg)
				}
			}
		})
	}
    if (countdown == 0) {
    	$("#sendCode").attr("disabled",false);
    	$("#sendCode").html("发送验证码");
        countdown = 60;
    } else {
    	$("#sendCode").attr("disabled","disabled");
    	$("#sendCode").html("重新发送(" + countdown + ")");
        countdown--;
        setTimeout(function() {
        	sendEmailCode()
        },1000)
    }
}

/** 注册 **/
function reg() {
	//验证邮箱正则
	var re = /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// 获得邮箱
	var regEmail = $("#regEmail").val();
	if (!re.test(regEmail)) {
		layer.msg("请输入正确的邮箱！");
		return false;
	}
	// 邮箱验证码
	var regEmailCode = $("#regEmailCode").val();
	if (regEmailCode == null || regEmailCode == '' || regEmailCode.length != 6) {
		layer.msg("请输入接收到的邮箱验证码！");
		return false;
	}
	// 密码1
	var regPassword1 = $("#regPassword1").val();
	// 密码2
	var regPassword2 = $("#regPassword2").val();
	if (regPassword1 == null || regPassword1 == '') {
		layer.msg("请输入密码！");
		return false;
	}
	if (regPassword1 != regPassword2) {
		layer.msg("两次次密码输入的不一样！");
		return false;
	}
	// 验证码
	var regCode = $("#regCode").val();
	if (regCode == null || regCode == '') {
		layer.msg("请输入验证码！");
		return false;
	}
	$.ajax({
		type : "post",
		async : false,
		url : "/user/reg.ajax",
		data : {
			password : regPassword1,
			password1 : regPassword2,
			email : regEmail,
			code : regCode,
			emailCode : regEmailCode
		},
		dataType : "json",
		success : function(json) {
			if (json.error_code == 0) {
				layer.msg("注册成功!");
				$("#login-part").css("display","block");
				$("#reg-part").css("display","none");
			} else {
				layer.msg(json.error_msg)
				reloadImgCode();
			}
		}
	})
}

/** 登录 **/
function doLogin() {
	// 获得邮箱
	var loginEmail = $("#loginEmail").val();
	//验证邮箱正则
	var re = /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(loginEmail)) {
		layer.msg("请输入正确的邮箱！");
		return false;
	}
	// 密码
	var loginPassword = $("#loginPassword").val();
	if (loginPassword == null || loginPassword == '') {
		layer.msg("请输入密码！");
		return false;
	}
	// 验证码
	var loginCode = $("#loginCode").val();
	if (loginCode == null || loginCode == '' || loginCode.length != 4) {
		layer.msg("请输入验证码！");
		return false;
	}
	$.ajax({
		type : "post",
		async : false,
		url : "/user/login.ajax",
		data : {
			password : loginPassword,
			email : loginEmail,
			code : loginCode
		},
		dataType : "json",
		success : function(json) {
			if (json.error_code == 0) {
				layer.msg("登录成功!");
				location.reload();
			} else {
				layer.msg(json.error_msg)
				reloadImgCodeLogin();
			}
		}
	})
}

/** 退出登录 **/
function exitLogin() {
	$.ajax({
		type : "post",
		async : false,
		url : "/user/exitlogin.ajax",
		data : {
		},
		dataType : "json",
		success : function(json) {
			if (json.error_code == 0) {
				location.reload();
			} else {
				layer.msg(json.error_msg)
			}
		}
	})
}
var bavigation = 0;
/** 改变手机端导航子集 **/
function showPhoneNavigation(id) {
	// 移除所有显示
	$(".navigation-type-show").each(function(ii,vv){
		$(this).css("display", "none");
	});
	if (bavigation != id) {
		$('li[name=navigation' + id +']').each(function(ii,vv){
			$(this).css("display", "block");
		});
		bavigation = id;
	} else {
		bavigation = 0;
	}
}