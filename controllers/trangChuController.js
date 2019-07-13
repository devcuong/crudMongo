const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const utils = require("../utils/navRender.js");

router.get("/",(req,res)=>{
    res.render("truyen/homePage",{
		layout: 'defaultLayout.hbs'
	});
});

module.exports = router;