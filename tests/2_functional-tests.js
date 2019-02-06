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
             'report_id': '5c298e6a5710b6cf4267902a', // change this to the id of the post you want to report
           })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
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
      test('get replies to a thread', function(done) {
         chai.request(server)
          .get('/b/test/5c294b8b5710b6cf42672013') // change to the ID of the thread where you want to see the replies
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            assert.isNotEmpty(res.text, 'response string should be an html page, not an empty string');
            done();
          });
      });
    });
    
    suite('POST', function() {
      test('post reply to a thread', function(done) {
         chai.request(server)
          .post('/api/replies/test')
          .type('form')
          .send({
            '_method': 'post',
            'text': 'hey it me',
            'delete_password': '123',
            'thread_id': '5c298e8a5710b6cf42679071', // change to the ID of the thread you want to reply to
            'reported': false
          })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            assert.isNotEmpty(res.text, 'response string should not be empty');
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('report a reply', function(done) {
         chai.request(server)
          .put('/api/replies/test')
          .type('form')
          .send({
             '_method': 'put',
             'thread_id': '5c298e6a5710b6cf4267902a', // change to ID of the thread that holds the comment you want to report
            'reply_id': '5c298ec73c2629237ece98b0', // change to ID of the comment you want to report
           })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
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
    
    suite('DELETE', function() {
      test('delete reply', function(done) {
         chai.request(server)
          .delete('/api/replies/test')
          .type('form')
          .send({
             '_method': 'delete',
             'thread_id': '5c298e6a5710b6cf4267902a', // change to ID of the thread where the reply you want to delete is
             'reply_id': '5c298f39bd2174245a257bd4', // change to ID of the reply you want to delete
             'delete_password': '123' // change to the delete password of the reply you want to delete
           })
          .end(function(err, res){
            assert.equal(res.status, 200, 'response status should be 200');
            assert.isNotEmpty(res.text, 'response string should not be an empty');
             expect(res.text).to.satisfy(function (val) {
                if ((val === '"Success!"') || (val === '"incorrect password"') || (val === '"Sorry, but we couldn\'t find that thread!"') ) {
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
});