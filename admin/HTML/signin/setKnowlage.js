
var AjaxURL = "http://192.168.2.87:8188";

var Sessionid = getCookie("JSESSIONID");
var TableDate 

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}


var Curtime = new Date().Format("yyyy-MM-dd");
var CurtMon = new Date().Format("yyyy-MM-");


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


var marked = {};
var chooseDay;

$(function(){

//获取到所有的知识点

   $.ajax({

       type:'POST',
       async: false,
       data:{debug:1,userType:0,userId:'1723'},    
       url: AjaxURL+'/AreTalkServer/Web/Api/getExerciseKnowledge.action;jsessionid='+Sessionid,
       success:function(data) {
          TableDate = data.data.knowledgeList;
       }                   
   }); 

//获取到所有的已布置

   $.ajax({
       async: false,
       type:'POST',
       data:{debug:1,userType:0,userId:'1723',startTime:Curtime+' 00:00:00'},    
       url: AjaxURL+'/AreTalkServer/Web/Api/getSigninDateKnowledgeList.action;jsessionid='+Sessionid,
       success:function(data) {

                for(var item in data.data.signInData.details) {
                   marked[CurtMon+item] = item+'-'+data.data.signInData.details[item].title
                }
                  console.log(marked)
       }                   
   }); 




    layui.use(['table','layer','table'], function(){
      var laydate = layui.laydate;
      var layer = layui.layer;


      //日历渲染
      laydate.render({
        elem: '#calendar',
        showBottom: false,
        position: 'static',
        mark:marked,
        ready: function(date){
              chooseDay = Curtime+" 00:00:00";
        },
        done: function(value, date){
              //JSON.stringify(date)
              chooseDay = value+" 00:00:00";

        }

      }); 


//渲染表格
var table = layui.table;

table.render({
  elem: '#Table', //指定原始表格元素选择器（推荐id选择器）
  height: 600, //容器高度
  cols:  
  [[ //标题栏
    {field: 'id',title: 'ID',width:50,align: 'center'},      
    {field: 'title', title: '标题', width: 250,rowspan: 2,align: 'center'}, //rowspan即纵向跨越的单元格数
    {field: 'charImgUrl',title: '认字',width: 200,align: 'center',templet: '#charImgUrl'},
    {field: 'sentence1', title: '句子1', width: 300,rowspan: 2,align: 'center'},
    {field: 'sentence2', title: '句子2', width: 300,rowspan: 2,align: 'center'},
    {fixed: 'right', title: '操作',width:100, align:'center',toolbar: '#chooseBtn'}
     //这里的toolbar值是模板元素的选择器
  ]],
  page: true,
  limit: 100,
  data:TableDate

}); 
  

 //监听工具条
    table.on('tool(Table)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值
      tr = obj.tr; //获得当前行 tr 的DOM对象
     
      if(layEvent === 'chooseBtn'){ //查看     

        knowledgeId = data.id;

        SetKnowlage(knowledgeId);

      } 
    
    });



    })//use


function SetKnowlage(Id){


if (!chooseDay) {
  alert('请先在日历中点选想要设置的日期')
  return
}
console.log(Id)
console.log(chooseDay)

    $.ajax({
      type:'POST',
      async: false,
      data:{knowledgeId:Id,startTime:chooseDay,
        debug:1,userType:0,userId:'1723'
      },    
      url: AjaxURL+'/AreTalkServer/Web/Api/uploadSigninPrize.action;jsessionid='+Sessionid,
      success:function(data) {

              alert("success");
              location.replace(location.href);

       }

   });



};
  
});//ready




