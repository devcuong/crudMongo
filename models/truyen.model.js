const mongoose = require('mongoose');

var truyenSchema = new mongoose.Schema({
	ten_truyen:{
		type: String
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
		type: Number
	},
	
});

mongoose.model("Truyen", truyenSchema);


