/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('GET', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            console.log(res.text);
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
    suite('GET', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
  });

});
