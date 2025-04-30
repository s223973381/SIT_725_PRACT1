const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');

describe('Slot Booking App', () => {

  describe('GET /', () => {
    it('should return status 200', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });

    it('should contain "Available Slots"', (done) => {
      request(app)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.include('Available Slots');
          done(err);
        });
    });
  });

  describe('POST /book', () => {
    it('should fail with empty form (400)', (done) => {
      request(app)
        .post('/book')
        .send({})
        .expect(400, done);
    });

    it('should fail with invalid slot_id (e.g. string)', (done) => {
      request(app)
        .post('/book')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          slot_id: 'invalid'
        })
        .expect(500, done); // Internal error from SQL (expected for bad slot_id type)
    });

    it('should succeed with valid form data', (done) => {
      // ⚠️ You must ensure slot_id = 1 exists and is not already booked
      request(app)
        .post('/book')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          slot_id: 1
        })
        .expect(302) // Expect redirect
        .expect('Location', '/confirm')
        .end(done);
    });
  });

  describe('GET /confirm', () => {
    it('should return 200 and include confirmation text', (done) => {
      request(app)
        .get('/confirm')
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.include('Thank you');
          done(err);
        });
    });
  });

});
