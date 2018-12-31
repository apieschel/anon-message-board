'use strict';

const expect = require('chai').expect;
const Thread = require("../models.js").threadModel;
const Child = require("../models.js").childModel;

const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = function (app) {
  
  app.route('/api/replies/:board')
    .get(function(req, res) {
      Thread.findById(req.query.thread_id, function(err, data) {
        if(err) throw err;
        res.json(data);
      }); 
    });
  
  app.route('/api/replies/:board')
    .post(function(req, res) { 
      bcrypt.hash(req.body.delete_password, saltRounds, (err, hash) => {
        Thread.findById(req.body.thread_id, function(err, data) {
          if(data !== null) {
            if(err) throw err;
            data.replycount = data.replycount + 1;
            data.replies.push({
              text: req.body.text, 
              delete_password: hash, 
              thread_id: req.body.thread_id,
              reported: false
            });
            data.save();
            res.redirect('/b/' + req.params.board + '/' + req.body.thread_id);
          } else {
            res.json("Sorry, but we couldn't find that thread!");
          }
        });
      });
    });
  
  app.route('/api/threads/:board')
    .get(function(req, res) {
      Thread.find({board: req.params.board}, function(err, data) {
        if(err) throw err;
        res.json(data);
      }); 
    });
  
  app.route('/api/threads/:board')
    .post(function(req, res) {
      bcrypt.hash(req.body.delete_password, saltRounds, (err, hash) => {
        Thread.findOneAndUpdate({text: req.body.text}, {
            text: req.body.text, 
            password: hash,
            board: req.params.board,
            reported: false,
            replies: [],
            replycount: 0
          }, {new: true, upsert: true}, function(err, data) {
            if(err) throw err;
            res.redirect('/b/' + req.params.board + '/');
        });
      });
    });
  
  app.route('/api/threads/:board')
    .delete(function(req, res) {
      Thread.findById(req.body.thread_id, function(err, doc) {
        if(err) throw err;
        if(doc !== null) {
          bcrypt.compare(req.body.delete_password, doc.password, (err, bool) => {
            if(bool) {
              doc.delete();
              res.json('Success!');
            } else {
              res.json('incorrect password');
            }
          });
        } else {
          res.json("Sorry, we couldn't find that thread!");
        }
      });  
    });
  
  app.route('/api/replies/:board')
    .delete(function(req, res) {
      Thread.findById(req.body.thread_id, function(err, doc) {
          if(err) throw err;
          let delete_password;
          for(let i = 0; i < doc.replies.length; i++) {
            if(doc.replies[i]._id == req.body.reply_id) {
              delete_password = doc.replies[i].delete_password;
              doc.replies[i].remove();
            }
          }
          bcrypt.compare(req.body.delete_password, delete_password, (err, bool) => {
            if(bool) {
              doc.replycount = doc.replycount - 1;
              doc.save();
              res.json('Success!');
            } else {
              res.json('incorrect password');
            }
          });
      });
    });
  
  app.route('/api/threads/:board')
    .put(function(req, res) {
      Thread.findByIdAndUpdate(req.body.report_id, { $set: { reported: true }}, { new: true }, function (err, doc) {
        if (err) throw err;
        if(doc !== null) {
          res.json('Success!');
        } else {
          res.json('failure');
        }
      });
    });
  
  app.route('/api/replies/:board')
    .put(function(req, res) {
      Thread.findById(req.body.thread_id, function(err, doc) {
        if(err) throw err;
        if(doc !== null) {
          let check;
          for(let i = 0; i < doc.replies.length; i++) {
            if(doc.replies[i]._id == req.body.reply_id) {
              doc.replies[i].reported = true;
              check = true;
            }
          }
          if(check) {
            doc.save();
            res.json('Success!');
          } else {
            res.json('failure');
          }
        } else {
          res.json('failure'); 
        } 
      });  
    });
  
};