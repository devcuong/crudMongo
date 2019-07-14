const mongoose = require('mongoose');
var truyenSchema = new mongoose.Schema({

	
	ten_truyen:{
		type: String,
		required: "this file is required"
	},
	url_truyen:{
		type: String
	},
	trang_thai:{
		type: String
	},
	url_hinh:{
		type: String
	},
	so_chuong:{
		type: String
	},
	views:{
		type: String
	},

	danh_gia:{
		type: Number
	}

}, {
	versionKey: false // You should be aware of the outcome after set to false
});	
mongoose.model("Truyen", truyenSchema, "truyen");




