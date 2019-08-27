const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const TheLoai = mongoose.model("TheLoai");
const utils = require("../utils/navRender.js");

router.get("/", (req, res) => {
    res.render("home/detailPage", {
        layout: 'defaultLayout.hbs'
    });

});

module.exports = router;