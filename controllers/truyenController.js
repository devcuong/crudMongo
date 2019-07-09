const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");

router.get("/",(req,res)=>{
	res.render("truyen/addOrEdit",{
		viewTitle : "Insert Truyện"
	});
});

router.post("/", (req,res) => {
	insertRecord(req, res);
});

function insertRecord(req, res){
	var truyen = new Truyen();
	truyen.ten_truyen = req.body.tenTruyen;
	truyen.url_truyen = req.body.urlTruyen;
	truyen.trang_thai = req.body.trangThai;
	truyen.so_chuong = req.body.soChuong;
	truyen.url_hinh = req.body.urlHinh;
	truyen.save((err, doc) => {
		if(!err)
			res.redirect("truyen/list");
		else{
			if(err.name == "ValidationError")
				{
					handleValidationError(err, req.body);
					res.render("truyen/addOrEdit",{
						viewTitle: "Insert Truyen",
						truyen: req.body
					});
				}
				else
					console.log("Error during record insertion: ", err);
		}
	})
}

router.get("/list",(req,res)=>{
	Truyen.find((err, docs) => {
		if(!err){
			res.render("truyen/list", {
				list: docs
			});
		}
		else{
			console.log("Error in retrieving employee list: " + err);
		}
	});
});

function handleValidationError(err, body){
	for(field in err.errors)
	{
		switch(err.errors[field].path){
			case "ten_truyen":
				body["tenTruyenError"] = err.errors[field].message;
				break;
			default:
				break;
		}
	}
}

module.exports = router;