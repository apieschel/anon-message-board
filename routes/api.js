'use strict';

const expect = require('chai').expect;
const Thread = require("../models.js").threadModel;

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .get(function(req, res) {
      res.json(req.params.board);
    });
  
  app.route('/api/threads/test')
    .post(function(req, res) {
      Thread.findOneAndUpdate({title: req.body.board}, {title: req.body.board, text: req.body.text}, {new: true, upsert: true}, function(err, data) {
        if(err) throw err;
        res.json({title: data.title, text: data.text, edited: new Date()});
      });
    });
    
  app.route('/api/replies/:board');

};