var kejieNO;
layui.config({
  base: '../../src/js/lib/'
}).extend({
  zyupload: 'zyupload'
});

layui.use(['jquery', 'form', 'upload','laydate','layer'], function() {
  var $ = layui.jquery,
  layedit = layui.layedit,
    layer = layui.layer,
  form = layui.form();

  var laydate = layui.laydate;


 form.on('select(kejieNO)', function(data){
   kejieNO = data.value;
});  



    
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


  
  var Sessionid = getCookie("JSESSIONID");
  var Lessonid= window.parent.Lessonid;

      function send(){

        $.ajax({
              dataType:'json',
              type:'POST',
              async:false,//异步关掉~！
              contentType: "application/x-www-form-urlencoded; charset=utf-8", 
              data:{title:$("#kejietitle").val(),
                    lessonId:Lessonid,
                    classNo:kejieNO,
                    lessonDescribe:$("#kejiedesc").val(),
                    startTime:$("#kejiestartime").val(),
                    endTime:$("#kejieendtime").val()
                  },       
              url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/editLessonClassInfo.action;jsessionid='+Sessionid,
              success:function(data) {
                          layer.alert('修改成功~', {
                            skin: 'layui-layer-molv' //样式类名
                            ,closeBtn: 0
                          }, function(){
                            parent.layer.closeAll();
                          });  
                                     
                  },
              error:function(data,a,b,c) {
                alert("失败啦，请重试")
                  }
                        });

  }; 
 


