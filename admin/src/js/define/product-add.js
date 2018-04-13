var maxCount = 200;  // 最高字数限制
$("#lessontdesc").on('keyup', function() {
    var len = getStrLength(this.value);
    $("#counter").html(maxCount-len);
})
 
// 中文字符判断
function getStrLength(str) { 
    var len = str.length; 
    var reLen = 0; 
    for (var i = 0; i < len; i++) {        
        if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) { 
            // 全角    
            reLen += 2; 
        } else { 
            reLen++; 
        } 
    } 
    return reLen;    
}


var pic1;var pic2;  

$(function() {

/*  获取语言/课程类型、下拉列表/*/
     var Sessionid = getCookie("JSESSIONID")
        $.ajax({
            dataType:'json',
            type:'GET',
            data:{},       
            url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getCommonTable.action;jsessionid='+Sessionid,
            success:function(data){
              for (var i = 0;i<data.data.lang.length; i++) {
                   var LangList = '<option value="'+data.data.lang[i].id+'">'+data.data.lang[i].name+'</option>';  
                   $('#teachLang').append(LangList);                       
                   $('#Lang').append(LangList);
                    var form = layui.form();
                  form.render(); 
                };

              for (var i = 0;i<data.data.level.length; i++) {
                   var levelList = '<option value="'+data.data.level[i].id+'">'+data.data.level[i].name+'</option>';  
                   $('#lessonlevel').append(levelList);
                    var form = layui.form();
                    form.render(); 
                }

              for (var i = 0;i<data.data.lessonType.length; i++) {
                   var typeList = '<option value="'+data.data.lessonType[i]+'">'+data.data.lessonType[i]+'</option>';  
                   $('#lessonType').append(typeList);
                   console.log(typeList)
                    var form = layui.form();
                    form.render(); 
                } 

                  var LessonType = data.data.lessonType;
                 for(var item in LessonType){

                      var TypeKey = item;
                      var Typevalue = LessonType[item];


                    if (TypeKey == 'LITTLE_CLASS') {
                      TypeKey = '小班课'
                    }else if(TypeKey == 'ONE_TO_ONE'){
                      TypeKey = '一对一';
                    }else if(TypeKey == 'VEDIO_CLASS'){
                       TypeKey = '录播课'; 
                    };
                    var typeList = '<option value="'+Typevalue+'">'+TypeKey+'</option>';
                    $('#lessonType').append(typeList);

                     console.log("typeList")
                    var form = layui.form();
                    form.render(); 
                  }               

                },
              error: function () {                  
                alert(data.errMsg);       
          
          }                        
            }); 

/*获取标签下拉列表*/
$.ajax({
dataType:'json',
type:'GET',
data:{userType:0},       
url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getLessonLabel.action;jsessionid='+Sessionid,
success:function(data) {
  var tags = data.data.LessonLabels;
  var tagsArry = [];
    for (var i = 0; i<tags.length; i++) {
        tagsArry[i] = tags[i];
    };
       //二维数组排序，以子数组的第一个元素（count 次数）为升序
        var tagsArr = tagsArry.sort(function(x, y){
        return y[0]-x[0];        
      });
 
      for (var i = 0; i<tagsArr.length;i++) {
          var tagsList = '<option value="'+tagsArr[i].labelName+'">'+tagsArr[i].labelName+'</option>';
          $('#tags-select').append(tagsList);        
          var form = layui.form();
          form.render(); 
        };

    },
  error: function () {                  
    alert(data.errMsg);       

}                        
}); 

});  





  var Lang; var teachLang;var lessonType;var tagsselect;

