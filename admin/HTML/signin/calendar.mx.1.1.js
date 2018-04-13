/**
 * 生成简单的日历
 * 当前月份的日历
 * 
 * 备注：getCalendar 生成日历，可传入当前月份的号数，会高亮显示匹配的号数
 *
 * 
 */
 
function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

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






var Calendar = {
	_today : new Date(),
	_date : new Date().getDate(),
	_day : new Date().getDay(),
	_month : new Date().getMonth() + 1,
	_year : new Date().getFullYear(),
	setDate:function(){
		this._date = new Date(this._today).getDate();
	},
	setDay:function(){
		this._day = new Date(this._today).getDay();
	},
	setMonth:function(){
		this._month = new Date(this._today).getMonth() + 1;
	},
	setYear:function(){
		this._year = new Date(this._today).getFullYear();
	},
	init:function(curDate){
		this._today = new Date(curDate);
		this.setDate();
		this.setDay();
		this.setMonth();
		this.setYear();
	},
	isLeap : function() {
		var year = this._year;
		if (year % 4 == 0 && year % 100 > 0) {
			return true;
		}
		if (year % 400 == 0 && year % 3200 > 0) {
			return true;
		}
		return false;
	},
	getLen : function() {
		if (this._month == 2) {
			if (this.isLeap()) {
				return 29;
			}
			return 28;
		}
		if (this._month < 8) {
			if (this._month % 2 > 0) {
				return 31;
			}
			return 30;
		}
		if (this._month % 2 > 0) {
			return 30;
		}
		return 31;
	},
	getCalendar : function(events) {
		var len = this.getLen();
		var d = new Date(this._year, this._month - 1, 1);
		var dfw = d.getDay();
		//返回值从0~6
		//返回一个具体日期中一周的第几天。分别对应周日~周六
		var arr = new Array();
		var tem = 0;
		var str = "";
		for (var i = 0; i < 6; i++) {
			arr[i] = new Array();
			for (var j = 0; j < 7; j++) {
				tem++;
				if (tem - dfw > 0 && tem - dfw <= len) {
					arr[i][j] = tem - dfw;
				} else {
					arr[i][j] = "";
				}
			}
		}
		console.log(arr)
		str += '<h4>'+this._year + '-' + this._month + '-'+ this._date + '</h4>';//标题
		str += '<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">';
		str += '<thread><tr><th>Sun</th><th>Mon</th><th>Tues</th><th>Wed</th><th>Thur</th><th>Fri</th><th>Sat</th></tr></thread>';
		str += '<tbody>';
		for (var k = 0; k < 6; k++) {
			if (k == 5 && arr[k][0] == "")
				continue;
			str += '<tr>';
			for (var m = 0; m < arr[k].length; m++) {
				if(events.contains(arr[k][m])){
					str += '<td class="red_tbg" onclick="getTodaySignin('+arr[k][m]+')">' + arr[k][m] + '</td>';
				}else{
					//判断是否是当日
					if(arr[k][m] == this._date){
						str += '<td class="cur_day" onclick="getTodaySignin('+arr[k][m]+')">' + arr[k][m] + '</td>';
						continue;//跳入下一次循环
					}
					if(arr[k][m] == ""){
						str += '<td class="over" onclick="getTodaySignin('+arr[k][m]+')">' + arr[k][m] + '</td>';
						continue;
					}

					str += '<td onclick="getTodaySignin('+arr[k][m]+')">' + arr[k][m] + '</td>';
				}
			}
			str += '</tr>';
		}
		str += '</tbody>';
		str += '</table>';
		console.info(str)

		return str;

	},
	nextMonth : function() {
		if (this._month == 12) {
			this._year++;
			this._month = 0;
		}
		this._month++;
	},
	nextYear : function() {
		this._year++;
	},
	previousMonth : function() {
		if (this._month == 1) {
			this._year--;
			this._month = 13;
		}
		this._month--;
	},
	previousYear : function() {
		this._year--;
	}
};

Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};





var AjaxURL = 'http://211.159.152.210:8188';

var getclientTime = getNowFormatDate();
var SiginArry = [],PrizeList = [];
var Sessionid

$(function(){

login();

});

function getTable(Sessionid){
    $.ajax({
        dataType:'json',
        type:'GET',
        data:{clientTime:getclientTime},       
        url: AjaxURL+'/AreTalkServer/Web/Api/getSigninDate.action;jsessionid='+Sessionid,
        success:function(data) {
        	for (var i = 0;i <data.data.signinList.length; i++) {
        			var signinTime = data.data.signinList[i].signTime;
        			signinTime = signinTime.substring(8,10);
        			SiginArry.push(signinTime);
        	}
        	for (var j = 0;j <data.data.prizeList.length; j++) {
        			var prizeTime = data.data.prizeList[j].signdate;
        			prizeTime = prizeTime.substring(8,10);
        			var prizeType = data.data.prizeList[j].prize;
        			PrizeList.push({signinTime:prizeTime,prize:prizeType});
        	}        	
      		console.log(PrizeList)


		Calendar.init(new Date());
		$("#calendar").html(Calendar.getCalendar(SiginArry));

            },
          error: function () {                  
            alert(data.errMsg);       
      
      }                        
        }); 
}


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}



/*'http://211.159.152.210:8188?'*/

function login(){

    $.ajax({
       type: "GET",
       url: AjaxURL+"/AreTalkServer/Web/Login/login.action?userName=zzsmf&password=c4ff6ffa298b7c88d81740cffbbf4230&userType=1",
       data: {},
       success: function (data) {                        

        CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);		
		getTable(data.data.JSESSIONID);//渲染日历

       },
       error: function (a,b,c) {
            alert("网络超时，请重试");
            }
       });





    $.ajax({
       type: "GET",
       url: AjaxURL+"/AreTalkServer/Web/Api/getSigninDateKnowledgeList.action;jsessionid="+Sessionid,
       data: {startTime:'2018-2-11 14:11:11'},
       success: function (data) {                        
	
	
       },
       error: function (a,b,c) {
            alert("网络超时，请重试");
            }
       });



}






function getTodaySignin(today){
console.log(today)
}