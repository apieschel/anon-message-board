'use strict';

const expect = require('chai').expect;
const Thread = require("../models.js").threadModel;

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
            thread_id: req.body.thread_id
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
      Thread.findOneAndUpdate({title: req.body.board}, {
          title: req.body.board, 
          text: req.body.text, 
          password: req.body.delete_password,
          board: req.params.board,
          reported: false,
          replies: [],
          replycount: 0
        }, {new: true, upsert: true}, function(err, data) {
          if(err) throw err;
          res.redirect('/b/' + req.body.board + '/');
      });
    });
  
};