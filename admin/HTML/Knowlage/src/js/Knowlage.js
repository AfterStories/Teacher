function GetQueryString(name)
{
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



var AjaxURL = 'http://211.159.152.210:8188';
var userToken = GetQueryString("userToken");


$(document).ready(function(){
	
layui.use(['form','upload'], function(){
  var upload = layui.upload;
   
  //执行实例
  var upload1 = upload.render({
    elem: '#upload1' //绑定元素
    ,url: AjaxURL + '/AreTalkServer/Servlet/UploadHandleServlet'//上传接口
    ,accept:'images'
    ,done: function(res){
      var thisid = res.files[0].id;
    
      $("#upload1").attr("UploadId",thisid)
      alert("上传成功");
    }
    ,error: function(){
      //请求异常回调
    }
  });

    var upload2 = upload.render({
    elem: '#Knowlage1_IMG' //绑定元素
    ,url: AjaxURL + '/AreTalkServer/Servlet/UploadHandleServlet'//上传接口
    ,accept:'images'
    ,done: function(res){
      var thisid = res.files[0].id;
      var thisrc = 'http://211.159.152.210:8188' + res.files[0].url;
      $("#Knowlage1_IMG").attr("UploadId",thisid);
      $("#Knowlage1_pic").attr("src",thisrc);
      alert("上传成功");
    }
    ,error: function(){
      //请求异常回调
    }
  });

    var upload3 = upload.render({
    elem: '#zi' //绑定元素
    ,url: AjaxURL + '/AreTalkServer/Servlet/UploadHandleServlet'//上传接口
    ,accept:'images'
    ,done: function(res){
      var thisid = res.files[0].id;
      var thisrc = 'http://211.159.152.210:8188' + res.files[0].url; 
      $("#zi").attr("UploadId",thisid);
   
      $("#Knowlage2_IMG").attr("src",thisrc);
      alert("上传成功");
    }
    ,error: function(){
      //请求异常回调
    }
  });

    var uploadmp3_1 = upload.render({
    elem: '#mp3Btn1' //绑定元素
    ,url: AjaxURL + '/AreTalkServer/Servlet/UploadHandleServlet'//上传接口
    ,accept:'audio'
    ,done: function(res){
      var thisid = res.files[0].id;
    
      $("#mp3Btn1").attr("UploadId",thisid);
      alert("上传成功");
    }
    ,error: function(){
      //请求异常回调
    }
  });


    var uploadmp3_2 = upload.render({
    elem: '#mp3Btn2' //绑定元素
    ,url: AjaxURL + '/AreTalkServer/Servlet/UploadHandleServlet'//上传接口
    ,accept:'audio'
    ,done: function(res){
      var thisid = res.files[0].id;
    
      $("#mp3Btn2").attr("UploadId",thisid);
      alert("上传成功");
    }
    ,error: function(){
      //请求异常回调
    }
  });


});



/*
$.ajax({
    type: "GET",
    url: AjaxURL+"findExerciseKnowledge.action",
    data: {},
    success: function (data) {
 
        },
    error: function (a,b,c) {
           alert("网络超时，请重试");
         }

   });
*/



});


