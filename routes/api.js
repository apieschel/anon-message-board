'use strict';

const expect = require('chai').expect;
const Thread = require("../models.js").threadModel;
const Child = require("../models.js").childModel;

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
        console.log(req.body.thread_id);
        console.log(req.body);
        Thread.findById(req.body.thread_id, function(err, data) {
          if(err) throw err;
          data.replycount = data.replycount + 1;
          data.replies.push({
            text: req.body.text, 
            delete_password: req.body.delete_password, 
            thread_id: req.body.thread_id,
            reported: false
          });
          data.save();
          res.redirect('/b/' + req.params.board + '/' + req.body.thread_id);
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
      Thread.findOneAndUpdate({text: req.body.text}, {
          text: req.body.text, 
          password: req.body.delete_password,
          board: req.params.board,
          reported: false,
          replies: [],
          replycount: 0
        }, {new: true, upsert: true}, function(err, data) {
          if(err) throw err;
          res.redirect('/b/' + req.params.board + '/');
      });
    });
  
  app.route('/api/threads/:board')
    .delete(function(req, res) {
      Thread.findById(req.body.thread_id, function(err, doc) {
        if(err) throw err;
        if(req.body.delete_password === doc.password) {
          doc.delete();
          res.json('success!');
        } else {
          res.json('incorrect password!');
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
        if(req.body.delete_password === delete_password) {
          doc.replycount = doc.replycount - 1;
          doc.save();
          res.json('success!');
        } else {
          res.json('incorrect password!');
        }
      });  
    });
  
  app.route('/api/threads/:board')
    .put(function(req, res) {
      Thread.findByIdAndUpdate(req.body.report_id, { $set: { reported: true }}, { new: true }, function (err, doc) {
        if (err) throw err;
        if(doc !== null) {
          res.json('Success!');
        } else {
          res.json('Failure!');
        }
      });
    });
  
  app.route('/api/replies/:board')
    .put(function(req, res) {
      Thread.findById(req.body.thread_id, function(err, doc) {
        if(err) throw err;
        if(doc !== null) {
          for(let i = 0; i < doc.replies.length; i++) {
            if(doc.replies[i]._id == req.body.reply_id) {
              doc.replies[i].reported = true;
            }
          }
          doc.save();
          res.json('Success!');    
        } else {
          res.json('failure'); 
        } 
      });  
    });
  
};