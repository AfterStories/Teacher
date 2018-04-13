
'use strict';
layui.use(['jquery'],function(){
	window.jQuery = window.$ = layui.jquery;
   $(".layui-canvs").width($(window).width());
   $(".layui-canvs").height($(window).height());

});



var LoginURL = "http://211.159.152.210:8188/AreTalkServer/Web/Login/"
    

    function Login() {
        var userName = $("#UserName").val();

        var password = hex_md5($("#Password").val());
        
    if (!userName || !password) {
            alert('请输入您的用户名与密码。');
            return false;
        }else{
            
                $.ajax({
                    type: "POST",
                    url: LoginURL+"login.action?userName="+userName+"&password="+password+"&userType=0",
                    data: {},
                    success: function (data) {                    
                        

                        CreateCookie(userName, password, 30);
                        CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);
                        if(data.data.status=="success"){
                            alert("登录成功！");
                            location.href="../index.html?LoginedName="+userName;
                            var isLogin = true;
                        }else{
                            alert("失败，密码错误！");
                             }
                        
                      
                        },

                    error: function () {
                        
                        alert("网络连接超时");
                        
                        
                        }
                    });
            }                 

    }
 
    function getSessionId(){  
                var c_name = 'JSESSIONID';  
                if(document.cookie.length>0){  
                   c_start=document.cookie.indexOf(c_name + "=")  
                   if(c_start!=-1){   
                     c_start=c_start + c_name.length+1   
                     c_end=document.cookie.indexOf(";",c_start)  
                     if(c_end==-1) c_end=document.cookie.length  
                     return unescape(document.cookie.substring(c_start,c_end));  
                   }  
                }  
            }  

 

        function Logout() {

    	$.post("/Services/Login.ashx?action=logout",
                { dbLogout: true },
                function (data) {
                    if (data.IsLogout) {
                        CreateCookie("verifyform", "", -1);
                        if (getCookie("VIPLogin") == "1") {
                            CreateCookie("VIPLogin", "", -1);
                            window.location.href = "/zh-CN/Index";
                        } else {
                            window.location.href = "/zh-CN/Default";
                        }
                    }
                }, "json");

                $.post("/Rewards/RewardService/Logins.ashx?action=logout",
                        { dbLogout: true },
                        function (data) {
                        }, "json");

                return false;




            
            var isLogin = false;

            if (true) {//ajax返回退出结果
                CreateCookie("verifyform", "", -1);
                if (getCookie("VIPLogin") == "1") {
                    CreateCookie("VIPLogin", "", -1);
                        $("#login").css("display", "block");
                        $(".leftBorder").css("display,block")
                        $("#logined-header").css("display", "none");
                } else {
                        $("#login").css("display", "block");
                        $(".leftBorder").css("display,block")
                        $("#logined-header").css("display", "none");

                       
            $("#dy_RegistrationChgWording").html("立即开户")
      
                }
            }else{
                alert("操作失败请稍后重试");
            }
       



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
        function setCookie(c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        }
        function deleteCookie(cname) {
            CreateCookie(cname, "", -1);
            document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        function isCookieExist(strCookieKey) {
            var cookieValue = $.cookie(strCookieKey);
            if ($.cookie(strCookieKey) == "" || $.cookie(strCookieKey) == null || $.cookie(strCookieKey) == "undefined") {
                return false;
            }
            else {
                return true;
            }
        }
        function createCookie(strCookieKey) {
            $.cookie(strCookieKey, 1,
            {
                expires: 3650
            });
        }

        function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

}
        function deleteCookie(strCookieKey) {
            $.removeCookie(strCookieKey);
        }


        $(document).keypress(function (evt) {
            evt = (evt) ? evt : ((event) ? event : null);
            var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
            if ((evt.keyCode == 13) && (node.type == "text" || node.type == "password")) {
                if (node.id == "UserName" && node.value) {
                    if ($("#Password").val()) {
                        $(".submit_btn").click();
                    } else {
                        $("#Password").focus();
                    }
                }
                if (node.id == "Password" && node.value) {
                    if ($("#UserName").val()) {
                        $(".submit_btn").click();
                    } else {
                        $("#UserName").focus();
                    }
                }

                return false;
            }
            return true;
        });
