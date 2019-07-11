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
	if(req.body._id == "")
		insertRecord(req, res);
	else
		updateRecord(req, res);
});

function updateRecord(req,res){
	var foundTruyen = new Truyen();
	if(req.body._id){
		foundTruyen._id = req.body._id;
	}
	if(req.body.tenTruyen){
		foundTruyen.ten_truyen = req.body.tenTruyen;
	}

	if(req.body.urlTruyen){
		foundTruyen.url_truyen = req.body.urlTruyen;
	}

	if(req.body.trangThai){
		foundTruyen.trang_thai = req.body.trangThai;
	}

	if(req.body.soChuong){
		foundTruyen.so_chuong = req.body.soChuong;
	}

	if(req.body.urlHinh){
		foundTruyen.url_hinh = req.body.urlHinh;
	}
	Truyen.findOneAndUpdate({_id: req.body._id},foundTruyen, { new: true,strict: false, setDefaultsOnInsert: true }, function(err, doc) {
		if(!err){
			res.redirect("truyen/list");
		}
		else
		{
			if(err.name == "ValidationError"){
				handleValidationError(err, req.body);
					res.render("truyen/addOrEdit",{
						viewTitle: "Update Truyen",
						truyen: req.body
					});
			}
			else
				console.log("Error during record update: " + err);
		}
	});
}

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
const page = 1;
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

router.get("/:id",(req,res)=>{
	Truyen.findById(req.params.id, (err, doc) => {
		if (!err) {
			res.render("truyen/addOrEdit",{
				viewTitle: "Update Truyen",
				truyen: doc
			});
		}
	});
});

router.get("/delete/:id",(req, res) => {
	Truyen.findByIdAndRemove(req.params.id, (err, doc)=>{
		if(!err){
			res.redirect("/truyen/list");
		}
		else
		{
			console.log("Error in employee delete: " + err);
		}
	});
});


module.exports = router;