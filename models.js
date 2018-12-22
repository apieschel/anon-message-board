let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let threadSchema = new Schema({
	title: String,
	text: String,
  password: String
}, {timestamps: true});

let Thread = mongoose.model('Thread', threadSchema);

exports.threadModel = Thread;