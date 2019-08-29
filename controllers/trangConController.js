const express = require("express");
var request = require("request");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const TheLoai = mongoose.model("TheLoai");
const utils = require("../utils/navRender.js");

router.get("/:slugTruyen/:chapTruyen", (req, res) => {
    var slugTruyen = req.params.slugTruyen;
    var chapTruyen = req.params.chapTruyen
    if (slugTruyen != "") {
        q = Truyen.find({ slug_truyen: slugTruyen });
        q.exec(function(err, docs) {
            if (!err) {
                if (docs.length > 0) {
                    var cTruyen = "http://chauau2.herokuapp.com/noi-dung-chuong?id=" + docs[0].url_truyen + "/" + chapTruyen + "/";
                    request(
                        cTruyen,
                        function(error, response, body) {
                            if (error) {
                                return "lỗi";
                            } else {
                                res.render("home/contentPage", {
                                    layout: 'defaultLayout.hbs',
                                    content: body
                                });
                            }
                        });
                }
            }
        });
    }


});

module.exports = router;