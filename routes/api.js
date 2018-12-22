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
          replies: [{text: "this is a test", delete_password: "heyo", thread_id: "whatisthis"}, {text: "this is a test", delete_password: "heyo", thread_id: "whatisthis"}]
        }, {new: true, upsert: true}, function(err, data) {
          if(err) throw err;
          res.json({title: data.title, text: data.text, edited: data.updatedAt.toUTCString()});
      });
    });
    
  app.route('/api/replies/:board');

};