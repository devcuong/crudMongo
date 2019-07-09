const express = require("express");
var router = express.Router();

router.get("/",(req,res)=>{
	res.render("truyen/addOrEdit",{
		viewTitle : "Insert Truyện"
	});
});

router.post("/", (req,res) => {
	console.log("hi");
});

module.exports = router;