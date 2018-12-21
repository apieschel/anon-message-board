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
      res.json(req.body.board);
    });
    
  app.route('/api/replies/:board');

};