const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Truyen = mongoose.model("Truyen");
const utils = require("../utils/navRender.js");
const stringHandle = require("../utils/stringHandle");
var moment = require('moment');

router.get("/", (req, res) => {
    var tt = new Date().getTime();
    res.render("truyen/addOrEdit", {
        viewTitle: "Insert Truyện",
        timeStamp: tt
    });
});

router.post("/", (req, res) => {
    if (req.body._id == "")
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function updateRecord(req, res) {
    var foundTruyen = new Truyen();
    if (req.body._id) {
        foundTruyen._id = req.body._id;
    }
    if (req.body.tenTruyen) {
        foundTruyen.ten_truyen = req.body.tenTruyen;
        foundTruyen.slug_truyen = stringHandle.changeToSlug(req.body.tenTruyen);
    }

    if (req.body.urlTruyen) {
        foundTruyen.url_truyen = req.body.urlTruyen;
    }

    if (req.body.trangThai) {
        foundTruyen.trang_thai = req.body.trangThai;
    }

    if (req.body.soChuong) {
        foundTruyen.so_chuong = req.body.soChuong;
    }

    if (req.body.urlHinh) {
        foundTruyen.url_hinh = req.body.urlHinh;
    }

    if (req.body.soViews) {
        foundTruyen.views = req.body.soViews;
    }
    if (req.body.updateTime) {
        foundTruyen.update_time = req.body.updateTime;
    }
    Truyen.findOneAndUpdate({ _id: req.body._id }, foundTruyen, { new: true, strict: false, setDefaultsOnInsert: true }, function(err, doc) {
        if (!err) {
            res.redirect("truyen/list");
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("truyen/addOrEdit", {
                    viewTitle: "Update Truyen",
                    truyen: req.body
                });
            } else
                console.log("Error during record update: " + err);
        }
    });
}

function insertRecord(req, res) {
    var truyen = new Truyen();
    truyen.ten_truyen = req.body.tenTruyen;
    truyen.slug_truyen = stringHandle.changeToSlug(req.body.tenTruyen);
    truyen.url_truyen = req.body.urlTruyen;
    truyen.trang_thai = req.body.trangThai;
    truyen.so_chuong = req.body.soChuong;
    truyen.url_hinh = req.body.urlHinh;
    truyen.views = req.body.soViews;
    truyen.update_time = req.body.updateTime;
    truyen.save((err, doc) => {
        if (!err)
            res.redirect("truyen/list");
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("truyen/addOrEdit", {
                    viewTitle: "Insert Truyen",
                    truyen: req.body
                });
            } else
                console.log("Error during record insertion: ", err);
        }
    })
}
router.get("/list", (req, res) => {
    Truyen.find((err, docs) => {
        if (!err) {
            res.render("truyen/list", {
                list: docs
            });
        } else {
            console.log("Error in retrieving employee list: " + err);
        }
    });

});

router.get("/list/:page", (req, res) => {
    var perPage = 1;
    var page = req.params.page || 1;
    Truyen.find({})
        .limit(perPage)
        .skip((perPage * page) - perPage)
        .exec(function(err, truyens) {
            Truyen.count().exec(function(err, count) {
                if (!err) {
                    res.render("truyen/list", {
                        list: truyens,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        navRender: utils.getNavRender(page, Math.ceil(count / perPage), "/truyen/list"),
                    })
                } else {
                    console.log(err);
                }
            })
        })
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case "ten_truyen":
                body["tenTruyenError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get("/:id", (req, res) => {
    var tt = new Date().getTime();
    Truyen.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("truyen/addOrEdit", {
                viewTitle: "Update Truyen",
                truyen: doc,
                timeStamp: tt
            });
        }
    });
});

router.get("/delete/:id", (req, res) => {
    Truyen.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/truyen/list");
        } else {
            console.log("Error in employee delete: " + err);
        }
    });
});


module.exports = router;