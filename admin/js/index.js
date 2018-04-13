'use strict';
function OpenNewTab(data)
{
 var navtab = layui.navtab({
      elem: '.larry-tab-box'
});


    navtab.tabAdd(data);
}


layui.use(['jquery','layer','element', 'navtab'],function(){
	window.jQuery = window.$ = layui.jquery;
	window.layer = layui.layer;
  var element = layui.element();
  

// larry-side-menu向左折叠
$('.larry-side-menu').click(function() {
  var sideWidth = $('#larry-side').width();
  if(sideWidth === 200) {
      $('#larry-body').animate({
        left: '0'
      }); //admin-footer
      $('#larry-footer').animate({
        left: '0'
      });
      $('#larry-side').animate({
        width: '0'
      });
  } else {
      $('#larry-body').animate({
        left: '200px'
      });
      $('#larry-footer').animate({
        left: '200px'
      });
      $('#larry-side').animate({
        width: '200px'
      });
  }
});

         function getCookie(c_name) {
            var c_value = document.cookie;
            var c_start = c_value.indexOf(" " + c_name + "=");
            if (c_start == -1) {
                c_start = c_value.indexOf(c_name + "=");
            }
            if (c_start == -1) {
                c_value = null;
            }
            else {
                c_start = c_value.indexOf("=", c_start) + 1;
                var c_end = c_value.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = c_value.length;
                }
                c_value = unescape(c_value.substring(c_start, c_end));
            }
            return c_value;
        }

            
            var LoginedName = GetQueryString("LoginedName");
            var PASW = getCookie(LoginedName);
            function GetQueryString(name){
                 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                 var r = window.location.search.substr(1).match(reg);
                 if(r!=null)return  unescape(r[2]); return null;
            } 
    function getCookie(c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
      c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
      c_value = null;
  }
  else {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1) {
          c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}
           
 var Sessionid = getCookie("JSESSIONID");   

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}         
$(function(){

$("#TeacherName").html(GetQueryString("LoginedName")) 

   // 刷新iframe操作
    $("#refresh_iframe").click(function(){
       $(".layui-tab-content .layui-tab-item").each(function(){
          if($(this).hasClass('layui-show')){
             $(this).children('iframe')[0].contentWindow.location.reload(true);
          }
       });
    });
   $('#lock').mouseover(function(){
   	   layer.tips('用于暂时离开电脑时锁定屏幕', '#lock', {
             tips: [1, '#FF5722'],
             time: 1000
       });
   })
   // 快捷键锁屏设置
    $(document).keydown(function(e){
         if(e.altKey && e.which == 76){
         	 lockSystem();
         }
    });
   function startTimer(){
   	    var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        $('#time').html(h+":"+m+":"+s);
        var t = setTimeout(function(){startTimer()},500);
   }
   // 锁屏状态检测
   function checkLockStatus(locked){
        // 锁屏
        if(locked == 1){
        	$('.lock-screen').show();
            $('#locker').show();
            $('#layui_layout').hide();
            $('#lock_password').val('');
        }else{
        	$('.lock-screen').hide();
            $('#locker').hide();
            $('#layui_layout').show();
        }
    }

   checkLockStatus('0');
   // 锁定屏幕


   function lockSystem(){
   		
   	 
 
   	   	 checkLockStatus(1);
   	 
     	   startTimer();
   }


   //解锁屏幕
   function unlockSystem(){
        // 与后台交互代码已移除，根据需求定义或删除此功能
        
   	    checkLockStatus(0);
    }
   // 点击锁屏
   $('#lock').click(function(){
   	    lockSystem();
   });
   // 解锁进入系统
   $('#unlock').click(function(){
        unlockSystem();
   });
   // 监控lock_password 键盘事件
   $('#lock_password').keypress(function(e){
        var key = e.which;
        if (key == 13) {
            unlockSystem();
        }
    });

function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

}
function deleteCookie(cname) {
            CreateCookie(cname, "", -1);
            document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
   $('#exit').click(function(){

      $.ajax({
         type: "POST",
         url: 'http://211.159.152.210:8188/AreTalkServer/Web/Login/logout.action;jsessionid='+Sessionid,
         data: {},
         success: function (data) {
          deleteCookie("JSESSIONID");
          deleteCookie(LoginedName);
           alert("已退出")
           location.href="../../OfficialWebsite/TeacherLogin.html";
            var isLogin = false;},
           error: function () {
           lert(data.errMsg);
           }
       });

  });



});


});