layui.config({
  base: '../../src/js/lib/'
}).extend({
  zyupload: 'zyupload'
});
layui.use(['jquery', 'form', 'upload','laydate',"layer"], function() {
  var $ = layui.jquery,
  layedit = layui.layedit,
  layer = layui.layer,
  form = layui.form();

  var laydate = layui.laydate;
    
 form.on('select(lessonlevel)', function(data){
   lessonlevel = data.value;
});   
 form.on('select(tags-select)', function(data){
   tagsselect = data.value;
});   
 form.on('select(Lang)', function(data){
   Lang = data.value;
});      
  
  form.on('select(teachLang)', function(data){
   teachLang = data.value;
});
  form.on('select(lessonType)', function(data){
   lessonType = data.value;
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


    
    var img1 = document.getElementById('img1'),
        img2 = document.getElementById('img2');
    var imgData = null;var imgData2 = null;
            
            
$("#img1").change(function(a){
var imgFile1 = new FileReader();  
imgFile1.readAsDataURL(img1.files[0]); 

imgFile1.onload = function() {  
  imgData = this.result;
  pic1 = imgData;       

  var pos = imgData.indexOf("4")+2;
  pic1 = imgData.substring(pos, imgData.length - pos);//去掉Base64:开头的标识字符
  }
});
                
$("#img2").change(function(a){
  var imgFile2 = new FileReader();
  imgFile2.readAsDataURL(img2.files[0]);

      imgFile2.onload = function () { 
       imgData2 = this.result;
        pic2 = imgData2;          

        var pos2 = imgData2.indexOf("4")+2;
        pic2 = imgData2.substring(pos2, imgData2.length - pos2);//去掉Base64:开头的标识字符 
            
        }; 
});

   var Sessionid = getCookie("JSESSIONID");


$("#AddlessonTagBtn").click(function () {
var AddlessonTag = $("#AddlessonTag").val();
var LessonsTags = '<div class="Ltags" id='+AddlessonTag+'>'+AddlessonTag+'<div class="DelTagBtn"><i class="layui-icon">&#x1006;</i></div></div>';
if($("#AddlessonTag").val()==""){
  layer.tips('没有填写！', '#AddlessonTag',{ tips: 3})
}else if($("#AddlessonTag").children().length<2) {
  $("#lessonTag").append(LessonsTags);
}else{
   layer.tips('最多两个标签', '#tagsshow',{ tips: 3});

}

$("#AddlessonTag").val("");
$(".DelTagBtn").click(function (){         
    $(this).parent().remove();
})  
});

$("#AddHasTagBtn").click(function () {
var AddlessonTag = tagsselect; 
var LessonsTags = '<div class="Ltags" id='+AddlessonTag+'>'+AddlessonTag+'<div class="DelTagBtn"><i class="layui-icon">&#x1006;</i></div></div>';
if ($("#lessonTag").children().length<2) {
  $("#lessonTag").append(LessonsTags);
}else{
   layer.tips('最多两个标签', '#tagsshow',{ tips: 3});

}

$(".DelTagBtn").click(function (){         
    $(this).parent().remove();
})  
});        

 function send(){

      if(pic1==null|pic2==null){
        alert("还有封面图或详情图没有上传 The cover image or detail image is not uploaded")
        return;
      }

        var lessontitle = $("#lessontitle").val(),
            lessonduration = $("#lessonduration").val(),
            lessonhour = $("#lessonhour").val(),
            lessonStudents = $("#lessonStudents").val(),
            startime = $("#startime").val()+":00",
            endtime = $("#endtime").val()+":00",
            singleprice = 1/*$("#singleprice").val()*/,
            sumprice = 10/*$("#sumprice").val()*/,
            cardNum = $("#cardNum").val(),
            lessontdesc = $("#lessontdesc").val();
            var CardNumparseInt = parseInt(cardNum);

  if (CardNumparseInt<=0) {
       alert('必须大于0');
       return;
      }


  
$("#btn-newLesson").addClass("layui-btn-disabled");


         $.ajax({
              dataType:'json',
              type:'POST', 
              async:false,
              data:{langLevel:lessonlevel,
                    title:lessontitle,                    
                    type:lessonType,
                    classhour:lessonhour,
                    duration:lessonduration,
                    totalStudentCount:lessonStudents,
                    langId:Lang,
                    teachLangId:teachLang,
                    singlePrice:singleprice,
                    singleCard:cardNum,
                    totalPrice:sumprice,
                    lessonDescribe:lessontdesc,
                    startTime:startime,
                    endTime:endtime,
                    avatarC:pic1,
                    avatarD:pic2
                  },

              url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/addLesson.action;jsessionid='+Sessionid,
              success:function(data) {
                            var Lessonid = data.data.lessonId;
                            var lessonLabels = new Array();
                          
                            $(".Ltags").each(function(){
                              var i= $(this).index();
                              var s = $(this).text();
                              s = s.substr(0, s.length-1);
                              lessonLabels.push(s);
                            })
                          
                                   

 //加标签


                          $.ajax({
                                dataType:'json',
                                type:'POST', 
                                async:false,
                                traditional:true,
                                data:{lessonId:Lessonid,lessonLabels:lessonLabels},       
                                url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/setLessonLabel.action;jsessionid='+Sessionid,
                                success:function(data) {
                                            $("#btn-newLesson").removeClass("layui-btn-disabled")
                                    },
                                error:function(data) {
           
                                    }
                                });                         


                          layer.alert('添加课程成功~', {
                            skin: 'layui-layer-molv' //样式类名
                            ,closeBtn: 0,
                            offset: '100px'
                          }, function(){
                            parent.layer.closeAll();
                          });              
                  },
              error:function(data,a,b,c) {
                alert("网络开小差儿啦，请稍后重试");
                  }
              }); 




         
 }; 



