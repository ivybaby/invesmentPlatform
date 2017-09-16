(function($){
	
	$.fn.inFocus=function(){
		$(this).focus(function(){
			$(this).val("");
		})
	}
	

	/*跳转到另一界面*/
	$.fn.ahrefTarget=function(){
 	    self.location.href=$(this).attr("datasrc");
	}
	/*搜索*/
	$.fn.getSearch=function (){
		$(this).find("input").on("focus keypress",function(){
			if($(this).val().length>0){
				$(this).closest(".search-bar").children(".cancel-icon").show();
			}
		});
		
		$(this).children(".cancel-icon").on("click",function(e){
			e.preventDefault();
			$(this).prev("input").val("").focus();
		})
	}
	var opt,option,opts,opti;
	/*登录*/
	$.fn.login=function(options){
	    opti = $.extend({}, $.fn.login.defaults, options);
		
		if($(opti.userTel).val()==null||$(opti.userTel).val()!=15968172193){
			$(opti.textShow).text("您输入的账户不存在!");
			$(opti.userTel).val("").focus();
		}else if($(opti.userPwd).val()==null||$(opti.userPwd).val()!=123456){
			$(opti.textShow).text("密码错误！");
			$(opti.userPwd).val("").focus();
		}else if(($(opti.userTel).val()==15968172193)&&($(opti.userPwd).val()==123456)){
			$(opti.textShow).text("");
			window.location.href="index.html";	
		}
		
	}
	function stopPropagation(e) { 
            if (e.stopPropagation) 
               e.stopPropagation(); 
            else 
               e.cancelBubble = true; 
        } 
	
	
	
	$.fn.modal=function(options){//遮罩
		opt = $.extend({}, $.fn.modal.defaults, options);
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop; //滚动的高度
		var screenHeight=document.body.scrollHeight;//屏幕的高度
		var screenWidth=document.body.scrollWidth;//屏幕的宽度
		
		if(opt.maskShadow){
			$(opt.maskName).css({"display":"block"});
			$(this).css({"display":"block"});
			                   	    
            $("body").css({"overflow-y":"hidden"});
            var permit=0;
            document.body.addEventListener('touchmove', function (event) {//阻止下滑
                if(permit==0){
                	event.preventDefault();
                }
            }, false);
            $(opt.maskName).css("top",scrollTop);
			if(opt.actionBottom&&!opt.actionCenter){
				$(this).css({"bottom":0-scrollTop});
			}else{
				if(opt.positionFix){
					var hSpace=screenHeight-$(opt.bgLong).offset().top;
					$(opt.bgLong).css({"height":hSpace+"px"});
				}else{
				   $(this).css({"top":parseInt((screenHeight-$(this).outerHeight())/2)+"px","left":parseInt((screenWidth-$(this).outerWidth())/2)+"px"});
				}
			};
			$(opt.maskName).on('click',function(){ 
				if(opt.positionFix){
					$(""+opt.targetObject+","+opt.maskName+"").css({"display":"none"});
				}else{
				  $(""+opt.targetObject+","+opt.maskName+"").css({"display":"none"});
				  $(opt.targetObject).css({"bottom":-200+scrollTop});
				}
				$("body").css({"overflow-y":"scroll"});
				permit=1;
            }); 
			
		}
	}
	//tab 轮换
	$.fn.tab=function(options){//tab
		opt = $.extend({}, $.fn.tab.defaults, options);
		$(opt.tabContent).hide();
		$(opt.tabItem).each(function(){
			if($(this).hasClass("tab-item-active")){
				var $itemHref=$(this).attr("href");
				$($itemHref).show();
				return;
			}
		});
		$(opt.tabItem).on("click",function(e){
			e.preventDefault();
			if($(this).hasClass("tab-item-active")){
				return;
			}
			else{
				$(opt.tabItem).removeClass("tab-item-active");
			    $(this).addClass("tab-item-active");
			    $(opt.tabContent).hide();
			    $($(this).attr("href")).show();
			}
			
		})
		
	}
	function clearInput($obj){//清除input内容
		$obj.find("input").each(function(){
			$(this).focus(function(){
				$(this).val("").removeClass("text-danger");
			})
		})
	}
	//修改密码
	$.fn.modifyPwd=function(options){
		var step1=0,step2=0,step3=0,step4=0;
		opt = $.extend({}, $.fn.tab.defaults, options);
		clearInput($(this));
		$(opt.textAlert).hide();
		var $nuserPwd=$("#user_pwd_n");
		var regx= /(^[A-Za-z0-9]{6,11}$)/;
 			
		$nuserPwd.blur(function(){
			if($nuserPwd.val().length==0){
		    	$(opt.textAlert).text("新密码为空！").show();
		    	 return;
		    }else{
		    
 			if(regx.test($(this).val())){
		    	step3=1;
		    	$(opt.textAlert).hide();
		    }else{
		    	$(opt.textAlert).text("格式错误").show();
			    return;
		    }
		  }
		  
		});
	    var userTel_data=15968172193;
	    var ouserPwd_data=111111;
 		
 		
 		
		$(".btn-save").on("click",function(e){
			e.preventDefault();
 			var $ouserPwd=$("#user_pwd_o");
 			var $userTel=$("#user_tel");
 			var $suserPwd=$("#user_pwd_sure");
            if(!opt.small)
            {
               if($userTel.val()==null||$userTel.val()!=userTel_data){
			      $userTel.val("账号不存在！").addClass("text-danger");
			      return;
		      }else{step1=1;}

		      if($ouserPwd.val()==null||$ouserPwd.val()!=ouserPwd_data){
			      $(opt.textAlert).text("原密码错误！").show();
			      return;
		      }else{step2=1;$(opt.textAlert).hide();}
		    
            }
 			if($nuserPwd.val().length==0){
		    	$(opt.textAlert).text("新密码为空！").show();
		    	 return;
		    }
 			
		    if($suserPwd.val()!=$nuserPwd.val()){
		    	$(opt.textAlert).text("两次密码不一致").show();
		    	 return;
		    }else{step4=1;}
		  
		    if(step1&step2&step3&step4||(step3&step4&opt.small)){
		       	   self.location.href="../login.html";
		    	   $(opt.textAlert).hide();
		    	
		    }
		 
		   		
		   		
 		})
	}
	
	$.fn.forgetPwd=function(options){//忘记密码
		option = $.extend({}, $.fn.tab.defaults, options);
		
		var sData=15968172193;
 		$(option.btnCode).siblings("input").bind({
           keyup: function() {
              if($(this).val().length==11){
                 $(option.btnCode).css({"border-color":"#008ce6","color":"#008ce6"})
              }
           }
        });
        /*计时*/
       if(option.forget){
       	$(option.textShow).hide(); 
       }else{
       	$(option.textShow).show(); 

       }
        var countdown=60; 
        function settime(obj) { 
          if (countdown == 0) {   
             obj.text("重新获取").removeClass("text-danger").css({"border":"solid 1px #008ce6"}); 
             countdown=60;
             return;
          } else { 
             obj.addClass("text-danger").css({"border":"solid 1px #ff0000"}).text("重新发送(" + countdown + "s)"); 
             countdown--; 
          } 
         setTimeout(function() { 
            settime(obj); },1000) 
       }
        $(option.btnCode).on("click",function(e){
        	e.preventDefault();
        	if($(this).siblings("input").val()!=sData){
        		$(option.textShow).text("当前用户不是系统用户，请确认后再输入！").show();
        		return;
        	}
        	$(option.textShow).hide();
            settime($(this));
        });
        $(option.btnNext).on("click",function(e){
        	e.preventDefault();
        	e.stopPropagation();//防止触发冒泡
        	var $vcode=$(option.codeNum);
        	if($(option.btnCode).text()=="重新获取"){
        		$(option.textShow).text("验证码输入错误！").show();
        	}else{
        		if($vcode.val()==null||$vcode.val()!=111111){
        		    $(option.textShow).text("验证码输入错误！").show();
        	    }else{
        	    	if(option.forget){
        	    		self.location.href="smodifyPwd.html";
        	    	}
        	    	else{
        	    		self.location.href="personalCenter.html";
			         /*$(option.alertTarget).modal({
				         maskShadow:true,
				         actionBottom:true,
				         actionCenter:true
			          });*/
	
        	    	}
        		    
        	    }

        	}
        })
		
	};
	$.fn.userConfirm=function(options){//修改手机号后返回个人中心确认账户
 			opts = $.extend({}, $.fn.userConfirm.defaults, options);
 			var data=15968172193;
 			if(data==15968172193){
 				$("#bWorning").modal({
 					     maskName:"#mask",
				         targetObject:"#bWorning",
				         maskShadow:true,
				         actionBottom:true,
				         actionCenter:true
			          });
			     return;
 			}
 		}
	
	
	
})(jQuery)