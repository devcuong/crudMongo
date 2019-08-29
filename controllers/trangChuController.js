const express = require("express");
var request = require("request");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const TheLoai = mongoose.model("TheLoai");
const utils = require("../utils/navRender.js");
require('dotenv').config()

router.get("/", (req, res) => {
    var q = Truyen.find({ danh_gia: 1 }).limit(13);
    q.exec(function (err, docs) {
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

// Lấy chap truyện khi chưa phân trang
router.get("/:slugTruyen/", (req, res) => {
    var slugTruyen = req.params.slugTruyen;
    //console.log(page);
    if (slugTruyen != "") {
        q = Truyen.find({ slug_truyen: slugTruyen });
        q.exec(function (err, docs) {
            if (!err) {
                res.render("home/detailPage", {
                    layout: 'defaultLayout.hbs',
                    data: docs
                });
            }
        });

    }
});

// Lấy chap truyện khi có phân trang
router.get("/:slugTruyen/trang/:page*?", (req, res) => {
    var slugTruyen = req.params.slugTruyen;
    var perPage = 50;
    var page = req.params.page || 1;
    if (slugTruyen != "") {
        q = Truyen.find({ slug_truyen: slugTruyen });
        q.exec(function (err, docs) {
            if (!err) {
                var count = docs[0].so_chuong;
                res.render("home/detailPage", {
                    layout: 'defaultLayout.hbs',
                    data: docs,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    navRender: utils.getNavRender(page, Math.ceil(count / perPage), process.env.SERVER_NAME + slugTruyen + "/trang"),
                });
            }
        });

    }
});

// Lấy thông tin và chap truyện
router.get("/lay-truyen/:slugTruyen/:page*?", (req, res) => {
    var slugTruyen = req.params.slugTruyen;
    var page = req.params.page || 1;
    if (slugTruyen != "") {
        q = Truyen.find({ slug_truyen: slugTruyen });
        q.exec(function (err, docs) {
            if (!err) {
                if (docs.length > 0) {
                    var svTruyen = "http://chauau2.herokuapp.com/lay-truyen?id=" + docs[0].url_truyen + "trang-" + page;
                    request(
                        svTruyen,
                        function (error, response, body) {
                            if (error) {
                                return "lỗi";
                            } else {
                                res.json(body);
                            }
                        });
                }
            }

        });

    }
});

router.get("/apiHot/:tl", (req, res) => {
    var tl = req.params.tl;
    if (tl != "") {
        var q = Truyen.find().sort({ _id: -1 }).limit(13);
        if (tl != "all") {
            q = Truyen.find({ the_loai: tl }).sort({ _id: -1 }).limit(13);
        }
        q.exec(function (err, docs) {
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
        q.exec(function (err, docs) {
            if (!err) {
                res.json(docs);
            } else {
                console.log(err);

            }

        });
    }
})

router.get("/apiFull/all", (req, res) => {
    var q = Truyen.find({ trang_thai: "Full" }).limit(18);
    q.exec(function (err, docs) {
        if (!err) {
            res.json(docs);
        } else {
            console.log(err);

        }

    });
})

router.get("/apiThongTinTheLoai/:tl", (req, res) => {
    var tl = req.params.tl;
    var q = TheLoai.find({ slug_the_loai: tl });
    q.exec(function (err, docs) {
        if (!err) {
            res.json(docs);
        } else {
            console.log(err);
        }

    });
})

router.get("/apiDanhSachTheLoai", (req, res) => {
    var q = TheLoai.find({}).skip(14);
    q.exec(function (err, docs) {
        if (!err) {
            res.json(docs);
        } else {
            console.log(err);
        }

    });
})

router.get("/the-loai/:tl/:page*?", (req, res) => {
    var perPage = 10;
    var page = req.params.page || 1;
    var tl = req.params.tl;
    if (tl != "") {
        var q = Truyen.find({ the_loai: tl }).sort({ _id: -1 }).limit(perPage).skip((perPage * page) - perPage);
        q.exec(function (err, docs) {
            Truyen.count().exec(function (err, count) {
                if (!err) {
                    res.render("home/catPage", {
                        layout: 'defaultLayout.hbs',
                        list: docs,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        navRender: utils.getNavRender(page, Math.ceil(count / perPage), "/the-loai/" + tl),
                        hostname: process.env.SERVER_NAME
                    });
                } else {
                    console.log(err);
                }

            });
        });
    }
});
/* router.get("/list/:page", (req, res) => {
    var perPage = 1;
    var page = req.params.page || 1;
    Truyen.find({})
        .limit(perPage)
        .skip((perPage * page) - perPage)
        .exec(function (err, truyens) {
            Truyen.count().exec(function (err, count) {
                if (!err) {
                    res.render("truyen/list", {
                        list: truyens,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        navRender: utils.getNavRender(page, Math.ceil(count / perPage)),
                    })
                } else {
                    console.log(err);
                }
            })
        })
}); */

module.exports = router;