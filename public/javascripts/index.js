var socket = io.connect('http://localhost:3000',{rememberTransport:true,timeout:1500});;

var connected = false;

$("#login_button").on("click",function(){
  login();
});
$("#commit").on("click",function(){
  $.ajax({
    type:"POST",
    url:"/join",
    data:{
      name:$("#name").val(),
      age:parseInt($("#age").val()),
      phone:$("#phone").val(),
      QQ:parseInt($("#QQ").val()),
      classes:$("#classes").val(),
      information:$("#information").val()
    },
    dataType:"json",
    success:function(data){
      $("#change").text(data.msg);
      $("#change").attr("disable","disable");
      $("#change").removeAttr("data-target");
      $("#change").removeAttr("data-toggle");
    },
    error:function(){
      $("#change").text("出错，继续加入");
    }
  });
});
$("#send_button").on("click",function(){
  if(!connected){
    return;
  }
  sendMessage();
});
function login(){
  var login_name = $("#login_name").val();
  socket.emit("login",{
    login_name:login_name,
  });
}
function sendMessage(){
 var text = $("#message").val();
 text=text;
 if (text == "") {
            return;
        }

var _lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getRandomColor() + ";'>" + text + "</div>");
$(".mask").append(_lable.show());
 init_barrage();
 socket.emit("send message",{
  msg:text
});
}

socket.on("system", function(data){
  if(!connected){
    return;
  }
  $("#system").append(
      "<div>" + 
      data.msg + 
      "<div>"
      );
});

socket.on("got message", function(data){
  if(!connected){
    return;
  }
  // var danmaku = "<div class='danmaku'>" + 
  //   data.login_name + ": " + data.msg + 
  //   "</div>";
  // $("#screen_text").append(danmaku);
  // slideLeft(1);
var _lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getRandomColor() + ";'>" + data.msg + "</div>");
$(".mask").append(_lable.show());
 init_barrage();
});

socket.on("login status", function(data){
  if(data.code > 0){
    connected = true;
    $("#system").append(
        "<div>" +
        "<span>当前用户: </span><span id='user'>" + data.msg +
        "</span></div>"
        );
    $("#login_block").remove();
  } else {
    alert("登录失败");
  }
});



$(function () {
        $(".showBarrage,.s_close").click(function () {
            $(".barrage,.s_close").toggle("slow");
        });
        init_barrage();
    })
function init_barrage() {
        var _top = 0;
        $(".mask div").show().each(function () {
                    var _left = $(window).width() - $(this).width();
                    var _height = $(window).height();
                    _top += 55;
                    if (_top >= (_height - 200)) {
                        _top = 0;
                    }
                    $(this).css({left: _left, top: _top, color: getRandomColor()});

                   //定时弹出文字
                    var time = 10000;
                    if ($(this).index() % 2 == 0) {
                        time = 15000;
                    }

                    $(this).animate({left: "-" + _left + "px"}, time, function () {
                        $(this).remove();
                    });

                }
        );

    }
function getRandomColor() {
        return '#' + (function (h) {
                    return new Array(7 - h.length).join("0") + h
                })((Math.random() * 0x1000000 << 0).toString(16))
    }