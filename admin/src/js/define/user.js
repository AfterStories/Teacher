  var Sessionid = getCookie("JSESSIONID")
  var Lessonid = GetQueryString("Lessonid");



var dataSet =[];var countryArry =[];

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
 




//初始化
layui.use(['layer', 'datatable', 'datatableButton', 'datatableFlash', 'datatableHtml5', 'datatablePrint', 'datatableColVis', 'datatableSelect'], function() {
  var $ = layui.jquery,
    layer = layui.layer;
  // oSort是排序类型数组, 'chinese-asc'是自己定义的类型的排序(*-asc || *-desc)名称
  // 插件应该会根据表格中的内容的类型(string, number, chinese)进行比较排序，
  // 如果以chinese类型来排序则用oSort['chinese-asc']和oSort['chinese-desc']的方法
  // oSort对应的function里面自定义比较方法
  $.fn.dataTableExt.oSort['chinese-asc'] = function(x, y) {
    //javascript自带的中文比较函数，具体用法可自行查阅了解
    return x.localeCompare(y);
  };

  $.fn.dataTableExt.oSort['chinese-desc'] = function(x, y) {
    return y.localeCompare(x);
  };

  // aTypes是插件存放表格内容类型的数组
  // reg赋值的正则表达式，用来判断是否是中文字符
  // 返回值push到aTypes数组，排序时扫描该数组，'chinese'则调用上面两个方法。返回null默认是'string'
  $.fn.dataTableExt.aTypes.push(
    function(sData) {
      var reg = /^[\u4e00-\u9fa5]{0,}$/;
      if(reg.test(sData)) {
        return 'chinese';
      }
      return null;
    }
  );
function getcountry(){
    $.ajax({
          dataType:'json',
          type:'GET',
          async:false, 
          data:{},       
          url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getCommonTable.action;jsessionid='+Sessionid,
          success:function(data) {
          for (var i = 0;i<data.data.country.length; i++) {               
                var countryId = data.data.country[i].id;
                countryArry[countryId] = {
                  countryNameCn:data.data.country[i].countryNameCn,
                  countryNameEn:data.data.country[i].countryNameEn,
                  countryNameSelf:data.data.country[i].countryNameSelf
                }
          }    console.log(countryArry)              
              },
          error:function() {
                alert("失败，请重试");
              }    
          });
};
  $(document).ready(function() {


getuserinfo();

function getuserinfo(){
getcountry();
    $.ajax({
          dataType:'json',
          type:'GET',
          async:false, 
          data:{},       
          url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getStudentInfo.action;jsessionid='+Sessionid,
          success:function(data) {
                  
                
                  for (var i = 0;i<data.data.data.userInfoList.length; i++) {                        
                        var ID = data.data.data.userInfoList[i].userInfo.id;
                        var name = data.data.data.userInfoList[i].userInfo.name;
                        var sex = data.data.data.userInfoList[i].userInfo.sex;
                        if(sex==1){sex = "男"}else if(sex==0){sex ="女"}else{sex = "其他"};
                        var nickname = data.data.data.userInfoList[i].userInfo.nickname;
                        var headimg = '<img style="width:100px;height:100px;" src=http://211.159.152.210:8188'+data.data.data.userInfoList[i].avatar+'>';
                        var countryNO = data.data.data.userInfoList[i].userInfo.countryId;

                  
                        var country = countryArry[countryNO].countryNameCn;
                        var lesson = data.data.data.userInfoList[i].lessonTitle;
                        var buyClassNo =data.data.data.userInfoList[i].buyClassNo;
                        var cost = data.data.data.userInfoList[i].cost;
               
                        var dataSetA= [];
                        dataSetA.push(ID,name,sex,nickname,headimg,country,lesson,buyClassNo,cost);
                        dataSet.push(dataSetA);
                   }    
              },
          error:function() {
                alert("失败，请重试");
              }    
          }); 

}; 

    var myTable = $('#userTable').DataTable({
      "processing": true, //DataTables载入数据时，是否显示‘进度’提示  
      "stateSave": true, //是否打开客户端状态记录功能,此功能在ajax刷新纪录的时候不会将个性化设定回复为初始化状态  
      "scrollCollapse": true, //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变  
      "paginationType": "full_numbers", //详细分页组，可以支持直接跳转到某页  
      "language": lang, //提示信息
      "autoWidth": false, //自适应宽度，
      "lengthMenu": [15, 30, 50],
      "stripeClasses": ["odd", "even"], //为奇偶行加上样式，兼容不支持CSS伪类的场合
      "searching": true, //是否允许Datatables开启本地搜索
      "paging": true, //是否开启本地分页
      "lengthChange": true, //是否允许产品改变表格每页显示的记录数
      "info": true, //控制是否显示表格左下角的信息
      //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
      "order": [1, 'desc'], //asc升序   desc降序 
      "aoColumnDefs": [{
        "orderable": false,
     
      }],
      "deferRender": true, //延迟渲染
      //"ajax": "user.json", 数据的路径
      "data":dataSet,
      select: { //单击tr选中当前行
        style: 'multi'
      },
      "columns": 
      [{"title":"学生ID"},
      {"title":"姓名"},
      {"title":"性别"},
      {"title":"昵称"},
      {"title":"头像"},
      {"title":"国家"},
      {"title":"购买课程"},
      {"title":"购买课节"},
      {"title":"消费总金"}]
    });
    /**
     * 添加falsh
     */
    $.fn.dataTable.Buttons.swfPath = "../../src/js/lib/dataTables/extensions/Buttons/swf/flashExport.swf";
    $.fn.dataTable.Buttons.defaults.dom.container.className = 'tableTools-box';
    /**
     * 操作栏
     */
    new $.fn.dataTable.Buttons(myTable, {
      buttons: [{
        "extend": "colvis",
        "text": "<i class='linyer icon-search'></i> <span class='hidden'>显示/隐藏列</span>",
        "className": "layui-btn table-tool",
        columns: ':not(:first):not(:last)'
      }, {
        "extend": "copy",
        "text": "<i class='linyer icon-copy'></i> <span class='hidden'>复制到剪贴板</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "csv",
        "text": "<i class='linyer icon-exports'></i> <span class='hidden'>导出csv</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "excel",
        "text": "<i class='linyer icon-excel'></i> <span class='hidden'>导出excel</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "pdf",
        "text": "<i class='linyer icon-pdf'></i> <span class=''>导出pdf</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "print",
        "text": "<i class='linyer icon-print'></i> <span class='hidden'>打印</span>",
        "className": "layui-btn table-tool",
        autoPrint: false,
        message: '学生列表'
      }]
    });
 
    myTable.buttons().container().appendTo($('.tableTools'));
    /**
     * 显示隐藏列
     */
    var defaultColvisAction = myTable.button(0).action();
    myTable.button(0).action(function(e, dt, button, config) {
      defaultColvisAction(e, dt, button, config);
      if($('.dt-button-collection > .dropdown-menu').length == 0) {
        $('.dt-button-collection')
          .wrapInner('<ul class="dropdown-menu" />')
          .find('a').attr('href', 'javascript:;').wrap("<li />")
      }
      $('.dt-button-collection').appendTo('.tableTools-box')
    });
    /**
     * 复制到剪贴板
     */
    var defaultCopyAction = myTable.button(1).action();
    myTable.button(1).action(function(e, dt, button, config) {
      defaultCopyAction(e, dt, button, config);
    });
    /**
     * 选择
     */
    myTable.on('select', function(e, dt, type, index) {
      if(type === 'row') {
        $(myTable.row(index).node()).find('input:checkbox').prop('checked', true);
      }
    });
    /**
     * 取消选择
     */
    myTable.on('deselect', function(e, dt, type, index) {
      if(type === 'row') {
        $(myTable.row(index).node()).find('input:checkbox').prop('checked', false);
      }
    });
    /**
     * 根据表头复选框 选择/取消选择所有行
     */
    $(document).on('click', '#userTable > thead > tr > th input[type=checkbox],#userTable > tfoot > tr > th input[type=checkbox]', function() {
      var th_checked = this.checked;
      $('#userTable').find('tbody > tr').each(function() {
        var row = this;
        if(th_checked) myTable.row(row).select();
        else myTable.row(row).deselect();
      });
    });
    /**
     * 选中/取消选中复选框时 选中/取消选中一行
     */
    $(document).on('click', '#userTable tbody td input[type=checkbox]', function() {
      var row = $(this).closest('tr').get(0);
      if(!this.checked) myTable.row(row).deselect();
      else myTable.row(row).select();
    });
    $(document).on('click', '#userTable tbody td', function() {
      var row = $(this).closest('tr').get(0);

      //console.log(row);
    })
  });
  //用户--查看
  $("#userTable").on('click', '.btn-showuser', function() {
    var username = $(this).html();
    var href = 'user-show.html';
    layer_show(username, href, '', '400', '500');
  });
  /*用户-添加*/
  $("#btn-adduser").on('click', function() {
    var username = $(this).html();
    var href = 'user-add.html';
    layer_show(username, href, '', '800', '600');
  });
  /*用户-停用*/
  $('.table-sort').on('click', '.handle-btn-stop', function() {
    var obj = $(this);
    layer.confirm('确认要停用吗？', {
      icon: 0,
      title: '警告',
      shade: false
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-run" title="启用"><i class="linyer icon-qiyong"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">已停用</span>');
      $(obj).remove();
      layer.msg('已停用!', {
        icon: 5,
        time: 1000
      });
    });
  });
  /*用户--启用*/
  $('.table-sort').on('click', '.handle-btn-run', function() {
    var obj = $(this);
    layer.confirm('确认要启用吗？', {
      icon: 0,
      title: '警告',
      shade: false
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-stop" title="停用"><i class="linyer icon-zanting"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
      $(obj).remove();
      layer.msg('已启用!', {
        icon: 6,
        time: 1000
      });
    });
  });
  /*用户-编辑*/
  $('.table-sort').on('click', '.handle-btn-edit', function() {
    var obj = $(this);
    layer_show('编辑', 'user-edit.html', '', '800', '600');
  });
  /*密码-修改*/
  $('.table-sort').on('click', '.handle-btn-updatepwd', function() {
    var obj = $(this);
    layer_show('编辑', 'user-updatepwd.html', '', '600', '500');
  });
  /*用户-删除*/
  $('.table-sort').on('click', '.handle-btn-delect', function() {
    var obj = $(this);
    layer.confirm('确认要删除吗？', {
      icon: 0,
      title: '警告',
      shade: false
    }, function(index) {
      $(obj).parents("tr").remove(); //删除方法
      layer.msg('已删除!', {
        icon: 1,
        time: 1000
      });
    });
  });
  //批量删除
  $('#btn-delect-all').on('click', function() {
    //这是相对应的那一行数据移出
    console.log($(".table-sort tbody :checkbox:checked").length);
    if($(".table-sort tbody :checkbox:checked").length == 0) {
      layer.msg('请选择需要删除的数据！', {
        icon: 0
      });
    } else {
      layer.confirm('确认要删除吗？', {
        icon: 0,
        title: '警告',
        shade: false
      }, function(index) {
        $(".table-sort tbody :checkbox:checked").parents('tr').remove(); //删除方法
        layer.msg('已删除!', {
          icon: 1,
          time: 1000
        });
      });
    }
  });
});