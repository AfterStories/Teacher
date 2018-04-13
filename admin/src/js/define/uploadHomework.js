
var UpLoadURL = 'http://211.159.152.210:8188';

var ClassNo_homework = GetQueryString("ClassNo_homework");
var Sessionid = getCookie("JSESSIONID");
var Lessonid= window.parent.Lessonid;
var tr

$(function () {

layui.use(['table', 'form'], function(){
  var form = layui.form;
  var table = layui.table;
    var IsOwner = "1";
    form.on('switch(switchTest)', function(data){

        console.log(data.elem.checked); //开关是否开启，true或者false

        if(data.elem.checked){
             IsOwner = "1";
        }else{
            IsOwner = null;
        }

    });



    //监听提交
form.on('submit', function(data){
    var GetEx = data.field

    //console.log(GetEx) 当前容器的全部表单字段，名值对形式：{name: value}
   // var keyWords = data.field.keyWords;
    var keyWords = $("#keyWords").val();


    var type = GetEx.type;
    var level =GetEx.level;
	console.log(keyWords);console.log(IsOwner);console.log(type);console.log(level);


$.ajax({
  	type:'POST',
  	data:{keyWords:keyWords,isOwner:IsOwner,type:type,level:level},       
  	url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/findQuestions.action;jsessionid='+Sessionid,
  	success:function(data) {

  	  console.log(data.data.Questions);
  	  var TableDate = data.data.Questions;


//执行渲染
table.render({
  elem: '#ExTable', //指定原始表格元素选择器（推荐id选择器）
  height: 600, //容器高度
  cols:  
  [[ //标题栏
      
    {field: 'questionDescribe', title: '题目', width: 500, rowspan: 2,align: 'center'}, //rowspan即纵向跨越的单元格数
    {field: 'realAnswer', title: '答案', width: 80, rowspan: 2,align: 'center'},       
    {field: 'answerA', title: 300, title: 'A',width: 120,align: 'center'},
    {field: 'answerB', title: 300, title: 'B',width: 120,align: 'center'},
    {field: 'answerC', title: 300, title: 'C',width: 120,align: 'center'},
    {field: 'answerD', title: 300, title: 'D',width: 120,align: 'center'},
    {fixed: 'right', width:100, align:'center', toolbar: '#chooseBtn'}
     //这里的toolbar值是模板元素的选择器
  ]],
  
  page: true,
  limit: 60,
  data:TableDate

}); 
  

 //监听工具条
		table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		  var data = obj.data; //获得当前行数据
		  var layEvent = obj.event; //获得 lay-event 对应的值
		   tr = obj.tr; //获得当前行 tr 的DOM对象
		 
		  if(layEvent === 'chooseBtn'){ //查看
		   
		    var questionId = data.questionId
			
			if (tr.find(".layui-btn").attr("disabled") == "disabled") {
				alert("已经添加过此题")
			}else{
				addHomeworkQuestion(questionId);
			}
			
		  } 
		
		});
		
},
          error: function () {                  
                                   
                }                        
       }); //ajax结束

return false
});//form.on结束
  


});//layui.use结束

});//$(function (){}结束


function addHomeworkQuestion(questionId){
	$.ajax({
	  	type:'POST',
	  	data:{lessonId:Lessonid,classNo:ClassNo_homework,questionId:questionId},       
	  	url: UpLoadURL+'/AreTalkServer/Web/Api/addHomeworkQuestion.action;jsessionid='+Sessionid,
	  	success:function(data) {
				if (data.data.status=="success") {
					alert("已成功将本题选为本课作业题");
					tr.find(".layui-btn").removeClass("layui-btn-danger").addClass("layui-btn-disabled");
					tr.find(".layui-btn").attr('disabled',"true")
				}else{
					alert("登录超时请重新登陆再试")
				}
				
		},
	    error: function () {                  
	                                   
	    }                        
	});
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
  

function GetQueryString(name){
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if(r!=null)return  unescape(r[2]); return null;
} 