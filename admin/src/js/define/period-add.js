var kejie; 
layui.config({
  base: '../../src/js/lib/'
}).extend({
  zyupload: 'zyupload'
});

layui.use(['jquery', 'form', 'upload','laydate'], function() {
  var $ = layui.jquery,
  layedit = layui.layedit,
  form = layui.form();

  var laydate = layui.laydate;
   
   form.on('select(kejieNo)', function(data){
   kejie = data.value;
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


  $(function() {
   
                $.ajax({
                    dataType:'json',
                    type:'GET',
                    data:{lessonId:Lessonid},       
                    url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getClassHour.action;jsessionid='+Sessionid,
                    success:function(data) {
                      for (var i = 0;i<data.data.classHour.length; i++) {
                           var kejieNoList = '<option value="'+data.data.classHour[i]+'">'+data.data.classHour[i]+'</option>';
                           
                           $('#kejieNo').append(kejieNoList);                           
                              var form = layui.form();
                              form.render();
                            }
                        },
                      error: function () {                  
                        alert(data.errMsg);       
                  
                  }                        
                    }); 


});  


 
      function send(){


        $.ajax({
              dataType:'json',
              type:'POST',
              async:false, 
              data:{title:$("#kejietitle").val(),
                    lessonId:Lessonid,
                    classNo:kejie,
                    lessonDescribe:$("#kejiedesc").val(),
                    startTime:$("#kejiestartime").val()+":00",
                    endTime:$("#kejieendtime").val()+":00"
                  },       
              url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/addLessonDetailClass.action;jsessionid='+Sessionid,
              success:function(data) {
             
                console.log(data.errCode)
                if (data.errCode==0) {
                   alert("提交成功");  
                 }else{
                    alert("还有项目没有填写："+data.fieldError.errMsg);  
                 }
                              
                  },
              error:function(data,a,b,c) {
                    alert("失败，请重试")
                  }    
              }); 

  }; 
 


