var UploadVideoURL = 'http://47.91.91.83:8080';

/*var UploadVideoURL = 'http://192.168.1.215:8080';*/
var UpLoadURL = 'http://211.159.152.210:8188';
var ClassNo_Video
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

ClassNo_Video = GetQueryString("ClassNo_Video");
var Sessionid = getCookie("JSESSIONID");
var Lessonid= window.parent.Lessonid;


  function GetQueryString(name){
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if(r!=null)return  unescape(r[2]); return null;
  } 

    function getFileName(name){
     var json = name.split(".")
     return json[1];
    }


$(function () {
    /*'use strict';*/

$('.fileupload').each(function (){
    // Initialize the jQuery File Upload widget:
    $(this).fileupload({
        //Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: UploadVideoURL+'/AreTalkUploadVideo/UploadHandleServlet',
        disableImageResize: false, 
        //预览图片尺寸
        previewMinWidth:200,
        previewMinHeight:100,
        previewMaxWidth:400,
        previewMaxHeight:150,        
       
        change: function(e, data) {
                if(data.files.length > 1){
                    alert("Max 1 file are allowed selected")
                    return false;
                }
            }
    })
})

/*
上传配置
*/




$('#lessonVideo-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data){
          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);         
          console.log(exerciseID)
          uploadLessonVideoID(exerciseID);
          
            
        });  


        // Load existing files:
        $('.fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('.fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('.fileupload')[0]
        }).always(function () {
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $(this).fileupload('option', 'done')
              .call(this, $.Event('done'), {result: result});          
        });
  

});



/*

/Web/Api/uploadLessonVideo.action   lessonId classNo fileId   录播课上传
uploadLessonRecording   回放

*/


/*回放*/
function UploadLessonID(id){
    $.ajax({
        type:'POST',
        data:{
          lessonId:Lessonid,
          classNo:ClassNo_Video,
          fileId:id
          },       
      url: UpLoadURL+'/AreTalkServer/Web/Api/uploadLessonRecording.action;jsessionid='+Sessionid,
      success:function(data) {
        alert("上传成功")
          },
      error:function() {
        alert("失败~请重试")
          }
      }); 
}
/*录播课视频*/
function uploadLessonVideoID(id){
    $.ajax({
        type:'POST',
        data:{
          lessonId:Lessonid,
          classNo:ClassNo_Video,
          fileId:id
          },       
      url: UpLoadURL+'/AreTalkServer/Web/Api/uploadLessonVideo.action;jsessionid='+Sessionid,
      success:function(data) {
        alert("上传成功")
          },
      error:function() {
        alert("失败~请重试")
          }
      }); 
}