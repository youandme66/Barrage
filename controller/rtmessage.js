var count_user = 0;

exports.rtMessage = function(socket){
  var user_has_login = false;

  socket.on("login", function(data){
    if(socket.login_name){

      socket.emit("system",{
        msg:"您已经登陆"
      });

      return;
    }

    if(!data.login_name){
      socket.emit("login status", {
        code:-20,
        msg:"登录名为空"
      });
      return;
    }

    socket.login_name = data.login_name;
    count_user++;
    user_has_login = true;
    console.log(socket.login_name);
    console.log(count_user);
    socket.broadcast.emit("system", {
      msg: socket.login_name + " 已经成功登录"
    });

    socket.emit("login status",{
      code:10,
      msg:socket.login_name
    });

  });

  socket.on("send message", function(data){
    console.log(data);
    socket.broadcast.emit("got message",{
      login_name:socket.login_name,
      msg:data.msg
    });
  });

};
