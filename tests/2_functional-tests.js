/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('GET', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            //console.log(res.text);
            assert.isNotEmpty(res.text, 'response string should be an html page, not an empty string');
            done();
          });
      });
    });
    
    suite('POST', function() {
      test('post new thread', function(done) {
         chai.request(server)
          .post('/api/threads/test/')
          .type('form')
          .send({
            '_method': 'post',
            'text': 'hey it me',
            'delete_password': '123'
          })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            //console.log(res.text);
            assert.isNotEmpty(res.text, 'response string should be an html page, not an empty string');
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('delete board', function(done) {
         chai.request(server)
          .delete('/api/threads/test')
          .type('form')
          .send({
             '_method': 'delete',
             'thread_id': '5c294a1b5710b6cf42671d6c', // change this to the id of the post you want to delete
             'delete_password': '123' // change to the delete password of the post you want to delete
           })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            //console.log(res.text);
            assert.isNotEmpty(res.text, 'response string should not be an empty');
             expect(res.text).to.satisfy(function (val) {
                if ((val === '"Success!"') || (val === '"incorrect password"') || (val === '"Sorry, we couldn\'t find that thread!"') ) {
                    return true;
                } else {
                    return false;
                }
            });
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('get board', function(done) {
         chai.request(server)
          .put('/api/threads/test')
          .type('form')
          .send({
             '_method': 'put', 
             'report_id': '5c294b8b5710b6cf42672013', // change this to the id of the post you want to report
           })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            //console.log(res.text);
            assert.isNotEmpty(res.text, 'response string should not be empty');
            expect(res.text).to.satisfy(function (val) {
                if ((val === '"Success!"') || (val === '"failure"')) {
                    return true;
                } else {
                    return false;
                }
            });
            done();
          });
      });
    });
    
  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    
    suite('GET', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/b/test/5c294b8b5710b6cf42672013') // change to the ID of the thread where you want to see the replies
          .end(function(err, res){
            console.log(res.text);
            assert.equal(res.status, 200, 'response status should be 200');
            assert.isNotEmpty(res.text, 'response string should be an html page, not an empty string');
            done();
          });
      });
    });
    
    suite('POST', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/api/replies/test')
        type('form')
          .send({
            '_method': 'post',
            'text': 'hey it me',
            'delete_password': '123'
          })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/api/replies/test')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('get board', function(done) {
         chai.request(server)
          .get('/api/replies/test')
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            done();
          });
      });
    });
    
  });

});
