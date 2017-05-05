    var validator  = require('validator');
    var multer     = require('multer');
    var mongoose = require("mongoose");
    var db = mongoose.connect("mongodb://127.0.0.1:27017/computer");
    var StudentSchema = new mongoose.Schema({
        name : { type:String },
        age  : { type:Number, default:0 },
        phone: { type:String },
        QQ   : { type:Number },
        classes: { type:String },
        information:{type:String},
        time : { type:Date, default:Date.now }
    });
var stu=db.model('Student',StudentSchema);
exports.saveStudent=function(req,res){
	var name=validator.trim(req.body.name);
	var age=req.body.age;
	var phone=validator.trim(req.body.phone);
	var QQ=req.body.QQ;
	var classes=validator.trim(req.body.classes);
	var information=validator.trim(req.body.information);
	var student={
		name:name,
		age:age,
		phone:phone,
		QQ:QQ,
		classes:classes,
		information:information,
	};
	var Etity=new stu(student);
	Etity.save(function(error,doc){
		if(doc!=null){
			res.json({
				msg:'报名成功！'
			})
		}
	});
}
