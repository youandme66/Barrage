var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var rtmessage = require("./controller/rtmessage");
var server = http.createServer(app);
var io = require("socket.io").listen(server,{origin:'*:*'});
var join=require("./controller/Join");
var bodyParser   = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(function(req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.header('Access-Control-Allow-Credentials', true);    
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
     if (req.method == 'OPTIONS') {
       res.send(200); 
     }
    else {
       next();
    }   
});

io.on("connection", rtmessage.rtMessage);

app.get("/", function(req, res) {
	res.render("socket_io");
});
app.post("/join", join.saveStudent);

server.listen(3000, '0.0.0.0', function(req, res) {
	console.log("start");
});
