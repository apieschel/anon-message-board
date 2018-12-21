/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .get(function(req, res) {
      res.json(req.params.board);
    });
  
  app.route('/api/threads/test')
    .post(function(req, res) {
      res.json({thread: req.body.board, message: req.body.text});
    });
    
  app.route('/api/replies/:board');

};