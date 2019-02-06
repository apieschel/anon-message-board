const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childSchema = new Schema({
    text: String, 
    delete_password: String, 
    thread_id: String,
    reported: Boolean
}, {timestamps: true});
                        
const threadSchema = new Schema({
	text: String,
  password: String,
  board: String,
  reported: Boolean,
  replies: [childSchema],
  replycount: Number
}, {timestamps: true});

const Thread = mongoose.model('Thread', threadSchema);
const Child = mongoose.model('Child', childSchema);

exports.threadModel = Thread;
exports.childModel = Child;