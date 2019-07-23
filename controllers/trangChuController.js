const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
require('dotenv').config()

router.get("/", (req, res) => {
    var q = Truyen.find({ danh_gia: 1 }).limit(13);
    q.exec(function(err, docs) {
        if (!err) {
            res.render("home/homePage", {
                layout: 'defaultLayout.hbs',
                list: docs
            });
        } else {
            console.log(err);
        }

    });
});

router.get("/apiHot/:tl", (req, res) => {
    var tl = req.params.tl;
    if (tl != "") {
        var q = Truyen.find().sort({ _id: -1 }).limit(13);
        if (tl != "all") {
            q = Truyen.find({ the_loai: tl }).sort({ _id: -1 }).limit(13);
        }
        q.exec(function(err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                console.log(err);

            }

        });
    }
})

router.get("/apiNew/:tl", (req, res) => {
    var tl = req.params.tl;
    if (tl != "") {
        var q = Truyen.find().sort({ _id: -1 }).limit(16);
        if (tl != "all") {
            q = Truyen.find({ the_loai: tl }).limit(16);
        }
        q.exec(function(err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                console.log(err);

            }

        });
    }
})

router.get("/apiFull/all", (req, res) => {
    var q = Truyen.find({ trang_thai: "Full" }).limit(12);
    q.exec(function(err, docs) {
        if (!err) {
            res.json(docs);
        } else {
            console.log(err);

        }

    });
})

router.get("/the-loai/:tl", (req, res) => {
    var tl = req.params.tl;
    if (tl != "") {
        var q = Truyen.find().sort({ _id: -1 }).limit(16);
        if (tl != "all") {
            q = Truyen.find({ the_loai: tl }).sort({ _id: -1 }).limit(16);
        }
        q.exec(function(err, docs) {
            if (!err) {
                res.render("home/catPage", {
                    layout: 'defaultLayout.hbs',
                    list: docs,
                    hostname: process.env.SERVER_NAME
                });
            } else {
                console.log(err);
            }

        });
    }
});


module.exports = router;