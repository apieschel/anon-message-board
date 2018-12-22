let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let childSchema = new Schema({
    text: String, 
    delete_password: String, 
    thread_id: String
}, {timestamps: true});
                        
let threadSchema = new Schema({
	title: String,
	text: String,
  password: String,
  board: String,
  reported: Boolean,
  replies: [childSchema],
  replycount: Number
}, {timestamps: true});

let Thread = mongoose.model('Thread', threadSchema);

exports.threadModel = Thread;