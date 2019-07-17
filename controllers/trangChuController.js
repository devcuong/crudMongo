const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const utils = require("../utils/navRender.js");

router.get("/",(req,res)=>{
	var q = Truyen.find({danh_gia: 1}).limit(13);
		q.exec(function(err, docs) {
			if(!err)
			{
				res.render("home/homePage", {
					layout: 'defaultLayout.hbs',
					list: docs
				});
			}
			else{
				console.log(err);
			}
			
		});
});


module.exports = router;